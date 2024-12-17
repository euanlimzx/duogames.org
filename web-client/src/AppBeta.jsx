import { useState, useEffect } from "react";
import { socket } from "./socket";
import { Text, Stack, Flex, Button, VStack } from "@chakra-ui/react";
import { KeyBox } from "./components/KeyBox";
import { RoomCode } from "./components/RoomCode";

export default function AppBeta() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [events, setEvents] = useState([]);
  const [roomCode, setRoomCode] = useState(null);
  const [joinedRoom, setJoinedRoom] = useState(false);
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
      setJoinedRoom(false);
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
      {!joinedRoom && (
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
              setJoinedRoom(true); //todo @euan error handle this
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
      {joinedRoom && (
        <Flex
          bg="white"
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          pt="5rem"
        >
          <VStack>
            <Text color="black" fontSize="4xl" fontWeight="semibold" px="5rem">
              Your room code:
            </Text>
            <RoomCode roomCode={roomCode} />
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
