import * as React from "react";
import { NavbarLanding } from "../navbar/NavbarLanding";
import {
    Stack,
    Flex,
    Center,
    Button,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Tab,
} from "@chakra-ui/react";

export const Results = () => {
    return (
        <>
        <NavbarLanding />
        <Center>
          <Stack padding="4" spacing="6" marginTop='3rem'>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th isNumeric>Question</Th>
                            <Th>Your Answer</Th>
                            <Th>Correct Response</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Th>1</Th>
                            <Th>C</Th>
                            <Th>C</Th>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer> 
            <Flex direction={'column'} align='center'>
                <Button w='132px' h='40px' colorScheme={'blue'}>Go Back</Button>
            </Flex>            
          </Stack>
        </Center>
      </>
    );
  };