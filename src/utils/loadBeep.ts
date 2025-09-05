import gravitationBeep from '../assets/audios/gravitational_beep.mp3';

export function loadBeep() {
  const audio = new Audio(gravitationBeep);
  audio.load();

  return () => {
    audio.currentTime = 0;
    audio
      .play()
      .catch(error => console.error('Error trying to play audio', error));
  };
}
