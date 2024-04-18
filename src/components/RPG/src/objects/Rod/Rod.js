import {GameObject} from "../../GameObject.js";
import {Vector2} from "../../Vector2.js";
import {Sprite} from "../../Sprite.js";
import {resources} from "../../Resource.js";
import {events} from "../../Events.js";
import { store } from "../../../../../redux/store";
import { setDialog, switchDialog, switchHeroWalk } from "../../../../../redux/RPGSlice";

export  class Rod extends GameObject {
  constructor(x, y, name, dialogID) {
    super({
      position: new Vector2(x, y),
    }, name);
    const sprite = new Sprite({
      resource: resources.images.rod,
      position: new Vector2(0, -5),
    });
    this.addChild(sprite);
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
    this.destroy();

    events.emit("HERO_PICKS_UP_ITEM", {
      type: "ROD",
      image: resources.images.rod,
      position: this.position,
    });

    store.dispatch(setDialog(this.dialogID));
    store.dispatch(switchDialog(true));
    store.dispatch(switchHeroWalk(false));
  }
}