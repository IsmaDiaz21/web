// Sincronizar las letras con la canción
const audio = document.querySelector("#background-music"); // Usar el ID actualizado
const lyricsContainer = document.querySelector("#lyrics"); // Renombrado para claridad

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
// Ordenado cronológicamente para un procesamiento más eficiente
const lyricsData = [
  { text: "At the time", time: 15 },
  { text: "The whisper of birds", time: 18 },
  { text: "Lonely before the sun cried", time: 27 },
  { text: "Fell from the sky", time: 32 },
  { text: "Like water drops", time: 33 },
  { text: "Where I'm now? I don't know why", time: 41 },
  { text: "Nice butterflies in my hands", time: 47 },
  { text: "Too much light for twilight", time: 54 },
  { text: "In the mood for the flowers love", time: 59 },
  { text: "That vision", time: 67 },
  { text: "Really strong, blew my mind", time: 72 },
  { text: "Silence Let me see what it was", time: 78 },
  { text: "I only want to live in clouds", time: 83 },
  { text: "Where I'm now? I don't know why", time: 91 },
  { text: "Nice butterflies in my hands", time: 97 },
  { text: "Too much light for twilight", time: 104 },
  { text: "In the mood for the flowers love", time: 108 },
  { text: "Love.", time: 140 }, // Movido a su posición cronológica
  { text: "At the time", time: 144 },
  { text: "The whisper of birds", time: 148 },
  { text: "Lonely before the sun cried", time: 153 },
  { text: "Fell from the sky", time: 158 },
  { text: "Like water drops", time: 164 },
  { text: "Where I'm now? I don't know why", time: 169 },
  { text: "Nice butterflies in my hands", time: 176 },
  { text: "Too much light for twilight", time: 183 },
  { text: "In the mood for the flowers", time: 188 },
];

let currentLyricIndex = 0; // Para optimizar la búsqueda de la línea actual

// Animar las letras
function updateLyrics() {
  const currentTime = audio.currentTime;

  // Avanzar el índice si la línea actual ya pasó
  while (currentLyricIndex < lyricsData.length - 1 && currentTime >= lyricsData[currentLyricIndex + 1].time) {
    currentLyricIndex++;
  }

  const currentLine = lyricsData[currentLyricIndex];
  const nextLine = lyricsData[currentLyricIndex + 1];

  // Calcular la duración de la línea actual hasta la siguiente o un valor por defecto
  const lineDuration = nextLine ? nextLine.time - currentLine.time : 6; // Default 6 seconds if it's the last line

  if (currentTime >= currentLine.time && currentTime < currentLine.time + lineDuration) {
    const fadeInDuration = 0.5; // Duración del efecto de aparición en segundos (aumentado para suavidad)
    const fadeOutDuration = 1.0; // Duración del efecto de desaparición antes de la siguiente línea

    let opacity;
    if (currentTime < currentLine.time + fadeInDuration) {
      // Fade in
      opacity = (currentTime - currentLine.time) / fadeInDuration;
    } else if (currentTime > currentLine.time + lineDuration - fadeOutDuration) {
      // Fade out
      opacity = 1 - ((currentTime - (currentLine.time + lineDuration - fadeOutDuration)) / fadeOutDuration);
    } else {
      // Fully visible
      opacity = 1;
    }

    lyricsContainer.style.opacity = Math.max(0, Math.min(1, opacity)); // Asegurar que la opacidad esté entre 0 y 1
    lyricsContainer.innerHTML = currentLine.text;
  } else {
    // Restablece la opacidad y el contenido si no hay una línea actual
    lyricsContainer.style.opacity = 0;
    lyricsContainer.innerHTML = "";
  }

  requestAnimationFrame(updateLyrics); // Usar requestAnimationFrame para una animación más fluida
}

// Iniciar la animación de letras cuando el audio esté listo
audio.addEventListener('play', () => {
    requestAnimationFrame(updateLyrics);
});


// Función para ocultar el título después de un tiempo dinámico
function hideTitle() {
  const titleElement = document.querySelector(".title-message"); // Usar el nombre de clase actualizado
  if (!titleElement) return;

  titleElement.style.animation = "fadeOut 3s ease-in-out forwards";
  setTimeout(() => {
    titleElement.style.display = "none";
  }, 3000); // Espera 3 segundos antes de ocultar completamente
}

// Calcular la duración total del audio para ocultar el título
audio.addEventListener('loadedmetadata', () => {
    const audioDuration = audio.duration; // Duración total del audio en segundos
    const delayBeforeHide = Math.max(0, audioDuration - 3); // Ocultar 3 segundos antes de que termine el audio, o inmediatamente si es muy corto

    setTimeout(hideTitle, delayBeforeHide * 1000); // Convertir a milisegundos
});

// Asegurarse de que el título se oculte incluso si el audio no se reproduce automáticamente
// o si el evento loadedmetadata no se dispara a tiempo.
// Se mantiene el valor original de 216 segundos como fallback si no se puede obtener la duración del audio.
setTimeout(hideTitle, 216000);