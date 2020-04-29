import * as THREE from "three";

import Config from "../../data/config";

export default class Camera {
  constructor(renderer) {
    const width = renderer.domElement.width;
    const height = renderer.domElement.height;

    // Create and position a Perspective Camera
    this.threeCamera = new THREE.PerspectiveCamera(
      Config.camera.fov,
      width / height,
      Config.camera.near,
      Config.camera.far
    );
    // this.threeCamera.position.set(
    //   Config.camera.posX,
    //   Config.camera.posY,
    //   Config.camera.posZ
    // );

    this.threeCamera.position.y = 1.6;
    this.threeCamera.position.x = 1.5;
    this.threeCamera.position.z = 2.5;
    this.threeCamera.rotation.order = Config.camera.rotationOrder;
    this.threeCamera.lookAt(0, 0, 0);

    // Initial sizing
    this.updateSize(renderer);

    // Listeners
    window.addEventListener("resize", () => this.updateSize(renderer), false);
  }

  updateSize(renderer) {
    // Update camera aspect ratio with window aspect ratio
    this.threeCamera.aspect =
      renderer.domElement.width / renderer.domElement.height;

    // Always call updateProjectionMatrix on camera change
    this.threeCamera.updateProjectionMatrix();
  }
}
