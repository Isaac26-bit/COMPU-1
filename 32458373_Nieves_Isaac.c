#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <windows.h> 
#define GREEN "\033[0;32m"
#define RESET "\033[0m"
#define MAX_LIBROS 100
#define RED "\033[0;31m"
#include <ctype.h>
void a_mayusculas(char *cadena) {
    int i = 0;
    while (cadena[i]) {
        cadena[i] = toupper((unsigned char)cadena[i]);
        i++;
    }
}
int main()
{
   int libros;

   printf ("Ingrese el numero de libros: ");
   scanf ("%d", &libros);
   getchar(); 

   char titulo[libros][100], autor[libros][100], genero[libros][100];
   int ISBN[libros], stock[libros];
   int i;
   float precio[libros], ganancia[libros], acum=0;

   printf("----------------------------------------------------------------------------------------\n");

   for (i = 0; i < libros; i++) {
      system("cls");
      
      printf("----------------------------------------------------------------------------------------\n");
      
      printf ("Ingrese el titulo del libro %d: ", i + 1);
      scanf ("%[^\n]", titulo[i]);
      getchar(); 

      printf ("Ingrese el autor del libro %d: ", i + 1);
      scanf ("%[^\n]", autor[i]);
      getchar(); 

      printf ("Ingrese el genero del libro %d: ", i + 1);
      scanf ("%[^\n]", genero[i]);
      getchar(); 

      printf ("Ingrese el ISBN del libro %d: ", i + 1);
      scanf ("%d", &ISBN[i]);
        
           while (ISBN[i] < 1000000000 || ISBN[i] > 9999999999) {
            printf("El ISBN debe tener 10 digitos. Ingrese nuevamente el ISBN del libro %d: ", i + 1);
            scanf("%d", &ISBN[i]);
           }
      

      printf ("Ingrese el stock del libro %d: ", i + 1);
      scanf ("%d", &stock[i]);
      getchar(); 

      printf ("Ingrese el precio del libro %d: ", i + 1);
      scanf ("%f", &precio[i]);
      getchar(); 
      ganancia[i] = stock[i] * precio[i];
      acum += ganancia[i];
     
   }
system("cls"); 

   printf("----------------------------------------------------------------------------------------\n");
   printf("Resumen de libros ingresados:\n");
   printf("----------------------------------------------------------------------------------------\n");

   printf("|TITULO\t\t\t|AUTOR\t\t\t|GENERO\t\t\t|ISBN\t\t|STOCK\t\t|PRECIO\t\t|GANANCIA\n");
   printf("----------------------------------------------------------------------------------------\n");
    
   for (i = 0; i < libros; i++) {
    a_mayusculas(titulo[i]);
    a_mayusculas(autor[i]);
    a_mayusculas(genero[i]);
    printf("|%-20s\t|%-20s\t|%-20s\t|%-10d\t|%-10d\t|%-10.2f\t|%-10.2f\n|", 
        titulo[i], autor[i], genero[i], ISBN[i], stock[i], precio[i], ganancia[i]);
    if (ganancia[i] > 0) {
        printf(GREEN " %15.1f" RESET "\n", ganancia[i]);
    } else if (ganancia[i] < 0) {
        printf(RED " %15.1f" RESET "\n", ganancia[i]);
    } else {
        printf(" %15.1f\n", ganancia[i]);
    }
} // No di como collcar la ganancia de color arriba
   printf("----------------------------------------------------------------------------------------\n");
   system("pause"); 
   system("cls"); 

  printf ("Desea hacer una busqueda por algun criterio? (S/N): ");
  char respuesta;
  scanf(" %c", &respuesta);
  getchar(); 

  if (respuesta == 'S' || respuesta == 's') {
      printf("Ingrese el criterio de busqueda (TITULO/AUTOR/GENERO/ISBN)(EN MAYUSCULA): ");
      char criterio[20];
      scanf("%[^\n]", criterio);
      getchar(); 

      printf("Ingrese el valor a buscar: ");
      char valor[100];
      scanf("%[^\n]", valor);
      getchar(); 
      printf("Resultados de la busqueda:\n");
      printf("----------------------------------------------------------------------------------------\n");
      printf("|TITULO\t\t\t|AUTOR\t\t\t|GENERO\t\t\t|ISBN\t\t|STOCK\t\t|PRECIO\t\t|GANANCIA\n");
      printf("----------------------------------------------------------------------------------------\n");

      for (i = 0; i < libros; i++) {
          if ((strcmp(criterio, "TITULO") == 0 && strcmp(titulo[i], valor) == 0) ||
              (strcmp(criterio, "AUTOR") == 0 && strcmp(autor[i], valor) == 0) ||
              (strcmp(criterio, "GENERO") == 0 && strcmp(genero[i], valor) == 0) ||
              (strcmp(criterio, "ISBN") == 0 && ISBN[i] == atoi(valor))) {
              printf("%-20s\t%-20s\t%-20s\t%-10d\t%10d\t%-10.2f\t%-10.2f\n", titulo[i], autor[i], genero[i], ISBN[i], stock[i], precio[i], ganancia[i]);
          }
      }

      printf("----------------------------------------------------------------------------------------\n");
  }

  return 0;
}