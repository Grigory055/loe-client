import { Button, Box, Typography } from "@mui/material";
import { useNavigate  } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUserLogout } from "../../redux/thunkActions";
import { setDialog, switchDialog } from "../../redux/RPGSlice";

export function MainMenu() {
  const navigate = useNavigate();
  const isLogin = useAppSelector((store) => store.persistedReducer.isLogin);

  const dispatch = useAppDispatch();

  const toMapHandler = () => {
    void dispatch(switchDialog(false));
    navigate('/');
  }

  const statsHandler = () => {
    void dispatch(setDialog(97));
  }

  const logoutHandler = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (isLogin) {
      void dispatch(switchDialog(false));
      void dispatch(fetchUserLogout());
      navigate('/');
    }
  };
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h4" id="MainMenu_gl" textAlign="center">Главное меню</Typography>
      <Button onClick={toMapHandler}>На карту уровней</Button>
      <Button onClick={statsHandler}>Статистика</Button>
      <Button onClick={logoutHandler}>Выйти из аккаунта</Button>
    </Box>
  )
}
