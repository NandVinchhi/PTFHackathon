import {
  Box,
  Button,
  Heading,
  Img,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import { HiPlay } from 'react-icons/hi'
import { NavbarLanding } from '../components/navbar/NavbarLanding.jsx'
import { Features } from "../components/features/Features.jsx"
import { Footer } from "../components/footer/Footer.jsx";
import { useRouter } from 'next/router'
import { getAuth } from "firebase/auth"

export default function App() {
  const router = useRouter()
  const auth = getAuth();

  useEffect(() => {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        router.push("/dashboard")
      } 
    });
  }, [])

  return (
    <>

    <NavbarLanding/>
    <Box as="section" bg={mode('gray.50', 'gray.800')} pt="16" pb="24">
      <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={{ base: '3rem', lg: '2rem' }}
          mt="8"
          align={{ lg: 'center' }}
          justify="space-between"
        >
          <Box flex="1" maxW={{ lg: '520px' }}>
            
            <Heading
              as="h1"
              size="2xl"
              color={mode('blue.600', 'blue.300')}
              mt="8"
              fontWeight="800"
              
            >
              #1 AI Platform to Learn Indian Sign Language.
            </Heading>
            <Text color={mode('gray.600', 'gray.400')} mt="4" fontSize="lg" fontWeight="medium">
              We pair AI technology with curated materials to ensure the best possible learning experience.
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing="4" mt="8">
              <Button as="a" href="/signup" size="lg" minW="210px" colorScheme="blue" height="14" px="8">
                Sign Up to Get Started
              </Button>
              
            </Stack>
            <Text mt="8" color={mode('gray.600', 'gray.400')}>
              Already have an account?{' '}
              <Link href="/login" textDecoration="underline">
                Log in
              </Link>
            </Text>
          </Box>
          <Box pos="relative" w={{ base: 'full', lg: '650px' }} h={{ base: 'auto' }}>
            <Img
              w="full"
              pos="relative"
              zIndex="1"
              h={{ lg: '100%' }}
              objectFit="cover"
              src="/laptop.png"
              alt="Screening talent"
            />
            
          </Box>
        </Stack>
      </Box>
      
    </Box>
    <Features/>
    <Footer/>

    </>
  )
}