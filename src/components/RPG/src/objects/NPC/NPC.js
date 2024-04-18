import {GameObject} from "../../GameObject.js";
import {Vector2} from "../../Vector2.js";
import {Sprite} from "../../Sprite.js";
import {resources} from "../../Resource.js";
import {events} from "../../Events.js";
import { store } from "../../../../../redux/store";
import { openExit, setDialog, switchDialog, switchHeroWalk } from "../../../../../redux/RPGSlice";

export class NPC extends GameObject {
  constructor(x, y, name, dialogID, exitCoordX, exitCoordY, skin) {
    super({
      position: new Vector2(x, y),
    }, name);

    const shadow = new Sprite({
      resource: resources.images.shadow,
      frameSize: new Vector2(32, 32),
      position: new Vector2(-8, -19),
    });
    this.addChild(shadow);

    this.body = new Sprite({
      resource: resources.images.npc,
      frameSize: new Vector2(32, 32),
      hFrames: 2,
      vFrames: 5,
      frame: skin,
      position: new Vector2(-8, -19),
    });
    this.addChild(this.body);
    this.dialogID = dialogID;
    this.exitCoords = { exitCoordX, exitCoordY };
  }

  ready() {
    events.on("HERO_POSITION", this, (pos) => {
      const roundedHeroX = Math.round(pos.x);
      const roundedHeroY = Math.round(pos.y);
      if (
        (roundedHeroX === this.position.x - 16 &&
          roundedHeroY === this.position.y) ||
        (roundedHeroX === this.position.x + 16 &&
          roundedHeroY === this.position.y) ||
        (roundedHeroX === this.position.x &&
          roundedHeroY === this.position.y + 16)
      ) {
        this.onCollideWithHero();
      }
    });
  }

  onCollideWithHero() {
    store.dispatch(switchHeroWalk(false));
    store.dispatch(setDialog(this.dialogID));
    store.dispatch(switchDialog(true));
    // store.dispatch(openExit(`${this.exitCoords.exitCoordX},${this.exitCoords.exitCoordY}`))
  }
}