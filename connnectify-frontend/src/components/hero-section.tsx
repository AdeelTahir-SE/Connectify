"use client";
import * as Three from "three";
import { useEffect, useState } from "react";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import HeroSectionToast from "./hero-section-toast";
import HeroSectionButton from "./hero-section-button";
export default function HeroSection() {
  useEffect(() => {
    const scene = new Three.Scene();
    scene.background = new Three.Color(0x000000);

    const camera = new Three.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 0;

    const renderer = new Three.WebGLRenderer({
      canvas: document.getElementById("hero-section") as HTMLCanvasElement,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);

    const torusGeometry = new Three.TorusGeometry(10, 3, 16, 100);
    const torusMaterial = new Three.MeshPhongMaterial({ color: 0x3c0366 });
    torusMaterial.flatShading = true;
    torusMaterial.side = Three.DoubleSide;
    torusMaterial.shininess = 100;
    const torus = new Three.Mesh(torusGeometry, torusMaterial);
    torus.castShadow = true;
    torus.receiveShadow = true;
    scene.add(torus);

    const particleCount = 1000;
    const particles = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      particles[i] = (Math.random() - 0.5) * 100;
    }
    const particleGeometry = new Three.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new Three.BufferAttribute(particles, 3)
    );
    const particleMaterial = new Three.PointsMaterial({
      color: 0x3c0366,
      size: 0.5,
      sizeAttenuation: true,
    });
    const particlesMesh = new Three.Points(particleGeometry, particleMaterial);
    particlesMesh.castShadow = true;
    particlesMesh.receiveShadow = true;
    scene.add(particlesMesh);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.maxAzimuthAngle = Math.PI / 4 + 1;
    controls.minAzimuthAngle = -Math.PI / 4 - 1;
    controls.maxPolarAngle = Math.PI / 4 - 1;
    controls.minPolarAngle = Math.PI / 4 + 1;
    controls.update();

    const directionalLight = new Three.DirectionalLight(0xffffff, 100);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    directionalLight.castShadow = true;

    // const lightHelper= new Three.DirectionalLightHelper(directionalLight, 5);
    // scene.add(lightHelper);

    const animate = () => {
      requestAnimationFrame(animate);
    //   torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;
      renderer.render(scene, camera);
      if (camera.position.z < 35) {
        camera.position.z += 0.05;
      }
      

      controls.update();
    };
    animate();

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return () => {
      renderer.dispose();
      scene.clear();
      window.removeEventListener("resize", () => {});
    };
  }, []);
  return (
    <section className="flex flex-col items-center justify-center min-h-[500px]">
      <HeroSectionToast
        text="By the way you can rotate and zoom the donut with your mouse—try interacting!
"
      />
      <canvas
        className="w-full max-h-[500px] absolute "
        id="hero-section"
      ></canvas>

      <section className="flex flex-col items-center justify-center top-0 z-10 gap-[20px] min-h-[500px] w-full ">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white glow-text ">
          Connectify
        </h1>
        <h3 className="text-md md:text-2xl font semibold text-white glow-text">
          Explore the world and let them join you
        </h3>
        <HeroSectionButton text="Get Started" />
      </section>
    </section>
  );
}
