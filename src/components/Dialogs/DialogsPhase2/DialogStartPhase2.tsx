import React, { useState } from 'react'
import styles from './DialogPhase2.module.css'
import { Button } from '@mui/material'
import { useAppDispatch } from '../../../redux/hooks'
import { switchDialog, switchHeroWalk } from '../../../redux/RPGSlice'
import BubbleP2 from '../../audio/bubbles/BubbleP2'

interface IDialog {
    text: string
  }
  
  const dialogStartPhase2: IDialog = {
    text: 'Вот и 2 Фаза... Как же быстро летит время! Что делать, я думаю ты уже знаешь...'
  }

export function DialogStartPhase2() {

    const [dialog, setDialog] = useState<IDialog>(dialogStartPhase2)
    const dispatch = useAppDispatch();

    const handleCloseClick = () => {
      dispatch(switchHeroWalk(true));
      dispatch(switchDialog(false));
    }
  

  return (
    <>
      <div className={styles.container}>
        <div>
          {dialog.text}
          <BubbleP2/>
        </div>
        <div>
          <Button onClick={() => handleCloseClick()} >Далее</Button>
        </div>
      </div>
    </>
  )
}
