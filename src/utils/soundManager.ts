import flipAudio from "../sounds/flip.mp3";
import winAudio from "../sounds/win.mp3";
import loseAudio from "../sounds/lose.wav";
import grabAudio from "../sounds/grab.mp3";
import dropAudio from "../sounds/drop.mp3";

let isMuted: boolean = false;

const sounds = {
  flip: new Audio(flipAudio),
  win: new Audio(winAudio),
  lose: new Audio(loseAudio),
  grab: new Audio(grabAudio),
  drop: new Audio(dropAudio),
};

sounds.flip.volume = 0.5;
sounds.win.volume = 0.7;
sounds.lose.volume = 0.4;
sounds.grab.volume = 0.3;
sounds.drop.volume = 0.4;

export const setMuteState = (muted: boolean) => {
  isMuted = muted;
};

export const playSound = (name: keyof typeof sounds) => {
  if (isMuted) return;

  const sound = sounds[name];
  if (!sound) return;

  const clone = sound.cloneNode() as HTMLAudioElement;
  clone.volume = sound.volume;

  clone.play().catch((err) => {
    console.warn(`${name} sound blocked, need to click somewhere`, err);
  });
};
