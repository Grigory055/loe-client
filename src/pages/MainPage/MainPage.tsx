import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setDialog, switchDialog } from "../../redux/RPGSlice";

export function MainPage() {

  const { isLogin, level } = useAppSelector((store) => store.persistedReducer);
  const dialogIsOpen = useAppSelector((state: { RPGSlice: { dialogIsOpen: boolean } }) => state.RPGSlice.dialogIsOpen)
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const clickPhaseHandler = (id: number) => {
    if (isLogin) {
      navigate(`/phase/${id}`)
    } else {
      if (id === 0) {
        dispatch(setDialog(99));
        dispatch(switchDialog(true));
      }
    }
  }

  return (
    <div id="main-page">
      <div id="game-title">
        <img src="/game-title.png" alt="Lord of Elbrus" />
      </div>
      <div id="map-inactive">
        <div id="map">
          <div className="level" id="second-level">
            <div onClick={() => clickPhaseHandler(3)} className={ level > 2 ? 'phase active' : 'phase' } id="phase-3"></div>
            <div onClick={() => clickPhaseHandler(2)} className={ level > 1 ? 'phase active' : 'phase' } id="phase-2"></div>
          </div>
          <div className="level" id="first-level">
            <div onClick={() => clickPhaseHandler(0)} className="phase active" id="phase-0"></div>
            <div onClick={() => clickPhaseHandler(1)} className={ level > 0 ? 'phase active' : 'phase' } id="phase-1"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
