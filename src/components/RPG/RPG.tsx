import './style.css'
import { useEffect, useRef } from 'react';
import { resources, Sprite, Vector2, GameLoop, Input, gridCells, GameObject, Hero, DialogBubble, NPC, Camera, Inventory, Rod, events } from "./src";
import { useParams } from 'react-router-dom';
import { phase0objects, phase0walls, phase1objects, phase1walls, phase2objects, phase2walls, phase3objects, phase3walls } from './src/levels/'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { openExit, setWalls, switchDialog } from '../../redux/RPGSlice';
import { Navbar } from '../Navbar/Navbar';
import step from '../audio/steps/step.wav';
import Theme1audio from '../audio/game/Theme1audio';
import Theme2audio from '../audio/game/Theme2audio';
import Theme3audio from '../audio/game/Theme3audio';
import Theme4audio from '../audio/game/Theme4audio';
const walls = [phase0walls, phase1walls, phase2walls, phase3walls]
const gameObjects = [phase0objects, phase1objects, phase2objects, phase3objects];


export function RPG() {
  const { isLogin, character } = useAppSelector((store) => store.persistedReducer);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const levelObjects = gameObjects[Number(id)];
  const canvasRef = useRef();
  const stepRef = useRef();

  useEffect(() => {
    void dispatch(switchDialog(false));

    const stepAudio = stepRef.current;
    const { x, y } = levelObjects.hero.position
    const hero = new Hero(gridCells(x), gridCells(y), 'hero', character, stepAudio);
    
    void dispatch(setWalls(walls[Number(id)]));
      
    const mainScene = new GameObject({
      position: new Vector2(0, 0),
    }, 'mainScene');

    // const waterSprite = new Sprite({
    //   resource: resources.images.water,
    //   frameSize: new Vector2(1056, 832)
    // })
    // mainScene.addChild(waterSprite);

    const groundSprite = new Sprite({
      resource: resources.images[`phase${id}`],
      frameSize: new Vector2(1312, 1152),
    }, 'groundSprite');
    mainScene.addChild(groundSprite);

    const camera = new Camera('camera');
    mainScene.addChild(camera);

    const rod1 = new Rod(gridCells(levelObjects.rod1.x), gridCells(levelObjects.rod1.y), 'rod1', levelObjects.rod1.dialogID)
    mainScene.addChild(rod1);

    const rod2 = new Rod(gridCells(levelObjects.rod2.x), gridCells(levelObjects.rod2.y), 'rod2', levelObjects.rod2.dialogID)
    mainScene.addChild(rod2);

    const rod3 = new Rod(gridCells(levelObjects.rod3.x), gridCells(levelObjects.rod3.y), 'rod3', levelObjects.rod3.dialogID)
    mainScene.addChild(rod3);

    const dialogBubble = new DialogBubble(gridCells(levelObjects.dialogBubble.x), gridCells(levelObjects.dialogBubble.y), 'dialogBubble', levelObjects.dialogBubble.dialogID)
    mainScene.addChild(dialogBubble);

    const npc1 = new NPC(
      gridCells(levelObjects.npc1.x),
      gridCells(levelObjects.npc1.y),
      'npc1',
      levelObjects.npc1.dialogID,
      levelObjects.npc1.exit.x,
      levelObjects.npc1.exit.y,
      levelObjects.npc1.skin)

    mainScene.addChild(npc1);

    const npc2 = new NPC(
      gridCells(levelObjects.npc2.x),
      gridCells(levelObjects.npc2.y),
      'npc2',
      levelObjects.npc2.dialogID,
      levelObjects.npc2.exit.x,
      levelObjects.npc2.exit.y,
      levelObjects.npc2.skin)
      
    mainScene.addChild(npc2);

    mainScene.addChild(hero);

    const inventory = new Inventory('inventory');

    mainScene.input = new Input();

    const update = (delta) => {
      mainScene.stepEntry(delta, mainScene);
    };

    const draw = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        // waterSprite.drawImage(ctx, 0, 0)
        ctx.save();
        ctx.translate(camera.position.x, camera.position.y);
        mainScene.draw(ctx, 0, 0);
        ctx.restore();
        inventory.draw(ctx, 0, 0);
      }
    };

    const gameLoop = new GameLoop(update, draw);

    draw();

    gameLoop.start();

    return () => {    
      gameLoop.stop();
      events.clear();
      hero.resetPosition();
    }
  }, []);

  useEffect(() => {
    const stepAudio = stepRef.current; 

    if (stepAudio) {
      stepAudio.volume = 0.1; // Установка громкости на 20%
      stepAudio.playbackRate = 1.0; // Установка скорости на 100%
      stepAudio.addEventListener('canplay', handleCanPlay);
    }

    function handleCanPlay() {
      stepAudio.removeEventListener('canplay', handleCanPlay);
    }

    return () => {
      if (stepAudio) {
        stepAudio.removeEventListener('canplay', handleCanPlay);
      }
    };
  }, []);

  useEffect(() => {
    if (isLogin && Number(id) === 0) {
      void dispatch(openExit('384,384'));
    }
  },[isLogin])


  return (
    <>
    {(() => {
          switch (id) {
            case "0":
              return (
                <div>
                <Theme1audio/>
                </div>
              );
            case "1":
              return (
                <div>
                <Theme2audio/>
                </div>
              );
            case "2":
              return (
                <div>
                <Theme3audio/>
                </div>
              );
            case "3":
              return (
                <div>
                <Theme4audio/>
                </div>
              );
          }
        })()}
      <canvas
        id="game-canvas"
        ref={canvasRef}
        width={320}
        height={180}
      ></canvas>
      <audio  src={step} ref={stepRef} />
      {/* <Theme1audio/> */}
      <Navbar />
    </>
  );
}
