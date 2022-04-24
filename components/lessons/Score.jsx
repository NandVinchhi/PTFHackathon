import * as React from "react";
import { NavbarLanding } from "../navbar/NavbarLanding";

import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

import {
    chakra,
    Stat,
    Stack,
    Box,
    Flex,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
    calc,
    Center,
    Button,
    Spacer,
    Heading
} from "@chakra-ui/react";

export const Score = (props) => {
    const { width, height } = useWindowSize()
    
    return (
        <>
        <Confetti
          width={width}
          
          height={height}
        />
        <NavbarLanding />
        <Center>
          <Stack padding="4" spacing="6" marginTop='3rem'>
            <Center><Heading size="lg" mt="4">Your score is</Heading></Center>
            <Center><Heading color="teal.500" size="4xl" mt="2">{props.score * 2}%</Heading></Center>
            <Center><Heading size="sm" mt="4">You received {props.score} points.</Heading></Center>
            <Button size="lg" as="a" href="/dashboard" colorScheme={'blue'}>Go to Dashboard</Button>  
            
            
                     
          </Stack>
        </Center>
      </>
    );
  };