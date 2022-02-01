import { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function useCards() {
  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("purple");
    const camera = new THREE.PerspectiveCamera(
      175,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("canvasContainer").appendChild(renderer.domElement);

    function animate() {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    }

    camera.position.z = 200;

    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.AmbientLight(color, intensity);
    scene.add(light);

    function animate() {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    }

    const loader = new GLTFLoader();
    async function fetchPreset() {
      try {
        const loadedData = await loader.loadAsync("/textures/scene.glb");
        scene.add(loadedData.scene);
        loadedData.scene.scale.set(2, 2);
        loadedData.scene.children[0].rotation.x += 0.5;

        animate();
      } catch (error) {
        console.error(error);
      }
    }

    fetchPreset();
  }, []);
}
