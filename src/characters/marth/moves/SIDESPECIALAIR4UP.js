import marth from "./index";
import {player} from "../../../main/main";
import {turnOffHitboxes} from "../../../physics/actionStateShortcuts";
import {sounds} from "../../../main/sfx";
import {drawVfx} from "../../../main/vfx/drawVfx";
import {Vec2D} from "../../../main/util/Vec2D";
import {dancingBladeAirMobility} from "../dancingBladeAirMobility";
import WAIT from "../../shared/moves/WAIT";
import FALL from "../../shared/moves/FALL";
export default {
  name: "SIDESPECIALAIR4UP",
  canPassThrough: false,
  canEdgeCancel: false,
  canGrabLedge: [false, false],
  wallJumpAble: false,
  headBonk: false,
  canBeGrabbed: true,
  landType: 1,
  init: function (p, input) {
    player[p].actionState = "SIDESPECIALAIR4UP";
    player[p].timer = 0;
    turnOffHitboxes(p);
    player[p].hitboxes.id[0] = player[p].charHitboxes.dbair4up.id0;
    player[p].hitboxes.id[1] = player[p].charHitboxes.dbair4up.id1;
    player[p].hitboxes.id[2] = player[p].charHitboxes.dbair4up.id2;
    player[p].hitboxes.id[3] = player[p].charHitboxes.dbair4up.id3;
    sounds.shout4.play();
    marth.SIDESPECIALAIR4UP.main(p, input);
  },
  main: function (p, input) {
    player[p].timer++;
    if (!marth.SIDESPECIALAIR4UP.interrupt(p, input)) {
      if (player[p].timer > 17 && player[p].timer < 27) {
        drawVfx("swing", new Vec2D(0, 0), player[p].phys.face, {
          pNum: p,
          swingType: "SIDESPECIALAIR4UP",
          frame: player[p].timer - 18
        });
      }
      dancingBladeAirMobility(p, input);
      player[p].phys.cVel.x = 0;
      if (player[p].timer === 20) {
        player[p].hitboxes.active = [true, true, true, true];
        player[p].hitboxes.frame = 0;
        sounds.dancingBlade.play();
      }
      if (player[p].timer > 20 && player[p].timer < 26) {
        player[p].hitboxes.frame++;
      }
      if (player[p].timer === 26) {
        turnOffHitboxes(p);
      }
    }
  },
  interrupt: function (p, input) {
    if (player[p].timer > 50) {
      if (player[p].phys.grounded) {
        WAIT.init(p, input);
      }
      else {
        FALL.init(p, input);
      }
      return true;
    }
    else {
      return false;
    }
  },
  land: function (p, input) {
    player[p].actionState = "SIDESPECIALGROUND4UP";
  }
};