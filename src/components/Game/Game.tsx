import {Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Grid, TextField, Typography, } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Link as ReactRouterLink } from 'react-router-dom';
import { fetchTopics } from '../../redux/thunkActions';
import './Game.css';
import axios from 'axios';
import { setScores } from '../../redux/userSlice';
import StepGrass from '../audio/steps/StepGrass';

export function Game({ handlerDialog }) {
  const [open, setOpen] = React.useState(false);
  const [card, setCard] = React.useState({});
  const [input, setInput] = React.useState<string>('');
  const [score, setScore] = React.useState<number>(0);
  const [cards, setCards] = React.useState([]);
  const [time, setTimer] = React.useState(3);

  const dispatch = useAppDispatch()

  useEffect((): void => {
    (async function (): Promise<void> {
      try {
        setTimer(1000)
        const response = await axios.get('http://localhost:3000/api/topics');
        console.log('2024reesponse!', response.data)
        setCards(() => response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleClickOpen = (id) => {
    setInput('')
    setTimer(15)
    const currentCard = cards.find((el) => el.id === id);
    setCard(currentCard);
    if (currentCard.condition === '') {
      setOpen(true); 
    } if (currentCard.condition !== '') {
      setCard({})
    }
  };

  const handleClose = () => {
    setTimer(0)
    // console.log(card)
    // setScore((pre) => score - card.value);
    setScore((pre) => {
      if ((score - card.value) < 0) {
        setScore(0)
      } else {
        setScore((pre) => score - card.value)
      }
    });
    card.condition = '2';
    setOpen(false);
    // setCard({});
  };

  const handleCloseClick = (id) => {
    // const currentCard = cards.find((el) => el.id === id);
    // // setCard(currentCard);
    // setScore((pre) => {
    //   if ((score - card.value) < 0) {
    //     setScore(0)
    //   } else {
    //     setScore((pre) => score - card.value)
    //   }
    // });
    setScore((pre) => score - card.value);
    // console.log(id)
    setOpen(false);
    setCard({})
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (time === 0) {
      handleClose();
    }
  }, [time]);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(() => e.target.value);
  };

  const submitHandler = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    handleClose();
    // console.log(input, card.answer)
    

    if (input.toLowerCase() === card.answer.toLowerCase()) {
      setScore((pre) => {
        if ((score - card.value) < 0) {
          setScore((pre) => score + card.value);
        } else {
          setScore((pre) => score + card.value)
        }
      });
      // setScore((pre) => score + card.value);
      card.condition = '1';
      setTimer(1800);
      console.log(score)
    } else {
       setScore((pre) => {
      if ((score - card.value) < 0) {
        setScore(0)
      } else {
        setScore((pre) => score - card.value)
      }
    });
      card.condition = '2';
      setTimer(1800);
    } 
  };

  const exitGameHandler = () => {
    dispatch(setScores(score))
    handlerDialog('3')
    console.log('score', score)
  }

  return (
    <>
    <div className='svoya_igra_container'>
      
        <div style={{ fontSize: '45px', marginBottom: '30px' }}>Ваш счет: {score}</div>
        
      <div>
        <div style={{ display: 'flex' }}>
          <div style={{ margin: 'auto', width: '120px', fontSize: '20px' }}>JS</div>
        {cards &&
          cards.filter((el) => el.topic_id === 1).map((el) => (
              <div style={{ margin: '10px', fontSize: '15px' }}>
                <div onClick={() => handleClickOpen(el.id)}>
                  <div style={{ border: '1px solid', padding: '4px', borderRadius: '8px' }} className={el.condition === '1' ? 'oo' : el.condition === '2' ? 'aa' : el.condition === '' && 'pp'}>{el.value}</div>
                </div>
              </div>
            ))}
            </div>
            <div style={{ display: 'flex' }}>
            <div style={{ margin: 'auto', width: '120px', fontSize: '20px' }}>CSS</div>
              
        {cards &&
          cards
            .filter((el) => el.topic_id === 2)
            .map((el) => (
              <div style={{ margin: '10px', fontSize: '15px' }}>
              <div onClick={() => handleClickOpen(el.id)}>
             
              <div style={{ border: '1px solid', padding: '4px', borderRadius: '8px' }} className={el.condition === '1' ? 'oo' : el.condition === '2' ? 'aa' : el.condition === '' && 'pp'}>{el.value}</div>
             
              </div>
              </div>
            ))}
            </div>
            <div style={{ display: 'flex' }}>
            <div style={{ margin: 'auto', width: '120px', fontSize: '20px' }}>HTML</div>
        {cards &&
          cards
            .filter((el) => el.topic_id === 3)
            .map((el) => (
              <div style={{ margin: '10px', fontSize: '15px' }}>
              <div onClick={() => handleClickOpen(el.id)}>
             
              <div style={{ border: '1px solid', padding: '4px', borderRadius: '8px' }} className={el.condition === '1' ? 'oo' : el.condition === '2' ? 'aa' : el.condition === '' && 'pp'}>{el.value}</div>
             
              </div>
              </div>
              // <Grid id={el.id} key={el.id} item xs={1}>
              //   <Card onClick={() => handleClickOpen(el.id)}>
                  // <CardContent
                  //   className={
                  //     el.condition === '1'
                  //       ? 'oo'
                  //       : el.condition === '2'
                  //       ? 'aa'
                  //       : el.condition === '' && 'pp'
                  //   }
                  // >
                  //   {el.value}
                  // </CardContent>
              //   </Card>
              // </Grid>
            ))}
            </div>
            <div style={{ display: 'flex' }}>
            <div style={{ margin: 'auto',  width: '120px', fontSize: '20px' }}>React</div>
        {cards &&
          cards
            .filter((el) => el.topic_id === 4)
            .map((el) => (
              <div style={{ margin: '10px', fontSize: '15px' }}>
              <div onClick={() => handleClickOpen(el.id)}>
             
              <div style={{ border: '1px solid', padding: '4px', borderRadius: '8px' }} className={el.condition === '1' ? 'oo' : el.condition === '2' ? 'aa' : el.condition === '' && 'pp'}>{el.value}</div>
             
              </div>
              </div>
            ))}
            </div>
            <div style={{ display: 'flex' }}>
            <div style={{ margin: 'auto', width: '120px', fontSize: '20px' }}>Express</div>
        {cards &&
          cards
            .filter((el) => el.topic_id === 5)
            .map((el) => (
              <div style={{ margin: '10px', fontSize: '15px' }}>
              <div onClick={() => handleClickOpen(el.id)}>
             
              <div style={{ border: '1px solid', padding: '4px', borderRadius: '8px' }} className={el.condition === '1' ? 'oo' : el.condition === '2' ? 'aa' : el.condition === '' && 'pp'}>{el.value}</div>
             
              </div>
              </div>
            ))}
            </div>
            <div style={{ display: 'flex' }}>
            <div style={{ margin: 'auto', width: '120px', fontSize: '20px' }}>GIT</div>
        {cards &&
          cards
            .filter((el) => el.topic_id === 6)
            .map((el) => (
              <div style={{ margin: '10px', fontSize: '15px' }}>
              <div onClick={() => handleClickOpen(el.id)}>
             
              <div style={{ border: '1px solid', padding: '4px', borderRadius: '8px' }} className={el.condition === '1' ? 'oo' : el.condition === '2' ? 'aa' : el.condition === '' && 'pp'}>{el.value}</div>
             
              </div>
              </div>
            ))}
            </div>
          </div>

      <Box mt={5}>
        <Button
          // variant="contained"
          // component={ReactRouterLink}
          // onClick={() => handlerDialog('3')}
          onClick={() => exitGameHandler()}
          // to={() => exitGameHandler()}
          // to="/menu"
          id="playBtn"
          size="large"
        >
          Завершить игру
        </Button>
      </Box>

      <Dialog 
        open={open}
        // onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: submitHandler,
        }}
        disableRestoreFocus
      >
        <DialogTitle  textAlign="center">
          {card.image && (
            <Box maxWidth={'500px'}>
              <img width={'100%'} src={card.image} alt="Image" />
            </Box>
          )}
        </DialogTitle>
        <DialogContent sx={{
            backgroundColor: 'white',
            width: 500,
            color: 'black',
            borderRadius: '12px', 
            padding: '24px'
          }}>
          <DialogContentText  sx={{
            color: 'black', 
            padding: '14px'
          }}>{card.questions}</DialogContentText>
          {/* <input type="text" /> */}
          <TextField 
          // sx={{
          //   backgroundColor: 'yellow',
          //   width: 300,
          //   color: 'red',
          // }}
            onChange={inputHandler}
            autoFocus
            required
            margin="dense"
            id="answer"
            name="answer"
            label="Ваш ответ"
            type="text"
            fullWidth
            variant="standard"
            value={input}
          />
          {time}
        </DialogContent>
        <DialogActions  sx={{
            // backgroundColor: 'white',
            // width: 500,
            color: 'black',
            borderRadius: '12px', 
            padding: '24px'
          }}>
          {/* <Button onClick={() => handleCloseClick(card.id)}>Закрыть</Button> */}
          <Button type="submit">Отправить</Button>
        </DialogActions>
      </Dialog>
      </div>
    </>
  );
}
