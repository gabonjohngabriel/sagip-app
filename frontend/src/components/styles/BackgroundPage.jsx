import { alignProperty } from '@mui/material/styles/cssUtils';
import React from 'react';

const BackgroundPage = (props) => {
  const styles = {
    body: {
      margin: 0,
      backgroundColor: "transparent", 
      overflow: "hidden",
      height: "100vh",
      width: "100vw",
      position: "relative", 
    },
    wrapper: {
      position: "absolute",
      width: "100%",
      height: "100vh",
      top: 0,
      left: 0,
      zIndex: 0, 
    },
    bubble: {
      position: "absolute",
      bottom: "-1px",
      background: "rgba(0, 255, 128, 0.6)", 
      borderRadius: "50%", 
      animation: "rise 10s infinite", 
      mixBlendMode: "screen", 
    },
    content: {
      position: "relative",
      zIndex: 1,
    }
  };

  const bubbleProps = [
    { width: "40px", height: "40px", left: "10%", animationDelay: "0s" },
    { width: "60px", height: "60px", left: "30%", animationDelay: "1s" },
    { width: "50px", height: "50px", left: "50%", animationDelay: "2s" },
    { width: "70px", height: "70px", left: "70%", animationDelay: "3s" },
    { width: "30px", height: "30px", left: "20%", animationDelay: "4s" },
    { width: "80px", height: "80px", left: "40%", animationDelay: "5s" },
    { width: "20px", height: "20px", left: "60%", animationDelay: "6s" },
    { width: "90px", height: "90px", left: "80%", animationDelay: "7s" },
    { width: "50px", height: "50px", left: "15%", animationDelay: "8s" },
    { width: "60px", height: "60px", left: "85%", animationDelay: "9s" },
  ];

  return (
    <div style={styles.body}>
      <style>
        {`
          @keyframes rise {
            to {
              transform: translateY(-100vh);
              opacity: 0;
            }
          }
        `}
      </style>
      <div style={styles.wrapper}>
        {bubbleProps.map((props, index) => (
          <span
            key={index}
            style={{
              ...styles.bubble,
              width: props.width,
              height: props.height,
              left: props.left,
              animationDelay: props.animationDelay,
            }}
          />
        ))}
      </div>
      <div style={styles.content}>
        {props.children}
      </div>
    </div>
  );
};

export default BackgroundPage;