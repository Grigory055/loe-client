import { Button } from '@mui/material'
import styles from './DialogsPhase0.module.css'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { switchDialog, switchHeroWalk } from '../../../redux/RPGSlice'
import { RegForm } from '../../RegForm/RegForm'
import SvetaP01 from '../../audio/sveta/svetap0/svetaP01'
import SvetaP03 from '../../audio/sveta/svetap0/svetaP03'
import SvetaP02 from '../../audio/sveta/svetap0/svetaP02'


interface IDialog {
    person: string
    status: string
    text: string
    // audio: string
  }

export function DialogSvetaPhase0() {
  const isLogin = useAppSelector((store) => store.persistedReducer.isLogin);
  const login = useAppSelector((store) => store.persistedReducer.login);
  // const loginErr = useAppSelector((store) => store.persistedReducer.loginErr)

  const dispatch = useAppDispatch();

  // console.log('loginErr', loginErr, login)

  const handleCloseClick = () => {
    dispatch(switchHeroWalk(true));
    dispatch(switchDialog(false));
  }

  const Sveta: IDialog = {
    person: 'Sveta',
    status: '1',
    text: 'Приветствую тебя, искатель острых ощущений! Меня зовут Света, я тут всем регулирую, сейчас я расскажу тебе, что тут творится!',
    // audio: '../../../../public/audio/SvetaP0dialog1.wav'
  }

  const Sveta2: IDialog = {
    person: 'Sveta',
    status: '2',
    text: 'Расскажи, как тебя зовут?'
  }

  const Sveta3: IDialog = {
    person: 'Sveta',
    status: '3',
    text: `Добро пожаловать, ${login}!
    Тебя ждет захватывающее приключение, но знай, не все дошли до конца!`
  }
  
  const [dialog, setDialog] = useState<IDialog>(Sveta)

    const playAudioHandler = (sound) => {
      const track = new Audio(sound)
     track.playbackRate = 1.3
      track.volume = 0.2
      
      track.play()
    }

    // const d1SvetaHandler = () => {
    //   playAudioHandler(SvetaP0dialog1)
    //   setDialog((pre) => ({...pre, status: '2'}))
    // }

  return (
    <div className={styles.container}>
       {(() => {
        switch (dialog.status) {
          case '1':
            return <div><h4>Света</h4><SvetaP01/><p>{Sveta.text}</p><div>
            <Button onClick={() => setDialog((pre) => ({...pre, status: '2'}))} >Далее</Button></div></div> ;
          case '2':
            return <div>
                {isLogin ? (
                    <>
                    <h3>Света</h3>
                    <SvetaP03/>
                      <p>{Sveta3.text}</p>
                      <Button onClick={() => handleCloseClick()} >Искать приключения</Button>
                    </>
                  ) : (
                    <>
                      <p>{Sveta2.text}</p>
                      <SvetaP02/>
                      <RegForm />
                    </>
                  ) }
              </div>
        }
      })()}
    </div>
  )
}
