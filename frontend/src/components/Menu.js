import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { Box, CardActionArea, Card, Typography, Container } from "@mui/material";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import useStyles from "./Styles";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import BackgroundPage from "./styles/BackgroundPage";

export default function Menu() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);
  const mountRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x208a3c);
    
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 500);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);
    
    const crossGroup = new THREE.Group();
    
    const verticalGeometry = new THREE.BoxGeometry(1, 3, 0.5);
    const horizontalGeometry = new THREE.BoxGeometry(3, 1, 0.5);
    
    const greenMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x66ff75,
      shininess: 100,
      specular: 0x111111
    });
    
    const verticalMesh = new THREE.Mesh(verticalGeometry, greenMaterial);
    const horizontalMesh = new THREE.Mesh(horizontalGeometry, greenMaterial);
    
    crossGroup.add(verticalMesh);
    crossGroup.add(horizontalMesh);
    
    crossGroup.scale.set(0.01, 0.01, 0.01);
    scene.add(crossGroup);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (crossGroup) {
        crossGroup.rotation.y += 0.01;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    const timeline = gsap.timeline({
      onComplete: () => {
        // Fade out the canvas
        gsap.to(renderer.domElement, {
          opacity: 0,
          duration: 0.75,
          onComplete: () => {
            // Remove the Three.js canvas
            if (mount && mount.contains(renderer.domElement)) {
              mount.removeChild(renderer.domElement);
            }
            // Show the main UI
            setAnimationComplete(true);
          }
        });
      }
    });
    
    // Animation steps
    timeline
      .to(crossGroup.scale, { 
        x: 1, 
        y: 1, 
        z: 1, 
        duration: 1.5, 
        ease: "ease.out(1, 0.3)" 
      })
      .to(crossGroup.rotation, { 
        y: Math.PI * 2, 
        duration: 1.5 
      }, "-=0.5")
      .to(camera.position, { 
        z: 3, 
        duration: 1 
      }, "-=1")
      .to(scene.background, { 
        color: 0x208a3c,
        duration: 1 
      }, "-=0.5");
    
    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };
    
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (mount && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      // Dispose geometries and materials
      verticalGeometry.dispose();
      horizontalGeometry.dispose();
      greenMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // After animation completes, run the original useEffect
  useEffect(() => {
    if (animationComplete) {
      // Add the 'show' class to elements after the component mounts
      const needles = document.querySelectorAll(`.${styles.needle}`);
      const leaves = document.querySelectorAll(`.${styles.leaf}`);
      const iconLeaves = document.querySelector(`.${styles.iconLeaves}`);

      needles.forEach((needle) => needle.classList.add("show"));
      leaves.forEach((leaf) => leaf.classList.add("show"));
      if (iconLeaves) iconLeaves.classList.add("show");
    }
  }, [animationComplete, styles]);

  return (
    <>
      {/* 3D Animation Container */}
      <div 
        ref={mountRef} 
        style={{ 
          width: '100%', 
          height: '100vh', 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          zIndex: animationComplete ? -1 : 100 
        }} 
      />
      
      {/* Main UI - Will be shown after animation completes */}
      <div style={{ opacity: animationComplete ? 1 : 0, transition: 'opacity 0.3s ease' }}>
        <Card>
          <CardActionArea onClick={() => navigate("/choose")}>
            <Box className={`${styles.root} ${styles.backgroundGreenTheme}`}>
              <Box className={`${styles.main} ${styles.white} ${styles.center} ${styles.poppins}`}>
                <Typography component="h6" variant="h6">
                  SAGIP APP
                </Typography>
                <Typography
                  component="h1"
                  variant="h1"
                  className={`${styles.poppins} ${styles.bold} ${styles.spacing}`}
                >
                  HOW <br />
                  MAY I <br />
                  ASSIST <br />
                  YOU?
                </Typography>
                <Container>
                  <TouchAppIcon fontSize="large"></TouchAppIcon>
                </Container>
                <Typography
                  component="h6"
                  variant="h6"
                  className={`${styles.poppins}`}
                >
                  &gt; TAP TO START &lt;
                </Typography>
              </Box>
            </Box>
            <Box className={`${styles.main2} ${styles.center}`}>
              <Logo large />
            </Box>
          </CardActionArea>
        </Card>
      </div>
    </>
  );
}