import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  SimpleGrid,
  Stack,
  Text,
  Image
} from '@chakra-ui/react'
import * as React from 'react'

import { links } from './_data'

export const Footer = () => (
  <Box bg="gray.50" px={{xl: "200px", base: 8}}>
    
      <Stack
        justify="space-between"
        align="start"
        direction={{
          base: 'column',
          lg: 'row',
        }}
        py={{
          base: '12',
          md: '16',
        }}
        spacing="8"
      >
        <Stack
          spacing={{
            base: '6',
            md: '8',
          }}
          align="start"
        >
          <Image src="/logo.png" h="8"></Image>
          <Text color="muted">Created by Nand Vinchhi, Advik Kabra, and Pranav Goyal.</Text>
        </Stack>
        <SimpleGrid
          columns={{base: 2, md: 3}}
          gap="0"
          width={{
            base: 'full',
            lg: 'auto',
          }}
        >
          {links.map((group, idx) => (
            <Stack
              key={idx}
              spacing="4"
              minW={{
                lg: '40',
              }}
            >
              <Text fontSize="sm" mt={{base: 6, md: 0}} fontWeight="semibold" color="subtle">
                {group.title}
              </Text>
              <Stack spacing="3" shouldWrapChildren>
                {group.links.map((link, idx) => (
                  <Button key={idx} as="a" variant="link" href={link.href}>
                    {link.label}
                  </Button>
                ))}
              </Stack>
            </Stack>
          ))}
        </SimpleGrid>
      </Stack>
      <Divider />
      <Stack
        pt="8"
        pb="12"
        justify="space-between"
        direction={{
          base: 'column-reverse',
          md: 'row',
        }}
        align="center"
      >
        <Text fontSize="sm" color="subtle">
          &copy; {new Date().getFullYear()} EasySign, All rights reserved.
        </Text>
        
      </Stack>
    
  </Box>
)