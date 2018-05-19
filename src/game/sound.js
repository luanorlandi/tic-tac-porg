import pathChewbacca1 from '../assets/chewbacca1.wav';
import pathChewbacca2 from '../assets/chewbacca2.wav';
import pathChewbaccaWin from '../assets/chewbacca3.wav';
import pathPorg1 from '../assets/porg1.wav';
import pathPorg2 from '../assets/porg2.wav';
import pathPorgWin from '../assets/porg3.wav';

const starWarsAudios = {
  chewbaccaMove: [
    new Audio(pathChewbacca1),
    new Audio(pathChewbacca2),
  ],
  chewbaccaWin: [
    new Audio(pathChewbaccaWin),
  ],
  porgMove: [
    new Audio(pathPorg1),
    new Audio(pathPorg2),
  ],
  porgWin: [
    new Audio(pathPorgWin),
  ],
}

const playRandomAudio = (audios) => {
  if (audios.length === 0) {
    return;
  }

  const audio = audios[Math.floor(Math.random() * audios.length)];

  audio.currentTime = 0;
  audio.play();
}

export const playMoveSound = (isPlayerOne) => {
  const playerAudio = isPlayerOne ?
    starWarsAudios.porgMove : starWarsAudios.chewbaccaMove;

  playRandomAudio(playerAudio);
}

export const playWinSound = (isPlayerOneWinner) => {
  const playerAudio = isPlayerOneWinner ?
    starWarsAudios.porgWin : starWarsAudios.chewbaccaWin;

  playRandomAudio(playerAudio);
}

export default { playMoveSound, playWinSound };
