import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks'
import { setCharacter } from '../../redux/userSlice';
import styles from './ChooseCharacter.module.css'
import { Typography } from '@mui/material';
import { setDialog, switchDialog } from '../../redux/RPGSlice';

export function ChooseCharacter() {

  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const chooseCharacterHandler = (character: string) => {
    dispatch(setCharacter(character));
    navigate('/phase/0');   
  }

  const clickLoginHandler = () => {
    dispatch(setDialog(100));
    dispatch(switchDialog(true));
  } 

  return (
    <div className={styles.container}>
      <h3>Выберите персонажа</h3>
      <div className={styles.characters}>
        <div className={styles.male} onClick={() => chooseCharacterHandler('male')}></div>
        <div className={styles.female} onClick={() => chooseCharacterHandler('female')}></div>
      </div>
      <Typography variant="body1" textAlign="center">Уже есть аккаунт? <span className='link' onClick={clickLoginHandler}>Войти</span></Typography>
    </div>
  )
}
