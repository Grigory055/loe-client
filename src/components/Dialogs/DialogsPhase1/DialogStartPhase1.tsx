import React, { useState } from 'react'
import styles from './DialogsPhase1.module.css'
import { Button } from '@mui/material'
import { useAppDispatch } from '../../../redux/hooks'
import { switchDialog, switchHeroWalk } from '../../../redux/RPGSlice'
import BubbleP1 from '../../audio/bubbles/BubbleP1'

interface IDialog {
  text: string
}

const dialogStartPhase1: IDialog = {
  text: 'Добро пожаловать на первую фазу! Всё так же, собирай брюлики и отвечай на вопросы с табличек! Не приближайся к Максимусу без завершенных заданий. Он будет ждать когда ты доделаешь!'
}

export function DialogStartPhase1() {

  const dispatch = useAppDispatch();

  const handleCloseClick = () => {
    dispatch(switchHeroWalk(true));
    dispatch(switchDialog(false));
    console.log('score', score)
  }


  const [dialog, setDialog] = useState<IDialog>(dialogStartPhase1)

  return (
    <>
      <div className={styles.container}>
        <div>
          <BubbleP1/>
          {dialog.text}
        </div>
        <div>
          <Button onClick={() => handleCloseClick()} >Далее</Button>
        </div>
      </div>
    </>
  )
}
