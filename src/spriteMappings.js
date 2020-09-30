const floor = 0;
const wall= 554;
const tileSize = 16;

const defaultLevel = [
  [wall, wall, wall, wall, wall, wall, wall, wall, wall, wall]
  [wall,floor,floor,floor,floor,floor,floor,floor,floor, wall]
  [wall,floor,floor,floor,floor,floor,floor,floor,floor, wall]
  [wall,floor,floor,floor,floor,floor,floor,floor,floor, wall]
  [wall,floor,floor,floor,floor,floor,floor,floor,floor, wall]
  [wall,floor,floor,floor,floor,floor,floor,floor,floor, wall]
  [wall,floor,floor,floor,floor,floor,floor,floor,floor, wall]
  [wall,floor,floor,floor,floor,floor,floor,floor,floor, wall]
  [wall,floor,floor,floor,floor,floor,floor,floor,floor, wall]
  [wall, wall, wall, wall, wall, wall, wall, wall, wall, wall]
];


module.exports = { defaultLevel, tileSize };