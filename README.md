# Protocolo 4.2 · Los tres juegos

## [Jugar en el navegador](https://alejandro117b.github.io/4.2-Solucion-y-Documentacion/)

Actividad individual inspirada en los juegos del cristal, la cuerda y la muñeca. Las preguntas se basan en **4.2 Solución y documentación de software embebido**. Cada persona escribe su nombre y juega directamente desde el enlace. No instala nada ni necesita cuenta de GitHub.

## Cómo se juega

1. **Puente de cristal:** tres preguntas con dos opciones. Una respuesta correcta permite avanzar por un cristal seguro. Una incorrecta rompe el cristal y elimina al jugador de ese nivel.
2. **Tira de la cuerda:** cada acierto mueve la cuerda hacia el jugador; cada error la mueve hacia el rival. Dos puntos de ventaja deciden la victoria o derrota. Hay un máximo de cinco preguntas; si se llega al final o se acaba el tiempo, gana quien tenga ventaja. Un empate al acabar el tiempo no cuenta como victoria del jugador.
3. **Luz roja, luz verde:** exactamente dos preguntas. Cada acierto permite avanzar y sobrevivir al giro de la muñeca. Un error provoca la eliminación en ese nivel.

**Cada nivel dura como máximo 60 segundos de juego**, menos de 1:30. El reloj se detiene en la explicación y al cambiar de nivel. Aunque alguien pierda un nivel, puede continuar con el siguiente. No hay salas, cuentas ni multijugador.

## Puntuación

- **Cristales, 30 puntos:** 10 por respuesta correcta antes de terminar el nivel.
- **Cuerda, 40 puntos:** ganar sin errores vale 40. Cada error reduce 10 puntos de esa victoria, con mínimo de 10. Al perder, se conservan 5 puntos por acierto, hasta 20.
- **Muñeca, 30 puntos:** 15 por respuesta correcta.

El máximo es 100 puntos. Al final aparecen nombre, puntuación total y resultado de cada nivel. Se puede descargar el resultado o guardarlo como PDF desde el diálogo de impresión. Los resultados no se envían automáticamente al docente.

## Publicación

GitHub Pages publica la rama `main`, carpeta `/ (root)`. Basta con actualizar los archivos de esa rama; no hay compilación ni dependencias. El enlace del juego es:

https://alejandro117b.github.io/4.2-Solucion-y-Documentacion/

Los archivos necesarios son `index.html`, `styles.css`, `core.js`, `app.js` y `favicon.svg`. `.nojekyll` permite servirlos directamente. La carpeta completa también se puede abrir localmente con doble clic en `index.html`.

## Datos y compatibilidad

El nombre, el progreso y el resultado se guardan solo en el navegador mediante `localStorage`, si está disponible. El reloj de un nivel continúa si se sale o se recarga durante la partida. Si el navegador bloquea el almacenamiento, se puede jugar manteniendo la página abierta. Esta versión usa un guardado distinto de las actividades anteriores.

Los dibujos son SVG y CSS, sin imágenes remotas ni permisos de audio. Funciona con clic o toque y se adapta a computadora y teléfono. Es una actividad formativa con resultado local, sin comprobación de identidad.

## Mantenimiento

`core.js` contiene las preguntas y reglas. `app.js` dibuja las escenas y maneja la interfaz. `styles.css` contiene el diseño. `node tests.cjs` ejecuta una revisión breve del recorrido y de las eliminaciones; los jugadores no necesitan Node.
