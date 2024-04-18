import { Dialog } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { DialogAntonPhase0, DialogDenisPhase3, DialogGrishaPhase2, DialogMaksPhase1, DialogStartPhase0, DialogStartPhase1, DialogStartPhase2, DialogStartPhase3, DialogSvetaPhase0, DialogSvetaPhase1, DialogSvetaPhase2, DialogSvetaPhase3, ExitToMap } from "../Dialogs"
import { switchDialog, switchHeroWalk } from "../../redux/RPGSlice";
import { QuestionsP0W1, QuestionsP0W2, QuestionsP0W3, QuestionsP1W1, QuestionsP1W2, QuestionsP1W3, QuestionsP2W1, QuestionsP2W2, QuestionsP2W2_1, QuestionsP3W1, QuestionsP3W1_1, QuestionsP3W1_2 } from "../Questions";
import { ChooseCharacter } from "../ChooseCharacter/ChooseCharacter";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegForm } from "../RegForm/RegForm";
import styles from './Modals.module.css'
import { MainMenu } from "../MainMenu/MainMenu";
import { Stats } from "../Stats/Stats";

export default function Modals(): JSX.Element {
  const open = useAppSelector((state: { RPGSlice: { dialogIsOpen: boolean } }) => state.RPGSlice.dialogIsOpen);
  const dialogID = useAppSelector((state: { RPGSlice: { dialogID: number } }) => state.RPGSlice.dialogID);
  
  const dispatch = useAppDispatch();

  const handleCloseClick = () => {
    dispatch(switchHeroWalk(true));
    dispatch(switchDialog(false));
  }

  const escHandler = (e: React.KeyboardEvent): void => {
    if (e.code === 'Escape' && open) {
      handleCloseClick();
    }
  }

  const modals = [
    { id: 1, component: <DialogSvetaPhase0 /> },
    { id: 2, component: <DialogStartPhase0 /> },
    { id: 3, component: <QuestionsP0W1 /> },
    { id: 4, component: <QuestionsP0W2 /> },
    { id: 5, component: <QuestionsP0W3 /> },
    { id: 6, component: <DialogAntonPhase0 /> },
    { id: 7, component: <DialogStartPhase1 /> },
    { id: 8, component: <QuestionsP1W1 /> },
    { id: 9, component: <QuestionsP1W2 /> },
    { id: 10, component: <QuestionsP1W3 /> },
    { id: 11, component: <DialogMaksPhase1 /> },
    { id: 12, component: <DialogSvetaPhase1 /> },
    { id: 13, component: <DialogStartPhase2 /> },
    { id: 14, component: <QuestionsP2W1 /> },
    { id: 15, component: <DialogSvetaPhase2 /> },
    { id: 16, component: <QuestionsP2W2 /> },
    { id: 17, component: <QuestionsP2W2_1 /> },
    { id: 18, component: <DialogGrishaPhase2 /> },
    { id: 19, component: <DialogStartPhase3 /> },
    { id: 20, component: <QuestionsP3W1 /> },
    { id: 21, component: <QuestionsP3W1_1 /> },
    { id: 22, component: <QuestionsP3W1_2 /> },
    { id: 23, component: <DialogDenisPhase3 /> },
    { id: 24, component: <DialogSvetaPhase3 /> },
    { id: 97, component: <Stats /> },
    { id: 98, component: <MainMenu /> },
    { id: 99, component: <ChooseCharacter /> },
    { id: 100, component: <LoginForm /> },
    { id: 101, component: <RegForm /> },
    // { id:24, component: <DialogSvetaPhase2/> }
  ]

  const component = modals.find((el) => el.id === dialogID)?.component;

  return (
    <Dialog onKeyDown={escHandler} open={open} maxWidth={false}>
      <div className={styles.modal} id="modal">
        <div  id="modal-header" className={`${styles.section} ${styles.modalheader}`}>
          <div className={styles.left}></div>
          <div className={styles.center}></div>
          <div className={styles.right}></div>
        </div>
        <div id="modal-content" className={`${styles.section} ${styles.modalcontent}`}>
          <div className={styles.left}></div>
          <div className={styles.center}>
            <div className={styles.controls}>
              <button onClick={() => handleCloseClick()} className={styles.close} />
            </div>
            {component ? component : <ExitToMap />}
          </div>
          <div className={styles.right}></div>
        </div>
        <div id="modal-footer" className={`${styles.section} ${styles.modalfooter}`}>
          <div className={styles.left}></div>
          <div className={styles.center}></div>
          <div className={styles.right}></div>
        </div>
      </div>
    </Dialog>
  );
}
