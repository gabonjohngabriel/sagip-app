import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

const SagipLogoAnimation = ({ onAnimationComplete }) => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const lettersRef = useRef([]);
  const audioRef = useRef(null);

  useEffect(() => {
    // AUDIO
    const audio = new Audio("./sounds/sagip.mp3");
    audio.volume = 0; 
    audio.loop = false;
    audioRef.current = audio;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x208a3c);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      500,
      window.innerWidth / window.innerHeight,
      0.1,
      500
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // LETTERS
    const lettersGroup = new THREE.Group();
    const letters = "SAGIP".split("");
    const letterObjects = letters.map((letter, index) => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext("2d");

      // CLEAR
      context.clearRect(0, 0, canvas.width, canvas.height);

      // TEXT
      context.font = "Bold 250px Poppins";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(letter, 128, 128);

      const verticalGeometry = new THREE.BoxGeometry(1, 3, 0.5);
      const horizontalGeometry = new THREE.BoxGeometry(3, 1, 0.5);

      const greenMaterial = new THREE.MeshPhongMaterial({
        color: 0x66ff75,
        shininess: 100,
        specular: 0x111111,
      });

      const verticalMesh = new THREE.Mesh(verticalGeometry, greenMaterial);
      const horizontalMesh = new THREE.Mesh(horizontalGeometry, greenMaterial);

      lettersGroup.add(verticalMesh);
      lettersGroup.add(horizontalMesh);

      lettersGroup.scale.set(0.01, 0.01, 0.01);
      scene.add(lettersGroup);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      // TEXTURE
      const texture = new THREE.CanvasTexture(canvas);

      // MATERIAL
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0,
      });

      // GEOMETRY
      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);

      // POSITION
      mesh.position.x = (index - 2) * 2.5;
      mesh.position.y = 0;
      mesh.position.z = 0;

      scene.add(mesh);
      return mesh;
    });

    lettersRef.current = letterObjects;
    
    // ANIMATION
    const animateLetters = () => {
      let currentLetter = 0;
      let animationPhase = 0;
      let soundStarted = false;
      const maxVolume = 1;

      const animate = () => {
        requestAnimationFrame(animate);

        // START
        if (!soundStarted) {
          audio.play().catch(err => console.log("Audio play failed:", err));
          soundStarted = true;
        }

        // FADE
        if (animationPhase === 0 && currentLetter < letterObjects.length) {
          const letter = letterObjects[currentLetter];
          if (letter.material.opacity < 1) {
            letter.material.opacity += 0.2;
            
            // IN
            if (audio.volume < maxVolume) {
              audio.volume = Math.min(
                maxVolume,
                audio.volume + 0.01
              );
            }
          } else {
            currentLetter++;
          }
        }

        // FADE OUT
        if (currentLetter === letterObjects.length) {
          animationPhase = 0.5;
        }

        // FADE
        if (animationPhase === 0.5) {
          let allFadedOut = true;
          letterObjects.forEach((letter) => {
            if (letter.material.opacity > 0) {
              letter.material.opacity -= 0.05;
              allFadedOut = false;
              
              // FADE
              if (audio.volume > 0) {
                audio.volume = Math.max(0, audio.volume - 0.01);
              }
            }
          });

          if (allFadedOut) {
            // STOP
            audio.pause();
            audio.currentTime = 0;
            
            if (onAnimationComplete) {
              onAnimationComplete();
            }
          }
        }

        renderer.render(scene, camera);
      };

      animate();
    };

    // START ANIMATION
    animateLetters();

    // CLEAN
    return () => {
      // Stop and clean up audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      
      renderer.dispose();
      lettersRef.current.forEach((letter) => {
        letter.geometry.dispose();
        letter.material.dispose();
      });
    };
  }, [onAnimationComplete]);

  return (
    <div
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1000,
      }}
    />
  );
};

export default SagipLogoAnimation;