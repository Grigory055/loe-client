import { useState } from "react";
import Gladiator from "../../Gladiator/Gladiator";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { switchDialog, switchHeroWalk } from '../../../redux/RPGSlice';
import AntonP01 from "../../audio/prepods/antonP0/Anton1";
import AntonP02 from "../../audio/prepods/antonP0/Anton2";
import AntonP03 from "../../audio/prepods/antonP0/Anton3";
import AntonP04 from "../../audio/prepods/antonP0/Anton4";
import { fetchUserScore } from "../../../redux/thunkActions";

interface IDialog {
  person: string;
  status: string;
  text: string;
}

const Anton: IDialog = {
  person: "Anton",
  status: "1",
  text: "Привет! Я - Антон. Зацени мои наушники!",
};

const Anton2: IDialog = {
  person: "Anton",
  status: "2",
  text: "Вот уж не ожидал! Ты прошел 0 фазу! Теперь ты умеешь красить кнопки!",
};

const Anton3: IDialog = {
  person: "Anton",
  status: "3",
  text: "Спасибо, что собрал для меня все БРЮЛИКИ, и помог мне с вопросами, благодаря тебе мы можем сыграть в игру Гладиаторы!",
};

const Anton4: IDialog = {
  person: "Anton",
  status: "4",
  text: "Ты можешь научиться делать такую же! для этого тебе нужно пройти Фазу 1 Научишься так же, даже Больше!",
};

export function DialogAntonPhase0() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { score } = useAppSelector((store) => store.persistedReducer)

  const handleCloseClick = () => {
    void dispatch(fetchUserScore({ score, level: 1 }));
    void dispatch(switchHeroWalk(true));
    void dispatch(switchDialog(false));
    navigate('/');
  }

  const [dialog, setDialog] = useState<IDialog>(Anton)
  
  const handlerDialog = (status: string) => {
      setDialog((pre) => ({...pre, status}))
  }

  return (
    <>
      <div>
        {(() => {
          switch (dialog.status) {
            case "1":
              return (
                <div style={{ width: "400px" }}>
                  <AntonP01/>
                  <p>{Anton.text}</p>
                  <Button onClick={() => handlerDialog("2")}>Далее</Button>
                </div>
              );
            case "2":
              return (
                <div style={{ width: "400px" }}>
                  <h3>Антон</h3>
                  <AntonP02/>
                  <p>{Anton2.text}</p>
                  <Button onClick={() => handlerDialog("3")}>Далее</Button>
                </div>
              );
            case "3":
              return (
                <div style={{ width: "400px" }}>
                  <h3>Антон</h3>
                  <AntonP03/>
                  <p>{Anton3.text}</p>
                  <Button onClick={() => handlerDialog("4")}>
                    Играть в гладиаторы
                  </Button>
                </div>
              );
              case "4":
              return (
                <>
                  <Gladiator />
                  <Button onClick={() => handlerDialog("5")}>Далее</Button>
                </>
              );
            case "5":
              return (
                <div style={{ width: "400px" }}>
                  <AntonP04/>
                  {Anton4.text}
                  <Button onClick={handleCloseClick}>К следующей фазе!</Button>
                </div>
              );
          }
        })()}
      </div>
    </>
  );
}
