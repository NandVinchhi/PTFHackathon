import React, {useState, useEffect} from "react";
import { NavbarLanding } from "../navbar/NavbarLanding";
import {
  Image,
  Center,
  Stack,
  Input,
  Button,
  Progress,
  HStack,
  Text
} from "@chakra-ui/react";

export const SignRecognizing = (props) => {
  const [stage, setStage] = useState(0);
  const [answer, setAnswer] = useState("");
  return (
    <>
      <NavbarLanding />
      <Center>
        <Stack padding="4" spacing="10" mt="4">
          <Center>
          <Image
            src={"/isl/" + props.question.toUpperCase() + ".png"}
            alt="Sign"
            w="lg"
          />
          </Center>
          {stage == 0 && (
            <>
          <Center><Text fontWeight="bold" fontSize="2xl">Enter the alphabet signed above.</Text></Center>
          

          <HStack>

          <Input
            placeholder="Enter your answer"

            value={answer}
            onChange={e => {
              if (e.target.value.length <= 1){
                setAnswer(e.target.value.toUpperCase());
              }

            }}
            size="lg"
            alignSelf="center"
          />

         
          <Button onClick={() => {
            if (answer == props.question.toUpperCase()){
              setStage(1);
            }
            else {
              setStage(2);
            }
          }} size="lg" disabled={answer.length == 0} colorScheme="blue" alignSelf="center">
            Submit
          </Button>

          </HStack>
          </>
          )}

          {stage == 1 && (
            <>
          <Center><Text fontWeight="bold" color="teal.500" fontSize="2xl">Correct answer.</Text></Center>
          

          
          <Button onClick={() => {
            props.updateScore(2);
          }} size="lg" colorScheme="blue" alignSelf="center">
            Next
          </Button>

         
          </>
          )}

          {stage == 2 && (
            <>
          <Center><Text fontWeight="bold" color="red.500" fontSize="2xl">Wrong answer. The correct answer was '{props.question.toUpperCase()}'</Text></Center>
          

          
          <Button onClick={() => {
            props.updateScore(0);
          }} size="lg" colorScheme="blue" alignSelf="center">
            Next
          </Button>

         
          </>
          )}


          <Progress width="xl" value={parseInt(100 * props.questionNumber / 11)} hasStripe />
          <Center><Text fontWeight="bold" color="blue.600" fontSize="2xl">{props.questionNumber}/11</Text></Center>

        </Stack>
      </Center>
    </>
  );
};
