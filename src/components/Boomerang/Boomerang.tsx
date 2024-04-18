import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../redux/hooks';
import { setScores } from '../../redux/userSlice';

const initTrack = new Array(30).fill('__');

const enemySkins = ['👾', '👹', '👻', '👽', '👿', '💩', '🤡', '🤺', '🧛', '🧟', '🎃'];

interface IGame {
  status: string;
  score: number;
  track: string[];
  heroPosition: number;
  heroSkin: string;
  boomerangPosition: number;
  boomerangIsFlying: boolean;
  enemyPosition: number;
  enemySpeed: number;
  enemySkin: string;
  enemyIsAlive: boolean;
}

const initGame = {
  status: 'init',
  score: 0,
  track: initTrack,
  heroPosition: 0,
  heroSkin: '🤠',
  boomerangPosition: 0,
  boomerangIsFlying: false,
  enemyPosition: initTrack.length - 1,
  enemySpeed: 200,
  enemySkin: enemySkins[Math.floor(Math.random() * enemySkins.length)],
  enemyIsAlive: true
}

export function Boomerang({ handlerDialog }) {
  const [game, setGame] = useState<IGame>(initGame)

  const dispatch = useAppDispatch()

  useEffect(() => {
    setGame((pre: IGame): IGame => {
      const newTrack = pre.track.map((el, index) => {
      if (index === pre.heroPosition) {
        return pre.heroSkin;
      } else if (index === pre.boomerangPosition) {
        return '🌀';
      } else if (index === pre.enemyPosition) {
        return pre.enemySkin;
      } else {
        return '__';
      }
    });
    return ({...pre, track: newTrack});
  });
  }, [game.heroPosition, game.heroSkin, game.boomerangPosition, game.enemyPosition])

  useEffect(() => {
    setGame((pre) => {
      if (pre.enemyPosition <= pre.heroPosition + 1) {
        return ({...pre, score: 0, status: 'lose', heroSkin: '💀'})
      } else {
        return pre;
      }
    })
  }, [game.heroPosition, game.enemyPosition])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setGame((pre: IGame): IGame => {
        if (pre.boomerangIsFlying && pre.boomerangPosition < pre.enemyPosition - 1 && pre.enemyIsAlive) {
          return ({...pre, boomerangPosition: pre.boomerangPosition + 1})
        } else if (pre.boomerangIsFlying && pre.boomerangPosition >= pre.enemyPosition - 1 && pre.enemyIsAlive) {
          return ({...pre, score: pre.score + 100, enemySkin: '💀', enemySpeed: Math.floor(pre.enemySpeed * 0.8), enemyIsAlive: false, boomerangPosition: pre.boomerangPosition - 1});
        } else if (pre.boomerangIsFlying && !pre.enemyIsAlive && pre.boomerangPosition > pre.heroPosition) {
          return ({...pre, boomerangPosition: pre.boomerangPosition - 1});
        } else if (pre.status === 'play' && pre.boomerangIsFlying && pre.boomerangPosition <= pre.heroPosition && !pre.enemyIsAlive) {
          const newEnemy = enemySkins[Math.floor(Math.random() * enemySkins.length)];
          clearTimeout(timeout);
          return ({...pre, enemySkin: newEnemy, enemyIsAlive: true, enemyPosition: initTrack.length - 1, boomerangIsFlying: false, boomerangPosition: pre.heroPosition});
        } else {
          return pre;
        }
      });  
    }, 50);
  }, [game.status, game.boomerangIsFlying, game.boomerangPosition])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setGame((pre) => {
        if (pre.status === 'play' && pre.enemyIsAlive && pre.enemyPosition > pre.heroPosition) {        
          return ({...pre, enemyPosition: pre.enemyPosition - 1})
        } else {
          return pre;
        }
      })
    }, game.enemySpeed);
  }, [game.status, game.enemyIsAlive, game.enemyPosition])
  
  useEffect(() => {
    setGame((pre) => {
      if (pre.score >= 1000) {
        return ({...pre, status: 'won'})
      } else {
        return pre;
      }
    })
  }, [game.score])

  // !================================================================

  const exitGameHandler = () => {
    dispatch(setScores(game.score))
    handlerDialog('4')
  }

    // !================================================================

  const moveHero = (e: React.KeyboardEvent): void => {
    if (e.code === "KeyD") {
      setGame((pre) => {      
        if (pre.status === 'play' && pre.heroPosition < pre.track.length - 1 && !pre.boomerangIsFlying) {
          return ({...pre, heroPosition: pre.heroPosition + 1, boomerangPosition: pre.boomerangPosition + 1});
        } else if (pre.status === 'play' && pre.heroPosition < pre.track.length - 1 && pre.boomerangIsFlying) {
          return ({...pre, heroPosition: pre.heroPosition + 1});
        } else {
          return pre;
        }
      });
    }
    if (e.code === "KeyA") {
      setGame((pre) => {      
        if (pre.status === 'play' && pre.heroPosition > 0 && !pre.boomerangIsFlying) {
          return ({...pre, heroPosition: pre.heroPosition - 1, boomerangPosition: pre.boomerangPosition - 1});
        } else if (pre.status === 'play' && pre.heroPosition > 0 && pre.boomerangIsFlying) {
          return ({...pre, heroPosition: pre.heroPosition - 1});
        } else {
          return pre;
        }
      });
    }
    if (e.code === "KeyE") {
      setGame((pre) => {
        if (pre.status === 'play') {
          return ({...pre, boomerangIsFlying: true})
        } else {
          return pre;
        }
      });
    }
  }

  return (
    <div onKeyDown={moveHero} id="boomerang">
      <h2>Очки: {game.score}</h2>
      {(() => {
        switch (game.status) {
          case 'init':
          case 'end':
            return <h3>Нажмите на кнопку для старта</h3>;
          case 'play':
            return <h3>Кидайте бумеранг!</h3>;
          case 'lose':
            return <h3 style={{ color: 'red' }}>Вы проиграли!</h3>;
          case 'won':
            return <h3 style={{ color: 'green' }}>Вы выиграли!</h3>;
        }
      })()}
      <p>Управление: A - влево, D - вправо, E - кинуть бумеранг</p>
      <br />
      <div className="game" style={{ display: 'flex', fontSize: '22px'}}>{game.track.map((el, i) => <div key={i}>{el}</div>)}</div>
      <br />
      {(() => {
        switch (game.status) {
          case 'init':
            return <Button onClick={() => setGame((pre) => ({...pre, status: 'play'}))} >Начать игру</Button>;
          case 'play':
            return <Button onClick={() => setGame((pre) => ({...pre, status: 'end'}))} >Завершить игру</Button>;
          case 'lose':
          case 'end':
            return <Button onClick={() => setGame((pre) => ({...initGame, status: 'play'}))} >Начать заново</Button>;
          case 'won':
            return <Button onClick={() => exitGameHandler()}>Идем дальше!</Button>;
        }
      })()}
    </div>
    
  )
}
