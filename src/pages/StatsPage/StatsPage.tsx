import { Grid, Typography } from "@mui/material";
import { Stats } from "../../components";

export function StatsPage() {
  return (
    <>
      <Typography variant="h4" id="MainMenu_gl" textAlign="center">Статистика</Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Stats />
        </Grid>
      </Grid>
    </>
      
  )
}
