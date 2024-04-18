import React, { useState } from "react";
import styles from "./DialogPhase2.module.css";
import { Button } from "@mui/material";
import { StartGame } from "../..";
import { useAppDispatch } from '../../../redux/hooks'
import { switchDialog, switchHeroWalk } from '../../../redux/RPGSlice'
import SvetaP21 from "../../audio/sveta/svetap2/SvetaP21";
import SvetaP22 from "../../audio/sveta/svetap2/SvetaP22";

interface IDialog {
  person: string;
  status: string;
  text: string;
}

const Sveta1: IDialog = {
  person: "Sveta",
  status: "1",
  text: "Привет! У нас сейчас показы у предыдущей 2 фазы, протестируешь игру RACERS? Это даст тебе дополнительные очки!",
};

const Sveta2: IDialog = {
  person: "Sveta",
  status: "2",
  text: "Круто! Надеюсь тебе понравилось! Очки начислены!",
};

export function DialogSvetaPhase2() {
  const [dialog, setDialog] = useState<IDialog>(Sveta1);
  const dispatch = useAppDispatch();

  const handleCloseClick = () => {
    dispatch(switchHeroWalk(true));
    dispatch(switchDialog(false));
  }
  
  const handlerDialog = (status: string) => {
    setDialog((pre) => ({ ...pre, status: status }));
    console.log("dialog1", dialog);
  };

  return (
    <>
      <div className={styles.container}>
        {(() => {
          switch (dialog.status) {
            case "1":
              return (
                <div>
                  <h5>Света</h5>
                  <SvetaP21/>
                  <div>{Sveta1.text}</div>
                  <div>
                    <Button
                      className={styles.button}
                      onClick={() => handlerDialog('2')}
                    >
                      Играть
                    </Button>
                  </div>
                </div>
              );
            case "2":
              return (
                <div>
                  <StartGame handlerDialog={handlerDialog}/>
                </div>
              );
            case "3":
              return (
                <div>
                  <SvetaP22/>
                  <div>{Sveta2.text}</div>
                  <div>
                    <Button onClick={() => handleCloseClick()}>Дальше</Button>
                  </div>
                </div>
              );
          }
        })()}
      </div>
    </>
  );
}
