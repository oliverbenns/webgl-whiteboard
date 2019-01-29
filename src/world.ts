import Camera from "./camera";
import DotManager from "./dot-manager";

export default class World {
  camera = new Camera();
  dotManager = new DotManager();
}
