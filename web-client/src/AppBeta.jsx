import { useState, useEffect } from "react";
import { socket } from "./socket";
import { Events } from "./components/Events";
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
import { KeyBox } from "./components/KeyBox";

export default function AppBeta() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [events, setEvents] = useState([]);
  const [roomCode, setRoomCode] = useState(null);
  const [keysPressed, setKeysPressed] = useState({});

  const [keys, setKeys] = useState([]);

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
      console.log(keyEvent);

      if (keyEvent.keyDir === "keyup") {
        const pressedKey = String.fromCharCode(keyEvent.keyCode);
        const keyStrokeId = `${Date.now()}_${pressedKey}`;
        setKeys((prev) => [...prev, { key: pressedKey, id: keyStrokeId }]);
      }

      setEvents((previous) => [...previous, value]);
    }

    function onRoomUpdate(update) {
      setEvents((previous) => [...previous, update]);
    }

    const handleKeyDown = (event) => {
      if (!keysPressed[event.key]) {
        setKeysPressed((prev) => ({ ...prev, [event.key]: true }));

        // // make the assumption that no one would hold down the key
        // // which I can optionally handle later as well

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
  }, [roomCode, keysPressed, keys]);

  return (
    <div className="App">
      {!roomCode && (
        <Flex
          mt={{ base: "5rem", md: "10rem" }}
          bg="white"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          p="1.5rem"
        >
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
          <Text
            fontSize="large"
            pt="1.5rem"
            fontWeight="semibold"
            maxW={{ base: "80%", md: "40%" }}
            lineHeight="2rem"
          >
            <p>How this works:</p>
            <p>1. Video call your friend and get them to share their screen!</p>
            <p>
              2. The party sharing their screen should also download our chrome
              extension, which can be found{" "}
              <Text
                as="span"
                textDecoration="underline"
                textUnderlineOffset="3px"
              >
                <a href="">here</a>
              </Text>
            </p>
            <p>
              3. Play any game from{" "}
              <Text
                as="span"
                textDecoration="underline"
                textUnderlineOffset="3px"
              >
                <a href="">twoplayergames.org</a>
              </Text>
            </p>
            <p>4. Generate a room code and play away!</p>
          </Text>
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
          {/* <Box maxH="400px" overflow="scroll">
            <Events events={events} />
          </Box> */}
          {/* Todo: deal with key overflow */}
          <Flex gap={3} marginTop={10}>
            {keys.map(({ key, id }) => (
              // pass in identifier so the child component knows which element to remove from the array
              <KeyBox
                inputKey={key}
                key={id}
                boxIdentifier={id}
                setKeys={setKeys}
              />
            ))}
          </Flex>
        </Flex>
      )}
    </div>
  );
}
