import React, { useEffect, useRef } from 'react';
import voice from '../../../../public/audio/gamemusic/theme4.wav';

export default function Theme4audio() {
  const voiceRef = useRef(null);

  useEffect(() => {
    const  voiceElement =  voiceRef.current;

    if ( voiceElement) {
      voiceElement.volume = 0.1; // Установка громкости на 50%
      voiceElement.playbackRate = 1.0; // Установка скорости на 150%
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
      <audio  src={voice} ref={voiceRef}  loop/>
    </div>
  );
};