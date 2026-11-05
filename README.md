# Protocolo 4.2 · Misión express

**[Abrir el juego](https://alejandro117b.github.io/4.2-Solucion-y-Documentacion/)**

Actividad individual de aproximadamente **3 minutos**, basada en la presentación **4.2 Solución y documentación**, de Software Embebido. Cada participante abre el enlace, escribe su nombre y juega directamente en su navegador. No instala nada, no necesita cuenta de GitHub y no tiene que descargar el código.

## Tres retos

1. **Reparar, 45–60 s:** reproducir la desconexión, localizar la causa e insertar la validación que falta.
2. **Comprobar, 45–60 s:** ejecutar cuatro pruebas rápidas y activar luz y sonido para validar el aviso al operador.
3. **Documentar, 30–45 s:** adjuntar el registro de pruebas y la versión del firmware. La ficha y la cadena de trazabilidad se completan con las acciones anteriores.

El recorrido correcto usa **14 acciones de juego**, además de escribir el nombre e iniciar. Las pistas son gratuitas y los errores se explican al momento. El reloj orienta, sin bloquear ni eliminar al participante. Los tiempos son estimaciones para clase, no un límite obligatorio.

## Para compartir con el grupo

Comparte este enlace de **GitHub Pages**:

https://alejandro117b.github.io/4.2-Solucion-y-Documentacion/

La dirección `github.com/Alejandro117B/4.2-Solucion-y-Documentacion` muestra el código del repositorio. La dirección `alejandro117b.github.io/...` abre el juego. Cada compañero conserva su propia partida y resultado; no necesita crear una sala ni esperar a los demás.

## Publicación y actualizaciones

GitHub Pages se configura en **Settings → Pages → Deploy from a branch → main → / (root)**. Al actualizar los archivos de la rama `main`, Pages vuelve a publicar el sitio. No se necesita compilación ni servidor propio.

`index.html`, `styles.css`, `core.js`, `board.js`, `app.js` y `favicon.svg` deben permanecer juntos en la raíz. `.nojekyll` indica que los archivos se sirven directamente.

Guía oficial: [configurar el origen de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Resultados

Cada participante obtiene una puntuación de 100 posibles: reparar vale 40, comprobar 30 y documentar 30. Cada decisión incorrecta distinta resta 5 puntos, hasta la mitad del valor del reto. Repetir el mismo error no vuelve a penalizar. Las pistas, el tiempo y las pruebas no restan puntos.

El resultado se descarga como texto, con nombre, tiempo, puntuación y bitácora técnica. También puede imprimirse o guardarse como PDF desde el navegador. **No hay recolección automática de resultados**: pide que entreguen el archivo o una captura por el medio que utilice tu grupo.

## Funcionamiento

- HTML, CSS y JavaScript estándar, sin frameworks ni dependencias externas.
- Adaptado para computadora, tableta y teléfono. Interacciones por clic o toque.
- Nombre y progreso guardados solo en el navegador mediante `localStorage`, cuando está disponible. Al recargar se puede continuar. La versión express utiliza un guardado separado de la versión larga anterior.
- Si se bloquea el almacenamiento, se puede terminar manteniendo la página abierta.
- El sonido del juego se representa visualmente; no requiere permiso de audio ni volumen activado en clase.
- El nombre no es una identidad verificada. El resultado local sirve como actividad formativa, no como examen supervisado.
- Los 85 °C de sustitución, la respuesta de 120 ms y el comportamiento del operador son simulados.
- El enlace publicado necesita Internet al cargar. Como alternativa local, la carpeta completa se puede abrir con doble clic en `index.html`.

## Mantenimiento

- `core.js`: motor de juego, estados, simulador, validación del guardado y puntuación.
- `board.js`: ilustración vectorial del circuito.
- `app.js`: interfaz, guardado local y descarga del resultado.
- `styles.css`: diseño adaptable y estilos de impresión.
- `tests.cjs`: comprobaciones del motor. Ejecutar `node tests.cjs` si se dispone de Node; los jugadores no lo necesitan.
- `GUIA-DOCENTE.md`: introducción breve, soluciones y cierre de la actividad.
