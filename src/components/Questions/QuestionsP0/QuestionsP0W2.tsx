import React, { useEffect, useState } from 'react'
import styles from './QuestionsP0.module.css';
import { Button } from '@mui/material';
import { useAppDispatch } from '../../../redux/hooks';
import { switchDialog, switchHeroWalk } from '../../../redux/RPGSlice';
import { setScores } from '../../../redux/userSlice';

export function QuestionsP0W2() {
  const[startP1W1,setStartP1W1] = useState<boolean>(false)
  const[coins,setCoins] = useState<number>(0)
  const[nextAnswer,setNextAnswer] = useState<boolean>(false)
  const[end,setEnd] = useState<boolean>(true)
  const question1 = "Как получить заголовок страницы??"
  const question2 ="Что такое DOM?"

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
              <button onClick={secondWrongAnswerHandler} className={styles.modal_btn_answer}>1. Когда уютно в нём!</button>
              <button onClick={secondWrongAnswerHandler} className={styles.modal_btn_answer}>2. Это библиотека, позволяющая работать с JS</button>
              <button onClick={secondRightAnswerHandler} className={styles.modal_btn_answer}>3. Это инструмент, позволяющий разработчикам управляться с содержимым веб-страницы</button>
            </div></div>):(<div>
              <h2>{question1}</h2>
              <div className={styles.answers}>
              <button onClick={rightAnswerHandler} className={styles.modal_btn_answer}>1. document.title;</button>
              <button onClick={wrongAnswerHandler} className={styles.modal_btn_answer}>2. document.getElementsByTagName("title");</button>
              <button onClick={wrongAnswerHandler} className={styles.modal_btn_answer}>3. let title = document.getElementById("title"); title.innerText;</button>
              </div>
            </div>
            )}</>
          ): (<><p>Прошу меня послать на курсы повышения зарплаты.</p>
            <p>Вот как ты тут оказался?</p><button onClick={startHandler} className={styles.modal_btn}><img className={styles.btn_img} src="/components/start_btn.gif" alt="start" /></button></>)}
          </div>
          </>):(<><h2>вы можете продолжить игру</h2><p>вы закончили, ответив на {coins} из 2 вопросов</p>
          <Button onClick={() => handleCloseClick()} >далее</Button></>)}
      </div>
    </>
  )
}
