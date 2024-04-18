import { Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setDialog, switchDialog } from "../../redux/RPGSlice";


export function Navbar() {
  const { isLogin, login, score, level } = useAppSelector((store) => store.persistedReducer);
  const dispatch = useAppDispatch();

  const menuHandler = () => {
    dispatch(setDialog(98));
    dispatch(switchDialog(true));
  };
  return (
    <Box id="navbar">
      <div className="navbar-left"></div>
      <div className="navbar-center">
        <Typography sx={{ fontSize: '19px'}} lineHeight={2.5}>{isLogin ? login : 'Гость'}</Typography>
        {isLogin && (
          <>
            <Typography sx={{ fontSize: '19px'}} lineHeight={2.5}>Очки: <span className="navbar-stats">{score}</span></Typography>
            <Typography sx={{ fontSize: '19px'}} lineHeight={2.5}>Уровень: <span className="navbar-stats">{level}</span></Typography>
          </>
          )}
        <Typography sx={{ fontSize: '19px'}} className="menu" onClick={menuHandler} lineHeight={2.5}>Меню</Typography>
      </div>
      <div className="navbar-right"></div>
    </Box>
  )
}
