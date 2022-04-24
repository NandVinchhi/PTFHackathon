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
import { getAuth, setPersistence, signInWithEmailAndPassword, browserLocalPersistence, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from 'next/router'
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";

export default function App (){
  const provider = new GoogleAuthProvider();
  const db = getFirestore();
  const router = useRouter()
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged(function(user) {
      if (user && !loading) {
        router.push("/dashboard")
      } 
    });
  }, [])

  const onGoogle = () => {
    setLoading(true);
    setErrorMessage("");
    setPersistence(auth, browserLocalPersistence).then(() => {
      signInWithPopup(auth, provider)
        .then((result) => {
          
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          
          const q = query(collection(db, "users"), where("email", "==", user.email));
          
          getDocs(q).then((result) => {
            let final = 0;
            result.forEach((doc) => {
              
              final += 1;
            });
            
            if (final == 0){
            const current = new Date()
              addDoc(collection(db, "users"), {
                email: user.email,
                joined: current.toISOString(),
                points: {alphabets: 0, numbers: 0},
                lastQuiz: {alphabets: 0, numbers: 0}
              }).then(() => {
                
                setLoading(false);
              }).catch((error) => {
                
                console.log(error)
                setLoading(false);
              });
            }

          }).catch((error) => {
            setLoading(false);
            console.log(error)
          })
          
          
          // ...
        }).catch((error) => {
          // Handle Errors here.
          setLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(error.message);
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    })
  }
  
  const onLogin = () => {
    setLoading(true);
    setErrorMessage("");
    setPersistence(auth, browserLocalPersistence).then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          setLoading(false);
          
          const user = userCredential.user;

          // ...
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          setErrorMessage(error.message);
          // ..
        });
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
            Log in to your account
          </Heading>
          <Text color="gray.600">Start learning Indian Sign Language today</Text>
          
        </Stack>
      </Stack>
      <Stack spacing="6">
        <Stack spacing="5">
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" type="email" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="********" type="password" />
          </FormControl>
        </Stack>
        
        <Stack spacing="4">
          <Button onClick={onLogin} disabled={loading || email.length == 0 || password.length == 0} colorScheme="blue">{loading ? "Loading...":"Sign in"}</Button>
          <Text fontSize="sm" color="red.500">
            {errorMessage}
          </Text>
          <HStack>
          <Divider />
          <Text fontSize="sm" color="muted">
            OR
          </Text>
          <Divider />
        </HStack>
          <Button onClick={onGoogle} variant="outline" bg="white" colorScheme="gray" leftIcon={<GoogleIcon boxSize="5" />} iconSpacing="3">
            Continue with Google
          </Button>
        </Stack>
      </Stack>
      <HStack justify="space-between">
          <HStack spacing="1" justify="center">
            <Text fontSize="sm" color="muted">
              Don't have an account?
            </Text>
            <Button variant="link" as="a" href="/signup" colorScheme="blue" size="sm">
              Sign up
            </Button>
          </HStack>
          <Button variant="link" colorScheme="blue" size="sm" as="a" href="/forgotpassword">
            Forgot password
          </Button>
        </HStack>
      
    </Stack>
  </Container>
  </>
)}