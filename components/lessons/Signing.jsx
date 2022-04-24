import React, {useState, useEffect, useReducer } from "react";
import { NavbarLanding } from "../navbar/NavbarLanding";
import {
  Center,
  Stack,
  Button,
  Progress,
  Tab,
  Tabs,
  TabList,
  Text,
  HStack,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image
} from "@chakra-ui/react";
import { VideoCapture } from "./VideoCapture";

export const Signing = (props) => {


  const [letter, setLetter] = useState(0);

  function reducer (status, action){
    return {value: action.value}
  }
  const [status, setStatus] = useReducer(reducer, {value: props.question.length == 3 ? [1, 0, 0]: [1, 0, 0, 0]});
  // const [status, setStatus] = useState(props.question.length == 3 ? [1, 0, 0]: [1, 0, 0, 0]);
  const [score, setScore] = useState(0);
  const [isHint, setIsHint] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [queue, setQueue] = useState(0)

  const nextLetter = (result) => {
    setQueue(0)
    let tempStatus = status.value;
    if (result == 1){
      if (isHint){
        setScore(score + 1);
        tempStatus[letter] = 3;
      }
      else {
        setScore(score + 2);
        tempStatus[letter] = 2;
      }
    }
    else {
      tempStatus[letter] = 4;
    }

    setIsHint(false);

    if (letter >= props.question.length - 1){
      props.updateScore(score);
    }
    else {
      tempStatus[letter + 1] = 1
      console.log(tempStatus)
      setStatus({value: tempStatus})
      
      setLetter(letter + 1);
    }

  }

  const updateQueue = (val) => {

    nextLetter(1);
    console.log(val)
    console.log(queue)
    if (val > 0.2){
      setQueue(0)
    }
    else {
      setQueue(queue + 1)
      if (queue + 1 > 10){
        nextLetter(1);
      }
    }
    
  }

  // useEffect(() => {
  //   document.addEventListener('keyup', event => {
  //     if (event.code === 'Space') {
  //       nextLetter(1) //whatever you want to do when space is pressed
  //     }
  //   })
  // }, [])
  // 0 - nothing, 1 - selected, 2 - green, 3 - orange, 4 - red
  return (
    <>
      <Modal onClose={() => setIsOpen(false)} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Hint</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image src={"/isl/" + props.question[letter].toUpperCase() + ".png"} w="full" mb="5"/>
            </ModalBody>
            
          </ModalContent>
        </Modal>
      <NavbarLanding />
      <Center>
        <Stack padding="4" spacing="6" marginTop="3rem">
          <Center>
            <HStack>
            {props.question.toUpperCase().split("").map((k, i) => {
              let s = status.value[i]

              if (s == 0){
                return (<Box h="10" w="10" p="2" borderRadius="3"><Center><Text  fontWeight="extrabold">{k}</Text></Center></Box>)
              }
              else if (s == 1){
                return (<Box h="10" w="10" p="2" borderRadius="3" border="2px"><Center><Text fontWeight="extrabold">{k}</Text></Center></Box>)
              }

              else if (s == 2){
                return (<Box h="10" w="10" p="2" bg="green.500" color="white" borderRadius="3"><Center><Text fontWeight="extrabold">{k}</Text></Center></Box>)
              }
              else if (s == 3){
                return (<Box h="10" w="10" p="2" bg="orange.500" color="white" borderRadius="3"><Center><Text fontWeight="extrabold">{k}</Text></Center></Box>)
              }
              else if (s == 4){
                return (<Box h="10" w="10" p="2" bg="red.500" color="white" borderRadius="3"><Center><Text fontWeight="extrabold">{k}</Text></Center></Box>)
              }
            })}
            
          </HStack>
          </Center>
          

          <VideoCapture updateQueue={updateQueue} letter={props.question[letter].toUpperCase()}/>

          <Center><Text fontWeight="bold" fontSize="2xl">Sign the letters of the above word.</Text></Center>
          
          <Center>
            <HStack>
              <Button onClick={() => {
                setIsHint(true);
                setIsOpen(true);
              }} size="lg" colorScheme="orange" alignSelf="center">
                Show Hint
              </Button>
              <Button onClick={() => nextLetter(0)} size="lg" colorScheme="red" alignSelf="center">
                Skip
              </Button>
              
            </HStack>
          </Center>
          <Center><Progress width="xl" value={parseInt(100 * props.questionNumber / 11)} hasStripe /></Center>
          <Center><Text fontWeight="bold" color="blue.600" fontSize="2xl">{props.questionNumber}/11</Text></Center>
        </Stack>
      </Center>
    </>
  );
};
