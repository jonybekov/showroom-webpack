import { Vector2, Raycaster } from "three";
import Config from "../../data/config";

// Controls based on orbit controls
export default class Controls {
  constructor(camera, container) {
    // Orbit controls first needs to pass in THREE to constructor
    this.camera = camera;
    this.canvas = container;
    this.rotateStart = new Vector2();
    this.rotateEnd = new Vector2();
    this.rotateDelta = new Vector2();
    this.rotateSpeed = 0.25;
    this.PI_2 = Math.PI / 2;
    this.mouseDown = false;
    this.raycaster = new Raycaster();
    this.mouse = new Vector2();

    // this.init();
    this.bindEventListeners();
  }

  bindEventListeners() {
    this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
    this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.canvas.addEventListener("touchmove", this.onTouchMove.bind(this));
    this.canvas.addEventListener("touchstart", this.onTouchStart.bind(this));
    this.canvas.addEventListener("touchend", this.onTouchEnd.bind(this));
  }

  onMouseDown(evt) {
    const self = this;

    self.mouseDown = true;
    const { x, y } = this.getCoordinates(evt);
    evt.preventDefault();
    self.setCursor("grab");

    self.rotateStart.set(x, y);

    self.mouse.set(
      (x / window.innerWidth) * 2 - 1,
      -(y / window.innerHeight) * 2 + 1
    );

    self.raycaster.setFromCamera(self.mouse, self.camera);
  }

  onMouseUp(evt) {
    const self = this;
    self.mouseDown = false;
    const { x, y } = self.getCoordinates(evt);
    evt.preventDefault();
    self.setCursor();
  }

  onMouseMove(evt) {
    const self = this;

    evt.preventDefault();

    if (self.mouseDown) {
      self.rotateEnd.set(evt.clientX, evt.clientY);

      self.rotateDelta
        .subVectors(self.rotateEnd, self.rotateStart)
        .multiplyScalar(self.rotateSpeed);

      self.camera.rotation.y -=
        -(2 * Math.PI * self.rotateDelta.x) / self.canvas.clientHeight;
      self.camera.rotation.x -=
        -(2 * Math.PI * self.rotateDelta.y) / self.canvas.clientHeight;

      self.rotateStart.copy(self.rotateEnd);

      self.camera.rotation.x = Math.max(
        -this.PI_2,
        Math.min(this.PI_2, self.camera.rotation.x)
      );
    }
  }

  onTouchStart(evt) {}

  onTouchEnd(evt) {}

  onTouchMove(evt) {}

  getCoordinates(evt) {
    let x = evt.clientX
      ? evt.clientX
      : evt.targetTouches[0]
      ? evt.targetTouches[0].pageX
      : evt.changedTouches[evt.changedTouches.length - 1].pageX;
    let y = evt.clientY
      ? evt.clientY
      : evt.targetTouches[0]
      ? evt.targetTouches[0].pageY
      : evt.changedTouches[evt.changedTouches.length - 1].pageY;

    return { x, y };
  }

  setCursor(cursorType) {
    const type = cursorType || "default";
    document.getElementsByTagName("body")[0].style.cursor = type;
  }

  // FOR DESKTOP

  // onMouseDown = function(evt) {
  //   this.mouseDown = true;
  //   evt.preventDefault();
  //   document.getElementsByTagName("body")[0].style.cursor = "grab";

  //   let x = evt.clientX
  //     ? evt.clientX
  //     : evt.targetTouches[0]
  //     ? evt.targetTouches[0].pageX
  //     : evt.changedTouches[evt.changedTouches.length - 1].pageX;
  //   let y = evt.clientY
  //     ? evt.clientY
  //     : evt.targetTouches[0]
  //     ? evt.targetTouches[0].pageY
  //     : evt.changedTouches[evt.changedTouches.length - 1].pageY;

  //   rotateStart.set(event.clientX, event.clientY);

  //   mouse.set(
  //     (x / window.innerWidth) * 2 - 1,
  //     -(y / window.innerHeight) * 2 + 1
  //   );

  //   raycaster.setFromCamera(mouse, camera);
  //   let objects = sceneSubjects[1].getObjects();
  //   var intersects = raycaster.intersectObjects(objects);

  //   if (
  //     intersects.length <= 2 &&
  //     (intersects[intersects.length - 1].object.name == "floor" ||
  //       intersects[intersects.length - 1].object.name == "carpet")
  //   ) {
  //     let intersect = intersects[0];
  //     // console.log(rollOverMesh);
  //     if (moving == false) {
  //       let tl = gsap.timeline();
  //       moving = true;
  //       tl.to(rollOverMesh.children[0].scale, 0.6, {
  //         x: 1.6,
  //         y: 1.6,
  //         z: 1.6,
  //         ease: Power1.easeOut
  //       });
  //       tl.fromTo(
  //         rollOverMesh.children[0].material,
  //         0.4,
  //         {
  //           opacity: 1
  //         },
  //         {
  //           opacity: 0,
  //           onComplete: () => {
  //             rollOverMesh.children[0].material.opacity = 0;
  //             rollOverMesh.children[0].scale.set(1, 1, 1);
  //           }
  //         },
  //         "-=0.4"
  //       );

  //       gsap.to(camera.position, 1.4, {
  //         x: intersect.point.x,
  //         z: intersect.point.z,
  //         ease: Power1.easeInOut,
  //         onUpdate: () => {
  //           camera.updateProjectionMatrix();
  //         },
  //         onComplete: () => {
  //           moving = false;
  //         }
  //       });
  //     }
  //   }
  // };

  // onMouseUp = function(evt) {
  //   this.mouseDown = false;

  //   document.getElementsByTagName("body")[0].style.cursor = "default";
  // };

  // onMouseMove = function(evt) {
  //   evt.preventDefault();

  //   let x = evt.clientX
  //     ? evt.clientX
  //     : evt.targetTouches[0]
  //     ? evt.targetTouches[0].pageX
  //     : evt.changedTouches[evt.changedTouches.length - 1].pageX;
  //   let y = evt.clientY
  //     ? evt.clientY
  //     : evt.targetTouches[0]
  //     ? evt.targetTouches[0].pageY
  //     : evt.changedTouches[evt.changedTouches.length - 1].pageY;

  //   if (this.mouseDown) {
  //     document.getElementsByTagName("body")[0].style.cursor = "grabbing";

  //     rotateEnd.set(evt.clientX, evt.clientY);
  //     rotateDelta
  //       .subVectors(rotateEnd, rotateStart)
  //       .multiplyScalar(rotateSpeed);

  //     camera.rotation.y -= -(2 * Math.PI * rotateDelta.x) / canvas.clientHeight;
  //     camera.rotation.x -= -(2 * Math.PI * rotateDelta.y) / canvas.clientHeight;

  //     rotateStart.copy(rotateEnd);

  //     camera.rotation.x = Math.max(-PI_2, Math.min(PI_2, camera.rotation.x));
  //   }

  //   mouse.set(
  //     (x / window.innerWidth) * 2 - 1,
  //     -(y / window.innerHeight) * 2 + 1
  //   );

  //   raycaster.setFromCamera(mouse, camera);
  //   let floor = sceneSubjects[1].getFloor();

  //   var intersects = raycaster.intersectObjects(floor);

  //   if (intersects.length > 0 && moving == false) {
  //     var intersect = intersects[0];

  //     rollOverMesh.position.copy(intersect.point).add({ x: 0, y: 0.002, z: 0 });
  //   }
  // };

  // // FOR TABLETS

  // onTouchStart = function(evt) {
  //   if (evt.touches.length == 1) {
  //     rotateStart.set(evt.touches[0].pageX, evt.touches[0].pageY);
  //   } else {
  //     var x = 0.5 * (evt.touches[0].pageX + evt.touches[1].pageX);
  //     var y = 0.5 * (evt.touches[0].pageY + evt.touches[1].pageY);

  //     rotateStart.set(x, y);
  //   }
  // };

  // onTouchEnd = function(evt) {};

  // onTouchMove = function(evt) {
  //   if (evt.touches.length == 1) {
  //     rotateEnd.set(evt.touches[0].pageX, evt.touches[0].pageY);
  //   } else {
  //     var xx = 0.5 * (evt.touches[0].pageX + evt.touches[1].pageX);
  //     var yy = 0.5 * (evt.touches[0].pageY + evt.touches[1].pageY);

  //     rotateEnd.set(xx, yy);
  //   }

  //   rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(rotateSpeed);

  //   camera.rotation.y -= -(2 * Math.PI * rotateDelta.x) / canvas.clientHeight;

  //   camera.rotation.x -= -(2 * Math.PI * rotateDelta.y) / canvas.clientHeight;

  //   rotateStart.copy(rotateEnd);

  //   camera.rotation.x = Math.max(-PI_2, Math.min(PI_2, camera.rotation.x));
  // };

  // this.threeControls.target.set(Config.controls.target.x, Config.controls.target.y, Config.controls.target.z);
  // this.threeControls.autoRotate = Config.controls.autoRotate;
  // this.threeControls.autoRotateSpeed = Config.controls.autoRotateSpeed;
  // this.threeControls.rotateSpeed = Config.controls.rotateSpeed;
  // this.threeControls.zoomSpeed = Config.controls.zoomSpeed;
  // this.threeControls.minDistance = Config.controls.minDistance;
  // this.threeControls.maxDistance = Config.controls.maxDistance;
  // this.threeControls.minPolarAngle = Config.controls.minPolarAngle;
  // this.threeControls.maxPolarAngle = Config.controls.maxPolarAngle;
  // this.threeControls.enableDamping = Config.controls.enableDamping;
  // this.threeControls.enableZoom = Config.controls.enableZoom;
  // this.threeControls.dampingFactor = Config.controls.dampingFactor;
}
