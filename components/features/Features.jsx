import { Box, SimpleGrid, Heading, Center } from '@chakra-ui/react'
import * as React from 'react'
import { FaRocket, FaFileAlt, FaChartLine, FaLaugh } from 'react-icons/fa'
import { Feature } from './Feature'

export const Features = () => (
  <Box
    as="section"
    maxW="5xl"
    mx="auto"
    py="12"
    px={{
      base: '6',
      md: '8',
    }}
  >
    <Center mt="3" mb="8">
      <Heading size="xl">How it works</Heading>
    </Center>
    
    <SimpleGrid
      columns={{
        base: 1,
        md: 2,
      }}
      spacingX="10"
      spacingY={{
        base: '8',
        md: '14',
      }}
    >
      <Feature title="Powered by AI" icon={<FaRocket style={{color: "2B6CB0"}} />}>
        EasySign uses camera AI to provide real-time feedback on your sign language.
      </Feature>
      <Feature title="Content tailored to your needs" icon={<FaFileAlt style={{color: "2B6CB0"}} />}>
        We provide curated quizzes at various levels to help you learn interactively.
      </Feature>
      <Feature title="Comprehensive analytics" icon={<FaChartLine style={{color: "2B6CB0"}} />}>
        EasySign's dashboard provides essential insights into your progress over time.
      </Feature>
      <Feature title="Free for everyone" icon={<FaLaugh style={{color: "2B6CB0"}} />}>
        Our goal is to help the community by leveraging cutting edge technology. EasySign is free for unlimited use.
      </Feature>
    </SimpleGrid>
  </Box>
)