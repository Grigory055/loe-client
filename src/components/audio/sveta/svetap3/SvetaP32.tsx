import React, { useEffect, useRef } from 'react';
import voice from '../../../../../public/audio/svetap3/p3Sveta2.wav';

export default function SvetaP32() {
  const voiceRef = useRef(null);

  useEffect(() => {
    const  voiceElement =  voiceRef.current;

    if ( voiceElement) {
      voiceElement.volume = 0.5; // Установка громкости на 50%
      voiceElement.playbackRate = 1.3; // Установка скорости на 150%
      voiceElement.addEventListener('canplay', handleCanPlay);
      voiceElement.play().catch((error) => {
        console.log('Auto-play failed:', error);
      });
    }

    function handleCanPlay() {
      voiceElement.play();
      voiceElement.removeEventListener('canplay', handleCanPlay);
    }

    return () => {
      if (voiceElement) {
        voiceElement.removeEventListener('canplay', handleCanPlay);
      }
    };
  }, []);

  return (
    <div >
      <audio  src={voice} ref={voiceRef} />
    </div>
  );
};