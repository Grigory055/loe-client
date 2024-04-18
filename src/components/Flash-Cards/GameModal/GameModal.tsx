import { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import shuffle from './shuffle';
import './GameModal.css';
import { Button } from '@mui/material';
import { useAppDispatch } from '../redux/hooks';
import { setScores } from '../../../redux/userSlice';

function GameModal({ questionsId, showGameModal, closeGameModal }: any) {
  if (showGameModal) {
    getQuestion(questionsId);
  }

  const dispatch = useAppDispatch()

  async function getQuestion(id) {
    const response = await fetch(
      `http://127.0.0.1:3000/api/v1/game/${questionsId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );
    const data = await response.json();
    return data;
  }

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    getQuestion(questionsId).then((data) => {
      setAnswers(data);
    });
  }, [showGameModal]);

  // const shuffledAnswers = shuffle(answers);
  const userId = localStorage.getItem('userId');

  // async function answerInBase(answerId) {
  //   try {
  //     const response = await fetch(`http://127.0.0.1:3000/api/v1/game/`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       credentials: 'include',
  //       body: JSON.stringify({
  //         id: answerId,
  //         userId: userId,
  //       }),
  //     });
  //     const data = await response.json();

  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  function answerInStorage(answerId, questionsID, answerBool) {
    
    if (answerBool) {
      const answerOK = JSON.parse(localStorage.getItem('answerOK')) || [];
      answerOK.push(answerId);
      localStorage.setItem('answerOK', JSON.stringify(answerOK));

      const quest = JSON.parse(localStorage.getItem('quest')) || [];
      quest.push(questionsID);
      localStorage.setItem('quest', JSON.stringify(quest));
      dispatch(setScores(100))
    } else {
      const questFoult = JSON.parse(localStorage.getItem('questFoult')) || [];
      questFoult.push(questionsID);
      localStorage.setItem('questFoult', JSON.stringify(questFoult));
      dispatch(setScores(-100))
    }

    console.log('fgfgddfgfgddfgdfg', answerBool);

    // const answerB = JSON.parse(localStorage.getItem('answerB')) || [];
    // answerB.push(answerBool);
    // localStorage.setItem( 'answerB', JSON.stringify(answerB) );

    // console.log(answerB)

    closeGameModal();
  }

  console.log('shuffledAnswers', answers);

  return (
    <>
    <div style={{ marginTop: '15px'}}>{answers[0]?.body}</div>
    <div>{answers.map((el: any) => {
            return (
              <Button style={{ margin: '5px' }}
                key={el?.['Answers.id']}
                variant="primary"
                // onClick={() => answerInBase(el?.['Answers.id'])}
                onClick={() =>
                  answerInStorage(
                    el?.['Answers.id'],
                    questionsId,
                    el?.['Answers.is_correct']
                  )
                }
              >
                {el?.['Answers.text']}
              </Button>
            );
          })}</div>
    

      {/* <Modal style={{ color: 'white', backgroundColor: 'white'}} show={showGameModal} backdrop="static" keyboard={false}>
        <Modal.Body className="gameModalBody">{answers[0]?.body}</Modal.Body>
        <Modal.Footer className="gameModalFooter">
          {answers.map((el: any) => {
            return (
              <Button 
                key={el?.['Answers.id']}
                variant="primary"
                // onClick={() => answerInBase(el?.['Answers.id'])}
                onClick={() =>
                  answerInStorage(
                    el?.['Answers.id'],
                    questionsId,
                    el?.['Answers.is_correct']
                  )
                }
              >
                {el?.['Answers.text']}
              </Button>
            );
          })}
        </Modal.Footer>
      </Modal> */}
    </>
  );
}

export default GameModal;
