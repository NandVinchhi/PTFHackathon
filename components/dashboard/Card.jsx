import {
  Box,
  Button,
  Container,
  Center,
  Stack,
  Icon,
  Text,
  Progress,
  useColorModeValue,
  HStack,
  VStack,
  Tooltip 

} from "@chakra-ui/react";
import { MdArrowForward } from "react-icons/md";
import * as React from "react";
import { useRouter } from "next/router";
import { CircularProgressBar } from "./CircularProgressBar";

export const Card = (props) => {
  const router = useRouter();

  const onStart = () => {
    router.push(props.redirect)
  }
  return (
    <Box
      as="section"
      pt={{
        base: "4",
        md: "8",
      }}
    >
      <Container maxW="7xl">
        <Box
          bg="white"
          boxShadow={useColorModeValue("sm", "sm-dark")}
          borderRadius="lg"
          p={{
            base: "4",
            md: "6",
          }}
        >
          
            
              <Text fontSize="2xl" fontWeight="bold">
                {props.heading}
              </Text>

              <Text fontSize="md" mt="1">
                {props.subheading}
                
                
              </Text>

              <Progress hasStripe value={parseInt(100 * props.remaining[0] / props.remaining[1])} mt="4"/>
              <HStack spacing="1" justify="space-between" mt="2">
                <Text color="blue.600" fontSize="lg" fontWeight="bold">
                  Level {props.level}
                </Text>
                <Text color="blue.600" fontSize="lg" fontWeight="bold">
                  ⚡ {props.remaining[0]} / {props.remaining[1]}
                </Text>
                <Text color="blue.600" fontSize="lg" fontWeight="bold">
                  Level {props.level + 1}
                </Text>
              </HStack>

              
              <HStack spacing="1" justify="space-between" mt="6">
                <Center>
                <Tooltip label="Your most recent scores in this lesson" aria-label='A tooltip'>

                  <Stack
                    direction="row"
                    spacing="5"
                    style={{cursor: "pointer"}}
                  >
                    {props.scores.map(x => (
                      <CircularProgressBar score={2 * x}/>
                    ))}
                    
                  </Stack>
                </Tooltip>
                </Center>
                <Button
                  colorScheme="teal"
                  size="lg"
                  onClick={onStart}
                  variant="solid"
                  rightIcon={<Icon as={MdArrowForward}
                  />}
                >
                  Start lesson
                </Button>
              </HStack>

              
            
            

            
              
            
         
        </Box>
      </Container>
    </Box>
  );
};
