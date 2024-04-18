import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./FlashCardsGame.css";
import GameModal from "./GameModal/GameModal";
import { Button } from "@mui/material";

export function FlashCardsGame({ handlerDialog }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getAllQuestions().then((data) => {
      setQuestions(data);
    });
  }, []);
  async function getAllQuestions() {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/v1/game", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(questions)

  const row1 = questions.slice(0, 4);
  const row2 = questions.slice(4, 8);
  const row3 = questions.slice(12, 16);
  // const row4 = questions.slice(12, 16);
  // const row5 = questions.slice(16, 20);
  // const row6 = questions.slice(20, 24);
  const row7 = [row1, row2, row3];


  const [questionsId, setQuestionsId] = useState(null);
  const [showGameModal, setShowGameModal] = useState(false);

  function getQuestionsIdInGameModal(id) {
    setQuestionsId((pre) => {
      console.log(id)
      return id
    });
    setShowGameModal((pre) => !pre);
  }

  function closeGameModal() {
    setShowGameModal(false);
  }


  const comfirmQuest = JSON.parse(localStorage.getItem("quest")) || [];

  const foultQuest = JSON.parse(localStorage.getItem("questFoult")) || [];

  function resetGame() {
    localStorage.clear();
    // window.location.reload();
    handlerDialog('3')
  }

  console.log(row7);
  return (
    <>
      <Container style={{ width: '1400px'}} className="containerGame">
        {row7.map((row, index) => (
          <Row key={index} className="rowGame">
            <Col className="colGame colTheme">
              <span className="themeText">{row[0]?.["Theme.title"]}</span>
            </Col>

            {comfirmQuest.includes(row[0]?.id) && (
              <Col className="colGame confirmQuest">
                <span className="themeText">{row[0]?.body}</span>
              </Col>
            )}
            {foultQuest.includes(row[0]?.id) && (
              <Col  className="colGame foultQuest">
                <span className="themeText">{row[0]?.body}</span>
              </Col>
            )}
            {!foultQuest.includes(row[0]?.id) &&
              !comfirmQuest.includes(row[0]?.id) && (
                <Col
                  className="colGame colGameHover"
                  onClick={() => getQuestionsIdInGameModal(row[0]?.id)}
                >
                  <span className="themeText">{row[0]?.body}</span>
                </Col>
              )}

            {comfirmQuest.includes(row[1]?.id) && (
              <Col className="colGame confirmQuest">
                <span className="themeText">{row[1]?.body}</span>
              </Col>
            )}
            {foultQuest.includes(row[1]?.id) && (
              <Col className="colGame foultQuest">
                <span className="themeText">{row[1]?.body}</span>
              </Col>
            )}
            {!foultQuest.includes(row[1]?.id) &&
              !comfirmQuest.includes(row[1]?.id) && (
                <Col
                  className="colGame colGameHover"
                  onClick={() => getQuestionsIdInGameModal(row[1]?.id)}
                >
                  <span className="themeText">{row[1]?.body}</span>
                </Col>
              )}

            {comfirmQuest.includes(row[2]?.id) && (
              <Col className="colGame confirmQuest">
                <span className="themeText">{row[2]?.body}</span>
              </Col>
            )}
            {foultQuest.includes(row[2]?.id) && (
              <Col className="colGame foultQuest">
                <span className="themeText">{row[2]?.body}</span>
              </Col>
            )}
            {!foultQuest.includes(row[2]?.id) &&
              !comfirmQuest.includes(row[2]?.id) && (
                <Col
                  className="colGame colGameHover"
                  onClick={() => getQuestionsIdInGameModal(row[2]?.id)}
                >
                  <span className="themeText">{row[2]?.body}</span>
                </Col>
              )}

            {comfirmQuest.includes(row[3]?.id) && (
              <Col className="colGame confirmQuest">
                <span className="themeText">{row[3]?.body}</span>
              </Col>
            )}
            {foultQuest.includes(row[3]?.id) && (
              <Col className="colGame foultQuest">
                <span className="themeText">{row[3]?.body}</span>
              </Col>
            )}
            {!foultQuest.includes(row[3]?.id) &&
              !comfirmQuest.includes(row[3]?.id) && (
                <Col
                  className="colGame colGameHover"
                  onClick={() => getQuestionsIdInGameModal(row[3]?.id)}
                >
                  <span className="themeText">{row[3]?.body}</span>
                </Col>
              )}
              
          </Row>
          
        ))}

        <GameModal questionsId={questionsId} showGameModal={showGameModal} closeGameModal={closeGameModal} />

        <Button style={{ marginTop: '20px'}} className="buttonGame" onClick={() => resetGame()}>
        Далее
      </Button>
      </Container>
      
      
    </>
  );
}
