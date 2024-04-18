import React, { useEffect, useState } from 'react'
import styles from './QuestionsP3.module.css';
import { useAppDispatch } from '../../../redux/hooks'
import { switchDialog, switchHeroWalk } from '../../../redux/RPGSlice'
import { setScores } from '../../../redux/userSlice';

export function QuestionsP3W1() {
  const[startP1W1,setStartP1W1] = useState<boolean>(false)
  const[coins,setCoins] = useState<number>(0)
  const[nextAnswer,setNextAnswer] = useState<boolean>(false)
  const[end,setEnd] = useState<boolean>(true)
  const question1 = "useDispatch, что возвращает?"
  const question2 ="Что такое React?"

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
              <button onClick={secondRightAnswerHandler} className={styles.modal_btn_answer}>1. JS библиотека для отрисовки пользовательского интерфейса через компоненты
</button>
              <button onClick={secondWrongAnswerHandler} className={styles.modal_btn_answer}>2. Библиотека для управления состоянием.</button>
              <button onClick={secondWrongAnswerHandler} className={styles.modal_btn_answer}>3. CSS Библиотека для управления цветом.</button>
            </div></div>):(<div>
              <h2>{question1}</h2>
              <div className={styles.answers}>
              <button onClick={wrongAnswerHandler} className={styles.modal_btn_answer}>1. Возвращает нужные данные из хранилища</button>

              <button onClick={wrongAnswerHandler} className={styles.modal_btn_answer}>2. Значение, которое будет вычислено только тогда, когда одна из зависимостей изменяется</button>
       
              <button onClick={rightAnswerHandler} className={styles.modal_btn_answer}>3. Функцию, которая позволяет компоненту отправлять действия в Redux Store</button>
              </div>
            </div>
            )}</>
          ): (<><p>Преисполнись!</p><p>Разве можно поверить в это?</p><p>Этот путь должен был сломать тебя... но ты оказался крепким орехом</p>
            <button onClick={startHandler} className={styles.modal_btn}><img className={styles.btn_img} src="/components/3dbtn_play.png" alt="start" /></button></>)}
          </div>
          </>):(<><h2>вы можете продолжить игру</h2><p>вы закончили, ответив на {coins} из 2 вопросов</p>
          <button onClick={() => handleCloseClick()} className={styles.modal_btn_answer}>далее</button></>)}
      </div>
    </>
  )
}
