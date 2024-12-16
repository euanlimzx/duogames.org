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
  useToast,
  extendTheme,
  Spacer,
  Alert,
  AlertTitle,
} from "@chakra-ui/react";
import { KeyBox } from "./components/KeyBox";
import { FaCheckCircle } from "react-icons/fa";

const toastId = "copy-toast";

export default function AppBeta() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [events, setEvents] = useState([]);
  const [roomCode, setRoomCode] = useState(null);
  const [keysPressed, setKeysPressed] = useState({});

  const [keys, setKeys] = useState([]);
  const toast = useToast();

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
          h={{ base: "40vh", md: "70vh" }}
          bg="white"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
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
          <Text>
            <p>How this works:</p>
            <p>1.</p>
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
                    if (!toast.isActive(toastId)) {
                      toast({
                        title: "Room Code Copied!",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                        id: toastId,
                        // containerStyle: {
                        //   width: 10,
                        //   maxWidth: "400px",
                        //   display: "flex",
                        //   justifyContent: "center",
                        //   alignItems: "center",
                        //   padding: 3,
                        // },
                        render: ({ title, onClose }) => (
                          <Box
                            p={2}
                            bg="#2F8559"
                            borderRadius="lg"
                            textAlign="center"
                            marginBottom={5}
                            textColor={"white"}
                          >
                            <Flex
                              alignItems={"center"}
                              justifyContent={"center"}
                              padding={3}
                              gap={7}
                            >
                              <Text fontWeight={700} textAlign={"center"}>
                                {title}
                              </Text>
                              <FaCheckCircle strokeWidth={2} />
                            </Flex>
                          </Box>
                        ),
                      });
                    }
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
