import { useState, useEffect } from "react";
import { socket } from "./socket";
import { Events } from "./components/events";
import {
  Text,
  HStack,
  Box,
  Stack,
  Flex,
  Button,
  VStack,
  Tooltip,
} from "@chakra-ui/react";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [events, setEvents] = useState([]);
  const [roomCode, setRoomCode] = useState(null);
  const [keysPressed, setKeysPressed] = useState({});

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      setRoomCode(socket.id);
      console.log(roomCode);
      socket.emit("join-room", roomCode);
    }

    function onDisconnect() {
      setIsConnected(false);
      setRoomCode(null);
      setEvents([]);
    }

    function onKeystroke(keyEvent) {
      const value = `keystroke received: ${keyEvent.keyDir} ${keyEvent.keyCode}`;
      setEvents((previous) => [...previous, value]);
    }

    function onRoomUpdate(update) {
      setEvents((previous) => [...previous, update]);
    }

    const handleKeyDown = (event) => {
      if (!keysPressed[event.key]) {
        setKeysPressed((prev) => ({ ...prev, [event.key]: true }));
        socket.emit(
          "keystroke",
          { keyDir: "keydown", keyCode: event.keyCode },
          roomCode
        );
      }
    };

    // Handle keyup event
    const handleKeyUp = (event) => {
      setKeysPressed((prev) => ({ ...prev, [event.key]: false }));
      socket.emit(
        "keystroke",
        { keyDir: "keyup", keyCode: event.keyCode },
        roomCode
      );
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("keystroke", onKeystroke);
    socket.on("room-status", onRoomUpdate);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("keystroke", onKeystroke);
      socket.off("room-status", onRoomUpdate);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [roomCode, keysPressed]);

  return (
    <div className="App">
      {!roomCode && (
        <Flex
          h={{ base: "40vh", md: "70vh" }}
          bg="white"
          justifyContent="center"
          alignItems="center"
        >
          <VStack gap="1.5rem">
            <Text color="black" fontSize="5xl" fontWeight="semibold" px="5rem">
              Play local multiplayer games, online.
            </Text>
            <Button
              size="xl"
              borderRadius="5rem"
              p="1.75rem"
              onClick={() => {
                socket.connect();
              }}
              background="black"
              color="white"
              _hover={{ bg: "gray.700" }}
            >
              <Text fontSize="2xl" fontWeight="semibold">
                Generate room code
              </Text>
            </Button>
          </VStack>
        </Flex>
      )}
      {roomCode && (
        <Flex
          h="30vh"
          bg="white"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
        >
          <VStack>
            <Text color="black" fontSize="4xl" fontWeight="semibold" px="5rem">
              Your room code:
            </Text>
            <Stack direction={{ base: "column", md: "row" }} gap="1.5rem">
              <Tooltip label="Click to copy">
                <Text
                  color="black"
                  borderRadius="1rem"
                  fontSize="5xl"
                  fontWeight="semibold"
                  mx="2rem"
                  px="1rem"
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                  onClick={() => {
                    navigator.clipboard.writeText(roomCode);
                  }}
                >
                  {roomCode}
                </Text>
              </Tooltip>
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
          </VStack>
          <Box maxH="400px" overflow="scroll">
            <Events events={events} />
          </Box>
        </Flex>
      )}
    </div>
  );
}
