import {
  Text,
  useToast,
  Tooltip,
  Box,
  Flex,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { socket } from "../socket";
import CustomSuccessToast from "./CustomSuccessToast";
export function RoomCode({ roomCode }) {
  const toastId = "copy-toast";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const SOCKET_ID_LENGTH = 20;
  function getRandomLetter() {
    const randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
  }
  const [code, setCode] = useState(
    [...Array(SOCKET_ID_LENGTH)].map(getRandomLetter)
  );

  const toast = useToast();

  useEffect(() => {
    let iteration = 0;
    let interval = null;
    function scrambleText() {
      interval = setInterval(() => {
        setCode((code) =>
          code.map((letter, index) => {
            if (roomCode && index <= iteration) {
              return roomCode.split("")[index];
            } else {
              return getRandomLetter();
            }
          })
        );
        if (roomCode) {
          iteration += 4 / 3;
        }
        if (iteration >= SOCKET_ID_LENGTH) {
          clearInterval(interval);
        }
      }, 50);
    }
    scrambleText();
    return () => clearInterval(interval);
  }, [roomCode]);

  return (
    <Stack direction={{ base: "column", md: "row" }} gap="1.5rem">
      <Box w={{ base: "100vw", md: "55vw" }}>
        <Tooltip label="Click to copy">
          <Text
            color="black"
            borderRadius="1rem"
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="semibold"
            textAlign="center"
            mx="2rem"
            px="1rem"
            cursor="pointer"
            _hover={{ bg: "gray.100" }}
            onClick={() => {
              if (roomCode) {
                navigator.clipboard.writeText(roomCode);
                if (!toast.isActive(toastId)) {
                  toast({
                    title: "Room Code Copied!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    id: toastId,
                    render: ({ title }) => <CustomSuccessToast title={title} />,
                  });
                }
              }
            }}
          >
            {code.join("")}
          </Text>
        </Tooltip>
      </Box>

      <Button
        size="xl"
        borderRadius="5rem"
        p="1.75rem"
        mx={{ base: "3rem", md: "0rem" }}
        onClick={() => {
          socket.disconnect();
        }}
        background="black"
        color="white"
        _hover={{ bg: "gray.700" }}
      >
        <Text fontSize="2xl" fontWeight="semibold">
          Disconnect
        </Text>
      </Button>
    </Stack>
  );
}
