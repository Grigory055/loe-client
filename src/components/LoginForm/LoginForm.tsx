import { Button, Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { IUser } from "../../types/types";
import { useAppDispatch  } from "../../redux/hooks";
import { fetchUserLogin } from "../../redux/thunkActions";
import { setDialog, switchDialog } from "../../redux/RPGSlice";

export function LoginForm() {
  const [inputs, setInputs] = useState<IUser>({ login: '', password: '' })

  const dispatch = useAppDispatch();

  const inputHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    setInputs((pre) => ({ ...pre, [e.target.name]: e.target.value }))
  }

  const submitHandler = async (e: React.FormEvent): Promise<void> => {
      e.preventDefault()
      if (inputs) {
        void dispatch(fetchUserLogin(inputs));
        setInputs({ login: '', password: '' });
        dispatch(switchDialog(false));
      }
    };
  
  const clickChooseCharacterHandler = () => {
    dispatch(setDialog(99));
  } 

  return (
    <Box display="flex" flexDirection="column" gap={2} width={'600px'} height={'400px'}>
      <Typography variant="h4" id="MainMenu_gl" textAlign="center">Авторизация</Typography>
      <form onSubmit={submitHandler}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField onChange={inputHandler} value={inputs.login} name="login" label="Имя пользователя" type="text" required />
          <TextField onChange={inputHandler} value={inputs.password} name="password" label="Пароль" type="password" required />
          <Button id="btnAvtorization" variant="contained" type="submit" size="large">Войти</Button>
        </Box>
      </form>
      <Typography variant="body1" textAlign="center">Впервые здесь? <span className="link" onClick={clickChooseCharacterHandler}>Назад к выбору персонажа</span></Typography>
    </Box>
  )
}
