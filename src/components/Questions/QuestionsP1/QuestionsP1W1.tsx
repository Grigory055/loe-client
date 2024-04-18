import React, { useEffect, useState } from 'react'
import styles from './QuestionsP1.module.css';
import { useAppDispatch } from '../../../redux/hooks';
import { switchDialog, switchHeroWalk } from '../../../redux/RPGSlice';
import { setScores } from '../../../redux/userSlice';

export function QuestionsP1W1() {
  const[startP1W1,setStartP1W1] = useState<boolean>(false)
  const[coins,setCoins] = useState<number>(0)
  const[nextAnswer,setNextAnswer] = useState<boolean>(false)
  const[end,setEnd] = useState<boolean>(true)
  const question1 = "Как создать коммит?"
  const question2 ="Что такое бинарный поиск?"

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
              <button onClick={secondWrongAnswerHandler} className={styles.modal_btn_answer}>Погуглить</button>
              <button onClick={secondWrongAnswerHandler} className={styles.modal_btn_answer}>Написать в хелпу </button>
              <button onClick={secondRightAnswerHandler} className={styles.modal_btn_answer}>Тип поискового алгоритма, который последовательно делит пополам заранее отсортированный массив данных, чтобы обнаружить нужный элемент. </button>
            </div></div>):(<div>
              <h2>{question1}</h2>
              <div className={styles.answers}>
              <button onClick={wrongAnswerHandler} className={styles.modal_btn_answer}>git pull 'any commit'</button>
              <button onClick={rightAnswerHandler} className={styles.modal_btn_answer}>git commit -m 'any commit'</button>
              <button onClick={wrongAnswerHandler} className={styles.modal_btn_answer}>git add commit -f 'any commit'</button>
              </div>
            </div>
            )}</>
          ): (<><p>Опять вопросы про Гит?</p>
            <p>Попробую его взломать!</p><button onClick={startHandler} className={styles.modal_btn}><img className={styles.btn_img} src="/components/start_btn_p.png" alt="start" /></button></>)}
          </div>
          </>):(<><h2>вы можете продолжить игру</h2><p>вы закончили, ответив на {coins} из 2 вопросов</p>
          <button onClick={() => handleCloseClick()} className={styles.modal_btn_answer}>далее</button></>)}
      </div>
    </>
  )
}
