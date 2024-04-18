import { useState } from 'react'
import styles from './DialogPhase2.module.css'
import { FlashCardsGame } from '../../Flash-Cards/FlashCardsGame'
import { Button } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { useNavigate } from 'react-router-dom'
import { switchDialog, switchHeroWalk } from '../../../redux/RPGSlice'
import { fetchUserScore } from '../../../redux/thunkActions'
import GrishaP21 from '../../audio/prepods/grishaP2/GrishaP21'
import GrishaP23 from '../../audio/prepods/grishaP2/GrishaP23'

interface IDialog {
    person: string
    status: string
    text: string
  }

  const Grisha1: IDialog = {
    person: 'Grisha',
    status: '1',
    text: 'Ну здарова! Я местный колдун, маг, ведьмак и вообще, че пристал ко мне? Ты не пройдёшь!! Хотя, все таки ты и мой ученик, если не пройдешь, тогда и мне прилетит.',
  }

  const Grisha2: IDialog = {
    person: 'Grisha',
    status: '2',
    text: 'Как видишь, вот и пронеслась вторая фаза, осталось только ответить на вопросы в игре Флеш-карты!',
  }

  const Grisha3: IDialog = {
    person: 'Grisha',
    status: '3',
    text: 'Поздравляю с окончанием предпоследней фазы! Ты большой молодец! Пока и хорошего вечера, кожанный мешок без маны!',
  }

export function DialogGrishaPhase2() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [dialog, setDialog] = useState<IDialog>(Grisha1)
  const score = useAppSelector((store) => store.persistedReducer.score)

  const handlerDialog = (status: string) => {
    setDialog((pre) => ({...pre, status: status}))
    console.log('dialog1', dialog)
  }

  // const handlerDialog1 = (status: string) => {
  //   setDialog(() => ({ status: status }))
  //   console.log('dialog1', dialog)
  // }

  const handleCloseClick = () => {
    void dispatch(fetchUserScore({ score, level: 3}));
    void dispatch(switchHeroWalk(true));
    void dispatch(switchDialog(false));
    navigate('/');
  }

  return (
    <>
    <div className={styles.container}>
       {(() => {
        switch (dialog.status) {
          case '1':
            return <div><h5>Не Федор, а Гриша</h5><GrishaP21/><p>{Grisha1.text}</p><div>
            <Button className={styles.button} onClick={() => handlerDialog('2')} >Играть</Button></div></div> ;
          case '2':
            return <div><FlashCardsGame handlerDialog={handlerDialog} /></div>
          case '3':
            return <div>
              <GrishaP23/>
              <p>{Grisha3.text}</p>
                <div>
                <Button onClick={handleCloseClick}>К следующей фазе!</Button>
                </div>
              </div>
        }
      })()}
    </div>
    </>
  )
}
