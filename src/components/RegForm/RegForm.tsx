import { Button, Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { IUser } from "../../types/types";
import { useAppDispatch, useAppSelector  } from "../../redux/hooks";
import { fetchUserLogin, fetchUserRegister } from "../../redux/thunkActions";

export function RegForm() {
  const [ registered, setRegistered ] = useState(false);
  const [inputs, setInputs] = useState<IUser>({ login: '', password: '', email: '' })
  const character = useAppSelector((store) => store.persistedReducer.character)

  const dispatch = useAppDispatch();

  const inputHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    setInputs((pre) => ({ ...pre, [e.target.name]: e.target.value }))
  }

  const submitHandler = async (e: React.FormEvent): Promise<void> => {
      e.preventDefault()
      if (inputs && registered) {
        void dispatch(fetchUserLogin(inputs));
        setInputs({ login: '', password: '' });
      } else if (inputs && !registered) {
        void dispatch(fetchUserRegister({...inputs, character }));
        setInputs({ login: '', password: '', email: '' });
      }
    };
  
  const clickRegisterHandler = () => {
    setRegistered(false);   
  } 

  const clickLoginHandler = () => {
    setRegistered(true);
  } 

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      { registered ? 
      (
        <>
          <Typography variant="h4" id="MainMenu_gl" textAlign="center">Авторизация</Typography>
          <form onSubmit={submitHandler}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField onChange={inputHandler} value={inputs.login} name="login" label="Имя пользователя" type="text" required />
              <TextField onChange={inputHandler} value={inputs.password} name="password" label="Пароль" type="password" required />
              <Button id="btnAvtorization" variant="contained" type="submit" size="large">Войти</Button>
            </Box>
          </form>
          <Typography variant="body1" textAlign="center">Впервые здесь? <span className="link" onClick={clickRegisterHandler}>Зарегистрироваться</span></Typography>
        </>
      ) : 
      (
        <>
          <Typography variant="h4" id="MainMenu_gl" textAlign="center">Регистрация</Typography>
          <form onSubmit={submitHandler}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField onChange={inputHandler} value={inputs.login}  name="login" label="Имя пользователя" type="text" required />
            <TextField onChange={inputHandler} value={inputs.email}  name="email" label="Электронная почта" type="email" required />
            <TextField onChange={inputHandler} value={inputs.password}  name="password" label="Пароль" type="password" required />
            <Button variant="contained" type="submit" id="btnAvtorization" size="large">Зарегистрироваться</Button>
          </Box>
          </form>
          <Typography variant="body1" textAlign="center">Уже есть аккаунт? <span className="link" onClick={clickLoginHandler}>Войти</span></Typography>
        </>
      )}
    </Box>
  )
}
