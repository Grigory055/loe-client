import { Button, Link } from "@mui/material";
import { Link as ReactRouterLink } from "react-router-dom";

export function ExitToMap() {
  return (
    <Link component={ReactRouterLink} to="/"><Button>Выйти на карту уровней</Button></Link>
  )
}
