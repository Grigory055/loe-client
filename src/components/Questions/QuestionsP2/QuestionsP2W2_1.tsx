import React, { useEffect, useState } from 'react'
import styles from './QuestionsP2.module.css';
import { useAppDispatch } from '../../../redux/hooks'
import { switchDialog, switchHeroWalk } from '../../../redux/RPGSlice'
import { setScores } from '../../../redux/userSlice';

export function QuestionsP2W2_1() {
  const[startP1W1,setStartP1W1] = useState<boolean>(false)
  const[coins,setCoins] = useState<number>(0)
  const[nextAnswer,setNextAnswer] = useState<boolean>(false)
  const[end,setEnd] = useState<boolean>(true)
  const question1 = "Что такое CRUD?"
  const question2 ="Коды успешных HTTP-ответов сервера"

  const dispatch = useAppDispatch();

  const handleCloseClick = () => {
    dispatch(switchHeroWalk(true));
    dispatch(switchDialog(false));
    dispatch(setScores(coins * 100))
  }

  const startHandler: () => void = () => {
    setStartP1W1(true)
   }

  const rightAnswerHandler: () => void = () => {
    setCoins((pre) => pre + 1)
    setNextAnswer(true)
   }

   const wrongAnswerHandler: () => void = () => {
    setNextAnswer(true)
   }

const secondRightAnswerHandler: () => void = () => {
    setCoins((pre) => pre + 1)
    setNextAnswer(false)
    setEnd(false)
   }

   const secondWrongAnswerHandler: () => void = () => { 
    setNextAnswer(false)
    setEnd(false)
   }


  return (
    <>
      <div className={styles.container}>
        {end?(<>
          <div className={styles.question_modal}>
            {startP1W1?(
            <>{nextAnswer?(<div>
              <h2>{question2}</h2>
              <div className={styles.answers}>
              <button onClick={secondRightAnswerHandler} className={styles.modal_btn_answer}>200, 201, 202</button>
              <button onClick={secondWrongAnswerHandler} className={styles.modal_btn_answer}>400, 404, 419</button>
              <button onClick={secondWrongAnswerHandler} className={styles.modal_btn_answer}>500, 505, 511</button>
            </div></div>):(<div>
              <h2>{question1}</h2>
              <div className={styles.answers}>
              <button onClick={wrongAnswerHandler} className={styles.modal_btn_answer}>CRUD расшифровывается как "CSS, React, useState, DBeaver".</button>
              <button onClick={wrongAnswerHandler} className={styles.modal_btn_answer}>CRUD расшифровывается как "Computer, Relax, Underground,Download".</button>
              <button onClick={rightAnswerHandler} className={styles.modal_btn_answer}>CRUD расшифровывается как "Create, Read, Update, Delete".</button>
              </div>
            </div>
            )}</>
          ): (<><p>ВСЁ ЕЩЕ ВТОРАЯ ФАЗА!</p><p></p><p>Что тут вообще происходит?</p>
            <button onClick={startHandler} className={styles.modal_btn}><img className={styles.btn_img} src="/components/start_btn_stop.gif" alt="start" /></button></>)}
          </div>
          </>):(<><h2>вы можете продолжить игру</h2><p>вы закончили, ответив на {coins} из 2 вопросов</p>
          <button onClick={() => handleCloseClick()} className={styles.modal_btn_answer}>далее</button></>)}
      </div>
    </>
  )
}