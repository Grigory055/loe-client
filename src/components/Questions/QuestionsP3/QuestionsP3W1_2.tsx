import React, { useEffect, useState } from 'react'
import styles from './QuestionsP3.module.css';
import { useAppDispatch } from '../../../redux/hooks'
import { switchDialog, switchHeroWalk } from '../../../redux/RPGSlice'
import { setScores } from '../../../redux/userSlice';

export function QuestionsP3W1_2() {
  const[startP1W1,setStartP1W1] = useState<boolean>(false)
  const[coins,setCoins] = useState<number>(0)
  const[nextAnswer,setNextAnswer] = useState<boolean>(false)
  const[end,setEnd] = useState<boolean>(true)
  const question1 = "Зачем нужен Redux Thunk?"
  const question2 ="что такое компоненты в React?"
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
              <button onClick={secondWrongAnswerHandler} className={styles.modal_btn_answer}>1. document.title.</button>
              <button onClick={secondRightAnswerHandler} className={styles.modal_btn_answer}>2. Отображение определенной части интерфейса.</button>
              <button onClick={secondWrongAnswerHandler} className={styles.modal_btn_answer}>3. Отображение кода в консоли.</button>
            </div></div>):(<div>
              <h2>{question1}</h2>
              <div className={styles.answers}>
              <button onClick={wrongAnswerHandler} className={styles.modal_btn_answer}>1. Middleware позволяющая добавлять состояние приложения в Redux в парасинхронном режиме</button>

              <button onClick={rightAnswerHandler} className={styles.modal_btn_answer}>2. Middleware позволяющая изменять состояние приложения в Redux в асинхронном режиме</button>
       
              <button onClick={wrongAnswerHandler} className={styles.modal_btn_answer}>3. Middleware позволяющая удалять состояние приложения в Redux в синхронном режиме</button>
              </div>
            </div>
            )}</>
          ): (<><p>Уже вот-вот конец!</p><p>совсем большие стали!</p><p>Вы будете вспоминать это время с ностальгией.</p>
            <button onClick={startHandler} className={styles.modal_btn}><img className={styles.btn_img} src="/components/green_btn_new.png" alt="start" /></button></>)}
          </div>
          </>):(<><h2>вы можете продолжить игру</h2><p>вы закончили, ответив на {coins} из 2 вопросов</p>
          <button onClick={() => handleCloseClick()} className={styles.modal_btn_answer}>далее</button></>)}
      </div>
    </>
  )
}