import { useEffect, useRef, useState } from 'react';
import voice from './step_grass.wav';

export default function StepGrass() {
  const voiceRef = useRef(null);

  useEffect(() => {
    const  voiceElement = voiceRef.current;

    if (voiceElement) {
      voiceElement.volume = 0.2; // Установка громкости на 20%
      voiceElement.playbackRate = 1.0; // Установка скорости на 100%
      voiceElement.addEventListener('canplay', handleCanPlay);
    }

    function handleCanPlay() {
      voiceElement.removeEventListener('canplay', handleCanPlay);
    }

    return () => {
      if (voiceElement) {
        voiceElement.removeEventListener('canplay', handleCanPlay);
      }
    };
  }, []);

  const goHandler = (e) => {
    const voiceElement = voiceRef.current;
    if(e.code === 'KeyW') {
      voiceElement.play();
    }
  }

  return (
    <div >
      <input onKeyDown={goHandler} />
      <audio  src={voice} ref={voiceRef} preload ="none" />
    </div>
  );
}