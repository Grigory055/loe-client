import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../redux/hooks';
import { switchDialog, switchHeroWalk } from '../../../redux/RPGSlice';
import styles from './QuestionsP1.module.css';
import { setScores } from '../../../redux/userSlice';

export function QuestionsP1W3() {
  const[startP1W1,setStartP1W1] = useState<boolean>(false)
  const[coins,setCoins] = useState<number>(0)
  const[nextAnswer,setNextAnswer] = useState<boolean>(false)
  const[end,setEnd] = useState<boolean>(true)
  const question1 = "Как получить все модели User из нашей sequelize?"
  const question2 ="Что такое рефакторинг?"
  const dispatch = useAppDispatch();



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

   const handleCloseClick = () => {
    dispatch(switchHeroWalk(true));
    dispatch(switchDialog(false));
    dispatch(setScores(coins * 100))
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
              <button onClick={secondWrongAnswerHandler} className={styles.modal_btn_answer}>Это взаимодействие между классами</button>
              <button onClick={secondRightAnswerHandler} className={styles.modal_btn_answer}>Это переработка исходного кода программы, чтобы он стал более простым и понятным</button>
              <button onClick={secondWrongAnswerHandler} className={styles.modal_btn_answer}>Это тестирование для проекта</button>
            </div></div>):(<div>
              <h2>{question1}</h2>
              <div className={styles.answers}>
              <button onClick={wrongAnswerHandler} className={styles.modal_btn_answer}>const users = Users.find(where : User)</button>
              <button onClick={wrongAnswerHandler} className={styles.modal_btn_answer}>const users = findAll.Users()</button>
              <button onClick={rightAnswerHandler} className={styles.modal_btn_answer}>const users = await User.findAll()</button>
              </div>
            </div>
            )}</>
          ): (<><p>Е-Е-Е, завершающие вопросы!</p><p>ВСПОТЕЛ? ягодки впереди...</p>
            <p>Жми & отвечай на вопросы.</p><button onClick={startHandler} className={styles.modal_btn}><img className={styles.btn_img} src="/components/start_btn_p.png" alt="start" /></button></>)}
          </div>
          </>):(<><h2>вы можете продолжить игру</h2><p>вы закончили, ответив на {coins} из 2 вопросов</p>
          <button onClick={() => handleCloseClick()} className={styles.modal_btn_answer}>далее</button></>)}
      </div>
    </>
  )
}
