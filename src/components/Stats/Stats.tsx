import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { fetchStats } from "../../redux/thunkActions";

export function Stats() {

  const stats = useAppSelector((store) => store.statSlice.stats);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchStats());
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Имя пользователя</TableCell>
            <TableCell align="right">Дата</TableCell>
            <TableCell align="right">Очки</TableCell>
            <TableCell align="right">Уровень</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.map((game) => (
            <TableRow
              key={game.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {game['User.login']}
              </TableCell>
              <TableCell align="right">{new Date(game.createdAt).toLocaleDateString('ru-RU')}</TableCell>
              <TableCell align="right">{game.score}</TableCell>
              <TableCell align="right">{game.level}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
