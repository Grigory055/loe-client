import {GameObject} from "../../GameObject.js";
import {Vector2} from "../../Vector2.js";
import {Sprite} from "../../Sprite.js";
import {resources} from "../../Resource.js";
import {events} from "../../Events.js";
import { store } from "../../../../../redux/store";
import { setDialog, switchDialog, switchHeroWalk } from "../../../../../redux/RPGSlice";

export class DialogBubble extends GameObject {
  constructor(x, y, name, dialogID) {
    super({
      position: new Vector2(x, y),
    }, name);
    this.body = new Sprite({
      resource: resources.images.dialog,
      frameSize: new Vector2(32, 32),
      hFrames: 3,
      vFrames: 1,
      frame: 2,
      position: new Vector2(-8, -20),
    });
    this.addChild(this.body);
    this.dialogID = dialogID;
  }

  ready() {
    events.on("HERO_POSITION", this, (pos) => {
      const roundedHeroX = Math.round(pos.x);
      const roundedHeroY = Math.round(pos.y);
      if (
        roundedHeroX === this.position.x &&
        roundedHeroY === this.position.y
      ) {
        this.onCollideWithHero();
      }
    });
  }

  onCollideWithHero() {
    store.dispatch(setDialog(this.dialogID));
    store.dispatch(switchDialog(true));
    store.dispatch(switchHeroWalk(false));
  }
}