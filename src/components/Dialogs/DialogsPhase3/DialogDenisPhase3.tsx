import { useEffect, useState } from "react";
import styles from "./DialogPhase3.module.css";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchUserScore } from "../../../redux/thunkActions";
import DenisP31 from "../../audio/prepods/denisP3/DenisP31";
import DenisP32 from "../../audio/prepods/denisP3/DenisP32";
import { useNavigate } from "react-router-dom";
import { switchDialog } from "../../../redux/RPGSlice";




interface IDialog {
  person: string;
  status: string;
  text: string;
}

const Denis1: IDialog = {
  person: "Denis",
  status: "1",
  text: "Вот и подошло к концу Обучение в Эльбрусе, жаль не успели поехать на Курагу в Москву!",
};

// const Denis2: IDialog = {
//   person: "Denis",
//   status: "2",
//   text: "Давай просто преисполнимся и насладимся Своей игрой...",
// };

export function DialogDenisPhase3() {
  const dispatch = useAppDispatch();
  const [dialog, setDialog] = useState<IDialog>(Denis1);
  const navigate = useNavigate();
  const score = useAppSelector((store) => store.persistedReducer.score)

  useEffect(() => {
    void dispatch(fetchUserScore({ score, level: 3 }));
  },[])

  const handlerDialog = (status: string) => {
    setDialog((pre) => ({ ...pre, status: status }));
  };

  const endGameHandler=()=>{
    dispatch(switchDialog(false));
    navigate('/end')
    setTimeout(() => {
      navigate('/')
    }, 109000);
  }

  return (
    <>
      <div className={styles.container}>
        {(() => {
          switch (dialog.status) {
            case "1":
              return (
                <div>
                  <h4>Денис</h4>
                  <DenisP31/>
                  <div>{Denis1.text}</div>
                  <div>
                    <Button style={{ width: '250px', marginTop: '15px'}} onClick={() => endGameHandler()} >Давай преисполнимся</Button>
                  </div>
                </div>
              );
            // case "2":
            //   return (
            //     <div>
            //       <DenisP32/>
            //       <div>{Denis2.text}</div>
            //       <div>
            //         <Button onClick={()=>endGameHandler()}>Конец</Button>
                    
            //       </div>
            //     </div>
            //   );
          }
        })()}
      </div>
    </>
  );
}
