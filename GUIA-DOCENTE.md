# Actividad de cierre · 3 minutos

## Instrucción para el grupo

> El monitor del laboratorio activa una alarma con datos inválidos. Abran el enlace, escriban su nombre y recuperen el sistema en tres retos: reparar, comprobar y documentar. Tienen unos tres minutos. Las pistas son gratuitas. Al final descarguen su resultado o tomen una captura para entregarla.

Enlace: https://alejandro117b.github.io/4.2-Solucion-y-Documentacion/

## Distribución del tiempo

Dedica 15 segundos a explicar el caso, entre 2 y 3 minutos a jugar y los últimos 15–30 segundos a mostrar o descargar el resultado. El recorrido correcto requiere 14 acciones de juego y una pulsación para iniciar después de escribir el nombre. No hay tiempo de espera, operaciones de arrastre ni preguntas abiertas para escribir.

El reloj no elimina a nadie. Si alguien se atasca, indica que use la pista gratuita del reto. Los tiempos son un objetivo de diseño y pueden variar con la lectura de cada persona.

## Soluciones

### 1. Reparar

Pulsar **Desconectar sensor**, localizar **Firmware** e insertar **Validar la lectura**. El ambiente está a 25 °C, pero el sensor desconectado devuelve un valor de sustitución de 85 °C junto con `valid=false`. El firmware anterior ignoraba esa bandera. Esperar o apagar siempre la alarma no corrige la causa conservando los requisitos.

### 2. Comprobar

Ejecutar las cuatro tarjetas: **25 °C = NORMAL; 30 °C = NORMAL; 31 °C = ALARMA; desconexión = ERROR**. La alarma simulada responde en 120 ms, menos de 2 s. Es verificación técnica. Después activar **Luz ON** y **Sonido ON**: el operador simulado percibe el aviso. Es validación del escenario de uso. El sonido se representa visualmente para evitar ruido y permisos de reproducción en clase.

### 3. Documentar

Adjuntar **Registro de las 4 pruebas** y **Firmware v1.1 + cambio**. La ficha conserva automáticamente la causa y la corrección; los dos adjuntos completan la evidencia y su versión. Una nota “ya funciona” o una foto aislada no demuestra condiciones ni permite repetir la corrección. La cadena `R-01 → control_alarma() → P-03 → E-04` queda asociada a esa misma recuperación.

## Resultado y evaluación

Reparar vale 40 puntos, comprobar 30 y documentar 30. Una decisión incorrecta distinta resta 5 puntos, hasta la mitad del valor del reto. Repetir un error no resta otra vez. Las pistas son gratuitas. El resultado y la bitácora se generan de forma individual y local. No hay envío automático al docente.

Como cierre, pide que identifiquen una evidencia que permita a alguien más repetir la solución. El ejercicio aplica el caso de las diapositivas 10–11, la verificación y validación de la 7, y la documentación y trazabilidad de las 8–12. Todas las mediciones son simuladas.
