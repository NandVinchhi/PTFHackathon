import Script from "next/script";
import React, { useEffect, useState } from "react";
import { referenceData } from "./RecordedSigns";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { Center, Container } from "@chakra-ui/react";
import { NavbarLanding } from "../navbar/NavbarLanding.jsx";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";

export const VideoCapture = (props) => {
  const [videoref, setVideoref] = useState(React.createRef());
  const [canvasref, setCanvasref] = useState(React.createRef());
  
  const router = useRouter();
  const auth = getAuth();

  function compare(a, b){
    let final = 0;
      for (let i = 0 ; i < a.length; i++){
        final += Math.abs(a[i] - b[i])
      }

    final = final / a.length;
    return final;
  }

  function getRelativeCoords(landmarks){
    let final = []
    let quotient = (landmarks[0].x - landmarks[17].x) * (landmarks[0].x - landmarks[17].x) + (landmarks[0].y - landmarks[17].y) * (landmarks[0].y - landmarks[17].y) + (landmarks[0].z - landmarks[17].z) * (landmarks[0].z - landmarks[17].z) 
    quotient = Math.sqrt(quotient)
    for (let i = 0 ; i < landmarks.length; i++){
      let distancex = Math.abs(landmarks[i].x - landmarks[0].x)
      let distancey = Math.abs(landmarks[i].y - landmarks[0].y)
      final.push(distancex/quotient);
      final.push(distancey/quotient);
    }
    return final;
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      const s = document.createElement("script");
      let r = false;
      s.type = "text/javascript";
      s.src = src;
      s.async = true;
      s.onerror = function (err) {
        reject(err, s);
      };
      s.onload = s.onreadystatechange = function () {
        // console.log(this.readyState); // uncomment this line to see which ready states are called.
        if (!r && (!this.readyState || this.readyState == "complete")) {
          r = true;
          resolve();
        }
      };
      const t = document.getElementsByTagName("script")[0];
      t.parentElement.insertBefore(s, t);
    });
  }

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (!user) {
        router.push("/login");
      }
    });

    const videoElement = videoref.current;
    const canvasElement = canvasref.current;
    const canvasCtx = canvasElement.getContext("2d");
    let hands = null;
    let camera = null;
    let drawC = null;
    let drawL = null;
    const counter = 0;

    function onResults(results) {
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

    

      if (results.multiHandLandmarks) {
        
        let f = []

        
        for (let landmark_i = 0; landmark_i < results.multiHandLandmarks.length; landmark_i++) {
          
          const landmarks = results.multiHandLandmarks[landmark_i];
          f.push(getRelativeCoords(landmarks));
          
          drawC(canvasCtx, landmarks, HAND_CONNECTIONS, {
            color: "#00FF00",
            lineWidth: 3,
          });
          // drawL(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 1});
        }

        let a = referenceData[props.letter]
              

        if (a.length == f.length){
          if (a.length == 2){
            // console.log(f)
            let val1 = compare(a[0].concat(a[1]), f[0].concat(f[1]))
            let val2 = compare(a[1].concat(a[0]), f[0].concat(f[1]))
            if (val1 > val2){


              counter += 1;
              

              if (counter >= 100){
                props.updateQueue(val2)
                counter = 0;
              }
              
            }
            else {
              counter += 1;
              
              if (counter >= 100){
                props.updateQueue(val1)
                counter = 0;
              }
            }

          }
          else if (a.length == 1){
            let val3 = compare(a[0], f[0])
            counter += 1;
              
            if (counter >= 100){
                props.updateQueue(val3)
                counter = 0;
              }
          }
        }
        
        
      }
      canvasCtx.restore();
    }
    loadScript(
      "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"
    ).then(() => {
      drawC = drawConnectors;
      drawL = drawLandmarks;
      loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js").then(
        () => {
          hands = new Hands({
            locateFile: (file) => {
              return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            },
          });
          hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
          });
          hands.onResults(onResults);
          loadScript(
            "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"
          ).then(() => {
            camera = new window.Camera(videoElement, {
              onFrame: async () => {
                await hands.send({ image: videoElement });
              },
              width: 1280,
              height: 720,
            });
            camera.start();
          });
        }
      );
    });
  }, []);

  return (
    <>
      <Center h="full" bg="white">
        <video ref={videoref} style={{ display: "None" }}></video>
        <canvas
          ref={canvasref}
          style={{ borderRadius: "10px" }}
          width="640px"
          height="360px"
        ></canvas>
      </Center>
    </>
  );
};
