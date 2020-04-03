// 1. Identificar componentes de abajo arriba así conoceras las dependencias de cada componente
// y no te dejarás ninguno, con lo cual conseguirás componenetes más pequeños y que cumplan la S de SOLID.

// 2. Extraer la lógica de aplicación (no la de pintar) de los componentes a un archivo distinto.

// 3. Utilizar tanto el mediator pattern como el pub-sub pattern con cuidado. Especial atención a intentar
// no usar el mediator en un arbol de componentes profundo.

// 4. Definir la configuración de la aplicación en un sito bien localizado.

// 5. Intentar no usar strings si no constantes.

// 6. Intenar tener una clase base o una serie de mixins que resuelvan la lógica común a todos los
// componentes de la aplicación.

// 7. Definir un core muy pequeño de utilidades para trabajar (no relacionadas con la lógica de la aplicación)

// 8. Cuidado con el estado global y los singgletons porque puede que no podamos reutilizar componentes.

// 9. Cuando se da un código o un algorítmo difícil iterar y refactorizar para simplicarlo lo máximo posible.

// 10. No utilizar innerHTML porque permite ataques al pintar variables dadas por el cliente
