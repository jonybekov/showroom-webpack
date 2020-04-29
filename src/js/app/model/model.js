import { TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "../../utils/Draco/DRACOLoader";

import Helpers from "../../utils/helpers";
import Config from "../../data/config";

// Loads in a single object from the config file
export default class Model {
  constructor(scene, manager, textures) {
    this.scene = scene;
    this.textures = textures;
    this.obj = {};

    // Manager is passed in to loader to determine when loading done in main
    this.loader = new GLTFLoader(manager);

    let dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("../../utils/Draco/");
    this.loader.setDRACOLoader(dracoLoader);
  }

  load() {
    var exteriorLightMap = new TextureLoader().load(
      "./assets/Textures/Room_2/Exterior_LightMap_1024.jpg"
    );
    exteriorLightMap.flipY = false;
    var interiorLightMap_1 = new TextureLoader().load(
      "./assets/Textures/Room_2/Interior_1_LightMap_1024.jpg"
    );
    interiorLightMap_1.flipY = false;
    var interiorLightMap_2 = new TextureLoader().load(
      "./assets/Textures/Room_2/Interior_2_LightMap_1024.jpg"
    );
    interiorLightMap_2.flipY = false;
    var interiorLightMap_3 = new TextureLoader().load(
      "./assets/Textures/Room_2/Interior_3_LightMap_1024.jpg"
    );
    interiorLightMap_3.flipY = false;

    var exteriorAOMap = new TextureLoader().load(
      "./assets/Textures/Room_2/Exterior_AO_1024.jpg"
    );
    exteriorAOMap.flipY = false;
    var interiorAOMap_1 = new TextureLoader().load(
      "./assets/Textures/Room_2/Interior_1_AO_1024.jpg"
    );
    interiorAOMap_1.flipY = false;
    var interiorAOMap_2 = new TextureLoader().load(
      "./assets/Textures/Room_2/Interior_2_AO_1024.jpg"
    );
    interiorAOMap_2.flipY = false;
    var interiorAOMap_3 = new TextureLoader().load(
      "./assets/Textures/Room_2/Interior_3_AO_1024.jpg"
    );
    interiorAOMap_3.flipY = false;

    this.loader.load(
      "./assets/Room_2.gltf",
      (gltf) => {
        let model = gltf.scene;
        model.traverse((o) => {
          if (o.isMesh) {
            console.log(o.name);
            // o.material.envMap = envMap;
            if (o.name.includes("Exterior")) {
              o.material.lightMap = exteriorLightMap;
              o.material.lightMapIntensity = 5;
              o.material.aoMap = exteriorAOMap;
              o.material.aoMapIntensity = 1;
              o.material.envMapIntensity = 1;
            } else if (o.name.includes("Interior_1")) {
              o.material.lightMap = interiorLightMap_1;
              o.material.lightMapIntensity = 5;
              console.log("Interior_1");
              o.material.aoMap = interiorAOMap_1;
              o.material.aoMapIntensity = 1;
              o.material.envMapIntensity = 1;
            } else if (o.name.includes("Interior_2")) {
              o.material.lightMap = interiorLightMap_2;
              o.material.lightMapIntensity = 5;
              console.log("Interior_2");
              o.material.aoMap = interiorAOMap_2;
              o.material.aoMapIntensity = 1;
              o.material.envMapIntensity = 1;
            } else if (o.name.includes("Interior_3")) {
              o.material.roughness = 0;
              o.material.lightMap = interiorLightMap_3;
              o.material.lightMapIntensity = 5;
              console.log("Interior_3");
              o.material.aoMap = interiorAOMap_3;
              o.material.aoMapIntensity = 1;
              o.material.envMapIntensity = 1;
            } else if (o.name == "Glasses") {
              o.material.roughness = 0;
              o.material.refractionRatio = 0;
              o.material.opacity = 0.2;
              o.material.metalness = 1;
              o.material.envMapIntensity = 30;
            } else {
              o.material.envMapIntensity = 1;
            }
            o.material.needsUpdate = true;
          }
        });

        this.obj = model;
        this.scene.add(model);
      },
      Helpers.logProgress(),
      Helpers.logError()
    );
  }

  // load() {
  //   // Load model with ObjectLoader
  //   this.loader.load(
  //     Config.model.path,
  //     (obj) => {
  //       obj.traverse((child) => {
  //         if (child instanceof THREE.Mesh) {
  //           // Create material for mesh and set its map to texture by name from preloaded textures
  //           const material = new Material(0xffffff).standard;
  //           material.map = this.textures.UV;
  //           child.material = material;

  //           // Set to cast and receive shadow if enabled
  //           if (Config.shadow.enabled) {
  //             child.receiveShadow = true;
  //             child.castShadow = true;
  //           }
  //         }
  //       });

  //       // Add mesh helper if Dev
  //       if (Config.isDev && Config.mesh.enableHelper) {
  //         new MeshHelper(this.scene, obj);
  //       }

  //       // Set prop to obj so it can be accessed from outside the class
  //       this.obj = obj;

  //       obj.scale.multiplyScalar(Config.model.scale);
  //       this.scene.add(obj);
  //     },
  //     Helpers.logProgress(),
  //     Helpers.logError()
  //   );
  // }
}
