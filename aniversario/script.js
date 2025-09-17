document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const letterContainer = document.getElementById('letterContainer');
    const closeBtn = document.getElementById('closeBtn');
    const envelopeContainer = document.querySelector('.envelope-container');
    
    let isOpen = false;
    
    // Función para abrir la carta
    function openLetter() {
        if (isOpen) return;
        
        isOpen = true;
        
        // Agregar clase para animar el sobre
        envelope.classList.add('opened');
        
        // Ocultar el contenedor del sobre
        envelopeContainer.style.opacity = '0';
        envelopeContainer.style.transform = 'scale(0.8)';
        
        // Mostrar la carta después de un pequeño delay
        setTimeout(() => {
            letterContainer.classList.add('show');
            closeBtn.style.display = 'block';
            
            // Efecto de partículas de corazones
            createHeartParticles();
        }, 400);
        
        // Reproducir sonido de papel (si está disponible)
        playPaperSound();
    }
    
    // Función para cerrar la carta
    function closeLetter() {
        if (!isOpen) return;
        
        isOpen = false;
        
        // Ocultar la carta
        letterContainer.classList.remove('show');
        closeBtn.style.display = 'none';
        
        // Mostrar el sobre nuevamente
        setTimeout(() => {
            envelope.classList.remove('opened');
            envelopeContainer.style.opacity = '1';
            envelopeContainer.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Event listeners
    envelopeContainer.addEventListener('click', openLetter);
    closeBtn.addEventListener('click', closeLetter);
    
    // También permitir cerrar haciendo clic fuera de la carta
    letterContainer.addEventListener('click', function(e) {
        if (e.target === letterContainer) {
            closeLetter();
        }
    });
    
    // Efecto de partículas de corazones
    function createHeartParticles() {
        const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘', '💞', '💓'];
        const container = document.querySelector('.container');
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.position = 'fixed';
                heart.style.fontSize = '20px';
                heart.style.left = Math.random() * window.innerWidth + 'px';
                heart.style.top = '100%';
                heart.style.zIndex = '1000';
                heart.style.pointerEvents = 'none';
                heart.style.animation = 'heartFloat 3s ease-out forwards';
                
                container.appendChild(heart);
                
                // Remover el corazón después de la animación
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 3000);
            }, i * 100);
        }
    }
    
    // Función para reproducir sonido (opcional)
    function playPaperSound() {
        // Crear un sonido simple usando Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // Si no se puede reproducir sonido, no hacer nada
            console.log('Audio no disponible');
        }
    }
    
    // Efectos adicionales al hacer hover sobre el sobre
    envelopeContainer.addEventListener('mouseenter', function() {
        if (!isOpen) {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        }
    });
    
    envelopeContainer.addEventListener('mouseleave', function() {
        if (!isOpen) {
            this.style.transform = 'scale(1) rotate(0deg)';
        }
    });
    
    // Animación de escritura para el texto de la carta (opcional)
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Efecto de brillo en el sello del corazón
    const heartSeal = document.querySelector('.heart-seal');
    setInterval(() => {
        heartSeal.style.filter = 'drop-shadow(0 4px 8px rgba(50,205,50,0.8))';
        setTimeout(() => {
            heartSeal.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))';
        }, 500);
    }, 2000);
    
    // Funcionalidad de la galería de fotos laterales
    const sidePhotoItems = document.querySelectorAll('.side-photo-item, .side-video-item');
    const photoModal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentPhotoIndex = 0;
    let photoSources = [];
    
    // Recopilar todas las fuentes de las fotos y videos
    sidePhotoItems.forEach((item, index) => {
        const src = item.dataset.src;
        if (src) {
            photoSources.push(src);
        }
        
        item.addEventListener('click', () => {
            currentPhotoIndex = index;
            openPhotoModal(photoSources[currentPhotoIndex]);
        });
    });
    
    // Abrir modal de foto/video
    function openPhotoModal(src) {
        // Determinar si es video o imagen
        if (src.endsWith('.mp4')) {
            // Para videos, crear un elemento video temporal
            const video = document.createElement('video');
            video.src = src;
            video.controls = true;
            video.style.maxWidth = '100%';
            video.style.maxHeight = '70vh';
            video.style.borderRadius = '15px';
            video.style.border = '3px solid #98FB98';
            
            // Limpiar el modal y agregar el video
            modalImage.style.display = 'none';
            const modalContent = document.querySelector('.modal-content');
            const existingVideo = modalContent.querySelector('video');
            if (existingVideo) {
                existingVideo.remove();
            }
            modalContent.insertBefore(video, modalImage);
        } else {
            // Para imágenes, usar el elemento img existente
            modalImage.src = src;
            modalImage.style.display = 'block';
            const existingVideo = document.querySelector('.modal-content video');
            if (existingVideo) {
                existingVideo.remove();
            }
        }
        
        photoModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Efecto de aparición suave
        setTimeout(() => {
            photoModal.style.opacity = '1';
        }, 10);
    }
    
    // Cerrar modal de foto
    function closePhotoModal() {
        photoModal.style.opacity = '0';
        setTimeout(() => {
            photoModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    // Navegar entre fotos
    function showNextPhoto() {
        currentPhotoIndex = (currentPhotoIndex + 1) % photoSources.length;
        modalImage.src = photoSources[currentPhotoIndex];
    }
    
    function showPrevPhoto() {
        currentPhotoIndex = (currentPhotoIndex - 1 + photoSources.length) % photoSources.length;
        modalImage.src = photoSources[currentPhotoIndex];
    }
    
    // Event listeners para el modal
    closeModal.addEventListener('click', closePhotoModal);
    nextBtn.addEventListener('click', showNextPhoto);
    prevBtn.addEventListener('click', showPrevPhoto);
    
    // Cerrar modal al hacer clic fuera de la imagen
    photoModal.addEventListener('click', (e) => {
        if (e.target === photoModal) {
            closePhotoModal();
        }
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (photoModal.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    closePhotoModal();
                    break;
                case 'ArrowRight':
                    showNextPhoto();
                    break;
                case 'ArrowLeft':
                    showPrevPhoto();
                    break;
            }
        }
    });
    
    // Efecto de carga suave para las imágenes laterales
    const sideImages = document.querySelectorAll('.side-photo-item img, .side-video-item video');
    sideImages.forEach(media => {
        if (media.tagName === 'IMG') {
            media.addEventListener('load', () => {
                media.style.opacity = '1';
            });
        } else if (media.tagName === 'VIDEO') {
            media.addEventListener('loadeddata', () => {
                media.style.opacity = '1';
            });
        }
        
        // Establecer opacidad inicial
        media.style.opacity = '0';
        media.style.transition = 'opacity 0.5s ease';
    });
    
    // Animación de entrada escalonada para las fotos laterales
    const sidePhotoItemsArray = Array.from(sidePhotoItems);
    sidePhotoItemsArray.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
        
        // Aplicar delay escalonado
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 500 + (index * 100)); // Comienza después de que se abra la carta
    });
});

// CSS adicional para las animaciones de partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes heartFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        0% {
            opacity: 0;
            transform: translateY(30px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .photo-modal {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .letter-container::-webkit-scrollbar {
        width: 8px;
    }
    
    .letter-container::-webkit-scrollbar-track {
        background: rgba(152,251,152,0.2);
        border-radius: 4px;
    }
    
    .letter-container::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #32CD32, #228B22);
        border-radius: 4px;
    }
    
    .letter-container::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #228B22, #32CD32);
    }
`;
document.head.appendChild(style);
