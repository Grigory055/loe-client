import { useState } from 'react'
import styles from './DialogsPhase0.module.css'
import { Button } from '@mui/material'
import { useAppDispatch } from '../../../redux/hooks'
import { switchDialog, switchHeroWalk } from '../../../redux/RPGSlice'
import BubbleP0 from '../../audio/bubbles/BubbleP0'

interface IDialog {
    text: string
  }
  
  const dialogStartPhase0: IDialog = {
    text: 'Итак, приступим! Твоя задача: нужно найти три таблички и ответить на вопросы, которые на ней написаны'
  }

export function DialogStartPhase0() {
  
  const dispatch = useAppDispatch();

  const handleCloseClick = () => {
    dispatch(switchHeroWalk(true));
    dispatch(switchDialog(false));
  }

    const [dialog, setDialog] = useState<IDialog>(dialogStartPhase0)

  return (
    <>
      <div className={styles.container}>
        <div>
          <BubbleP0/>
          {dialog.text}
        </div>
        <div>
        <Button onClick={() => handleCloseClick()} >Далее</Button>
        </div>
      </div>
    </>
  )
}
