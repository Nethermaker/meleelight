/*eslint-disable*/

import {
  inverseMatrix,
  multMatVect
} from "main/linAlg";
import {Vec2D} from "main/characters";

export const button = {
  "a" : 0, 
  "b" : 1,
  "x" : 2,
  "y" : 3,
  "z" : 4,
  "r" : 5,
  "l" : 6,
  "s" : 7,  // start
  "du": 8,  // d-pad up
  "dr": 9,  // d-pad right
  "dd": 10, // d-pad down
  "dl": 11  // d-pad left
}

export const axis = {
  "lsX": 12, // left analog stick left/right
  "lsY": 13, // left analog stick up/down
  "csX": 14, // c-stick left/right
  "csY": 15, // c-stick up/down
  "lA" : 16, // L button analog sensor
  "rA" : 17  // R button analog sensor
};

export const keyboardMap = [
  [102, 186],
  [101, 76],
  [100, 75],
  [104, 79],
  [103, 73],
  [105, 80],
  [107, 192, 222],
  [109, 219], 71, 78, 66, 86
];

const mayflashMap    = [1, 2, 0, 3, 7, 5, 4, 9, 12, 13, 14, 15, 0, 1, 5, 2, 3, 4]; // ID 0, Mayflash Wii U 4-way adapter, NEXILUX adapter
const vJoyMap        = [0, 1, 2, 3, 4, 5, 6, 7, 8 , 11, 9 , 10, 0, 1, 3, 4, 2, 5]; // ID 1, vJoy
const raphnetV2_9Map = [4, 3, 2, 1, 7, 6, 5, 0, 8 , 10, 9 , 11, 0, 1, 3, 4, 5, 6]; // ID 2, raphnet v.2.9 N64 adapter
const xbox360Map     = [0, 2, 1, 3, 5, 7, 6, 9, 12, 15, 13, 14, 0, 1, 2, 3, 6, 7]; // ID 3, XBOX 360 (XInput Standard Gamepad)
const tigergameMap   = [0, 1, 2, 3, 6, 5, 4, 7, 11, 9 , 10, 8 , 0, 1, 2, 3, 5, 4]; // ID 4, TigerGame 3-in-1 adapter
const retrolinkMap   = [2, 3, 1, 0, 6, 5, 4, 9, 10, 11, 8 , 7 , 0, 1, 2, 5, 3, 4]; // ID 5, Retrolink adapter
const raphnetV3_2Map = [0, 1, 7, 8, 2, 5, 4, 3, 10, 13, 11, 12, 0, 1, 3, 4, 5, 2]; // ID 6, Raphnet v 3.2,3.3

export const controllerMaps = [mayflashMap, vJoyMap, raphnetV2_9Map, xbox360Map, tigergameMap, retrolinkMap, raphnetV3_2Map];


// Checking gamepad inputs are in allowable range

export function gpdaxis ( gpd, gpdID, ax ) { // gpd.axes[n] but checking axis index is in range
  let number = controllerMaps[gpdID][axis[ax]];
  if (number > gpd.axes.length) {
   return 0;
  }
  else {
    return gpd.axes[number];
  }
};

export function gpdbutton ( gpd, gpdID, but ) { // gpd.buttons[n] but checking button index is in range
  let number = controllerMaps[gpdID][button[but]];
  if (number > gpd.buttons.length) {
    return 0;
  }
  else {
    return gpd.buttons[number];
  }
};


const customCenters = function() {
  this.ls = new Vec2D(0, 0);
  this.cs = new Vec2D(0, 0);
  this.l = 0;
  this.r = 0;
};

export const custcent = [new customCenters, new customCenters, new customCenters, new customCenters];


//--CONTROLLER IDs-------------------------------------
var controllerIDMap = new Map();


// ID 0, Mayflash Wii-U adapter & variants
controllerIDMap.set("Mayflash", 0); // Mayflash 4 port, ID: MAYFLASH GameCube Controller Adapter
controllerIDMap.set("0079-1843", 0);

controllerIDMap.set("NEXILUX", 0); // NEXILUX GAMECUBE Controller Adapter
controllerIDMap.set("0079-1845", 0);

controllerIDMap.set("Wii U GameCube Adapter", 0); // Mayflash 4 port on Linux, no vendor/product ID?

controllerIDMap.set("USB GamePad", 0); // Mayflash 2 port, ID: USB GamePad, TODO: should check vendor & product
controllerIDMap.set("1a34-f705", 0);

// ID 1, vJoy
controllerIDMap.set("vJoy", 1);
controllerIDMap.set("1234-bead", 1);

// ID 2, raphnet n64 adapter, version 2.9 (and below?)
controllerIDMap.set("GC/N64 to USB, v2.", 2);
controllerIDMap.set("GC/N64 to USB v2.", 2);
controllerIDMap.set("289b-000c", 2);

// ID 3, XBOX 360 or XInput standard gamepad
controllerIDMap.set("Microsoft Controller", 3); // XBOX 360 & XBOX One controllers
controllerIDMap.set("XBOX 360", 3); // ID: Xbox 360 Controller 
controllerIDMap.set("Microsoft X-Box One", 3); // ID: Microsoft X-Box One pad
controllerIDMap.set("XInput", 3);
controllerIDMap.set("Standard Gamepad", 3);
controllerIDMap.set("045e-02d1", 3);

controllerIDMap.set("Wireless 360 Controller", 3); // XBOX 360 controller on Mac
controllerIDMap.set("045e-028e", 3);

// ID 4, TigerGame 3-in-1 adapter
controllerIDMap.set("TigerGame", 4); // ID: TigerGame XBOX+PS2+GC Game Controller Adapter
controllerIDMap.set("0926-2526", 4);

// ID 5, Retrolink adapter
controllerIDMap.set("Generic USB Joystick", 5); // ID: Generic USB Joystick, TODO: should check ID and vendor...
controllerIDMap.set("0079-0006", 5);

// ID 6, raphnet n64 adapter, version 3.0 and above
controllerIDMap.set("GC/N64 to USB v3.", 6); // "v3.2" and "v3.3"
controllerIDMap.set("GC/N64 to USB, v3.", 6);
controllerIDMap.set("289b-001d", 6);

//--END OF CONTROLLER IDs-------------------------------------
    

export function controllerNameFromIDnumber(number) {
  if (number === 0) {
    return "Mayflash Wii-U adapter";
  } else if (number === 1) {
    return "vJoy";
  } else if (number == 2) {
    return "raphnet v2.9 N64 adapter";
  } else if (number == 3) {
    return "XBOX 360 compatible controller";
  } else if (number === 4) {
    return "TigerGame 3-in-1";
  } else if (number == 5) {
    return "Retrolink adapter";
  } else if (number == 6) {
    return "raphnet v3.2+ N64 adapter";
  } else {
    return "error: controller detected but not supported";
  }
};


function fromCardinals([origx, origy], l, r, d,u) {
    return [[origx, origy], [l,origy], [r,origy], [origx,d], [origx, u]];
};

// the following function gives an approximation to the extreme raw axis data for a given controller
// of course, this varies between controllers, but this serves as a useful first approximation
// function output: [[origx, origy], [lx, ly], [rx, ry], [dx, dy], [ux, uy]]
function axisDataFromIDNumber(number) {
  if (number == 4) { // TigerGame 3-in-1
    let orig = 0.05098;
    return ( fromCardinals ( [orig, -orig], -0.7098, 0.85098, 0.73333, -0.8588) );
  }
  else {
    return ( fromCardinals ( [0, 0], -0.75, 0.75, 0.75, -0.75) ); // default
  }
};

export function controllerIDNumberFromGamepadID(gamepadID) {
  var output = -1;
  for (var [possibleID, val] of controllerIDMap.entries()) {
    let l = possibleID.length;
    if (gamepadID.toLowerCase().substring(0,l) === possibleID.toLowerCase()) {
      output = val;
      break;
    }
  }
  return output;
};


// The following function renormalises axis input,
// so that corners (l = left, r = right, d=down, u=up) are mapped to the respective corners of the unit square.
// This function assumes that ALL coordinates have already been centered.
// Return type: [xnew,ynew]
export function renormaliseAxisInput([lx, ly], [rx, ry], [dx, dy], [ux, uy], [x, y]) {
  if ((x * ry - y * rx <= 0) && (x * uy - y * ux >= 0)) // quadrant 1
  {
    let invMat = inverseMatrix([
      [rx, ux],
      [ry, uy]
    ]);
    return multMatVect(invMat, [x, y]);
  } else if ((x * uy - y * ux <= 0) && (x * ly - y * lx >= 0)) // quadrant 2
  {
    let invMat = inverseMatrix([
      [-lx, ux],
      [-ly, uy]
    ]);
    return multMatVect(invMat, [x, y]);
  } else if ((x * ly - y * lx <= 0) && (x * dy - y * dx >= 0)) // quadrant 3
  {
    let invMat = inverseMatrix([
      [-lx, -dx],
      [-ly, -dy]
    ]);
    return multMatVect(invMat, [x, y]);
  } else // quadrant 4
  {
    let invMat = inverseMatrix([
      [rx, -dx],
      [ry, -dy]
    ]);
    return multMatVect(invMat, [x, y]);
  }
};

// The following functions renormalise input to mimic GC controllers.

// clamps a value between -1 and 1
function toInterval (x) {
  if (x < -1) {
    return -1;
  }
  else if (x > 1) {
    return 1;
  }
  else {
    return x;
  }
};



// Melee GC controller simulation

const steps = 80;
const deadzoneConst = 0.28;

// data courtesy of ARTIFICE
// horizontal: 19 -- 122 -- 232
const meleeXMin  = 19 ;
const meleeXOrig = 122;
const meleeXMax  = 232;
// vertical  : 32 -- 134 -- 246
const meleeYMin  = 32 ;
const meleeYOrig = 134;
const meleeYMax  = 246;

// rescales -1 -- 0 -- 1 to min -- orig -- max, and rounds to nearest integer
function discretise (x, min, orig, max) {
  if (x < 0) {
    return Math.round((x*(orig-min)+orig));
  }
  else if (x > 0) {
    return Math.round((x*(max-orig)+orig));
  }
  else {
    return orig;
  }
};

// Analog sticks.

// Rescales controller input to -1 -- 0 -- 1 in both axes
function scaleToUnitAxes ( x,y, number, customCenterX, customCenterY ) { // number = gamepad ID number
    let [[origx, origy], [lx, ly], [rx, ry], [dx, dy], [ux, uy]] = axisDataFromIDNumber(number);
    origx += customCenterX;
    origy += customCenterY;
    let [xnew, ynew] = renormaliseAxisInput([lx-origx, ly-origy], [rx-origx, ry-origy], [dx-origx, dy-origy], [ux-origx, uy-origy], [x-origx, y-origy]);
    return [toInterval(xnew), toInterval(ynew)];
};

// Rescales -1 -- 1 input to 0 -- 255 values to simulate a GC controller
function scaleUnitToGCAxes (x, y) {
  let xnew = discretise(x, meleeXMin, meleeXOrig, meleeXMax);
  let ynew = discretise(y, meleeYMin, meleeYOrig, meleeYMax);
  return [xnew, ynew];
};

// Rescales controller input to 0 -- 255 values to simulate a GC controller
function scaleToGCAxes (x, y, number, customCenterX, customCenterY) {
  let [xnew, ynew] = scaleToUnitAxes (x, y, number, customCenterX, customCenterY);
  return scaleUnitToGCAxes(xnew, ynew);
}

// Analog triggers.
// t = trigger input
export function scaleToGCTrigger ( t, offset, scale ) {
    let tnew = (t+offset) * scale;
    if (tnew > 1){
      return 1;
    }
    else if (tnew < 0.3){
      return 0;
    }
    else {
      return tnew;
    }
};

// basic mapping from 0 -- 255 back to -1 -- 1 done by Melee
// boolean value: true = deadzones, false = no deadzones
function axisRescale ( x, orig, bool) {
    var magicOffset = 1; // don't ask
    if ( ! bool) {
      magicOffset = 0;
    }
  // the following line is equivalent to checking that the result of this function lies in the deadzone
  // no need to check for deadzones later
    if ( bool && Math.abs (x+magicOffset-orig) < deadzoneConst * steps) {
      return 0;
    }
    else {
      return (x-orig+magicOffset) / steps;
    }
};

function meleeXAxisLinearRescale (x, bool) {
  return axisRescale ( x, meleeXOrig, bool );
};

function meleeYAxisLinearRescale (y, bool) {
  return axisRescale ( y, meleeYOrig, bool );
};

function meleeAxesNonLinearRescale ( [x,y] ) {
  let norm = Math.sqrt(x*x + y*y);
  if (norm < 1) {
    return ([x,y]);
  }
  else if (Math.abs(y) <= Math.abs(x)/6){ // constants (norm < 1 above, 1/6 here) may not be proper
    return ([toInterval(x),y]);
  }
  else {
    return ( [x/norm, y/norm]);
  }
};

function meleeAxesRescale ( [x,y], bool ) {
    let xnew = meleeXAxisLinearRescale (x, bool);
    let ynew = meleeYAxisLinearRescale (y, bool);
    return meleeAxesNonLinearRescale( [xnew, ynew]);
}

function meleeRound (x) {
  return Math.round(steps*x)/steps;
};


// this is the main input rescaling function
// it scales raw input data to the data Melee uses for the simulation
// number : controller ID, to rescale axes dependent on controller raw input
// bool == false means no deadzone, bool == true means deadzone
export function scaleToMeleeAxes ( x, y, number, bool, customCenterX, customCenterY ) {
    let [xnew, ynew] = scaleToGCAxes(x,y,number, customCenterX, customCenterY);
    return (meleeAxesRescale ( [xnew, ynew], bool )).map(meleeRound);
};

// scales -1 -- 1 data to the data Melee uses for the simulation
// bool == false means no deadzone, bool == true means deadzone
export function meleeRescale ( x, y, bool = false) {
    let [xnew, ynew] = scaleUnitToGCAxes (x, y);
    return (meleeAxesRescale ( [xnew, ynew], bool)).map(meleeRound);
}

export function dolphinRescale (x, y, bool = false) {
    return meleeAxesRescale(x,y).map(meleeRound);
}