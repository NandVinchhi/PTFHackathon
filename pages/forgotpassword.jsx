import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Image,
  useBreakpointValue,
  Center,
  Box,
  Divider
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { GoogleIcon } from '../components/ProviderIcons'
import { NavbarLanding } from "../components/navbar/NavbarLanding";
import { getAuth, sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth";
import { useRouter } from 'next/router'

export default function App (){
  
  const router = useRouter()
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [stage, setStage] = useState(1);

  useEffect(() => {
    auth.onAuthStateChanged(function(user) {
      if (user && !loading) {
        router.push("/dashboard")
      } 
    });
  }, [])

  
  const onSend = () => {
    setStage(1);
    setLoading(true);
    setErrorMessage("");
    sendPasswordResetEmail(auth, email).then(() => {
      setLoading(false);
      setStage(2);
    }).catch((error) => {
      setLoading(false);
      setErrorMessage(error.message);
    })
    
    
  }


  return (
  <>
  <NavbarLanding/>
  <Divider/>
  
    
  
  <Container
    maxW="md"
    py={{
      base: '12',
      md: '24',
    }}
  >
    <Stack spacing="8">
      <Stack spacing="6">
        <Center mb={3}>
          <Image src="/logo.png" w="40%" h="40%"/>
        </Center>
        <Stack
          spacing={{
            base: '2',
            md: '3',
          }}
          textAlign="center"
        >
          <Heading
            size={"lg"}
            
          >
            Reset your password
          </Heading>
          <Text color="gray.600">We require your email to send a password reset link.</Text>
          
        </Stack>
      </Stack>

      
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" type="email" />
            </FormControl>
            
          </Stack>
          
          <Stack spacing="4">
            <Button onClick={onSend} disabled={loading || email.length == 0} colorScheme="blue">{loading ? "Loading...":"Continue"}</Button>
            <Text fontSize="sm" color="red.500">
              {errorMessage}
            </Text>
            {stage == 2 && (
              <Text fontSize="sm" color="green.500">
                A password reset link has been sent. Please check your email for further instructions.
              </Text>
            )}
            
          </Stack>
        </Stack>
      

      
      
      
      
    </Stack>
  </Container>
  </>
)}