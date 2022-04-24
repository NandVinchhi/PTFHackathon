import * as React from "react";
import {
  Stack,
  Text,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";

export const CircularProgressBar = (props) => {
  return (
    <Stack spacing="1">
      
      <CircularProgress value={props.score}>
        <CircularProgressLabel>{props.score}</CircularProgressLabel>
      </CircularProgress>
    </Stack>
  );
};
