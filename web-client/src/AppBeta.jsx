import { useState, useEffect } from "react";
import { socket } from "./socket";
import { Text, Box, Flex, Button, VStack, useToast } from "@chakra-ui/react";
import { KeyBox } from "./components/KeyBox";
import { RoomCode } from "./components/RoomCode";
import CustomSuccessToast from "./components/CustomSuccessToast";
import { ConnectionStatus } from "./components/ConnectionStatus";

const userJoinToastId = "user-toast";

export default function AppBeta() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [events, setEvents] = useState([]);
  const [roomCode, setRoomCode] = useState(null);
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [keysPressed, setKeysPressed] = useState({});
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);

  const [keys, setKeys] = useState([]);
  const newUserToast = useToast();

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      setRoomCode(socket.id);
      console.log(socket.id);
      socket.emit("join-room", socket.id);
    }

    function onDisconnect() {
      setIsConnected(false);
      setRoomCode(null);
      setJoinedRoom(false);
      setEvents([]);
    }

    function onKeystroke(keyEvent) {
      const value = `keystroke received: ${keyEvent.keyDir} ${keyEvent.keyCode}`;

      if (keyEvent.keyDir === "keyup") {
        setKeys((prev) => [
          ...prev,
          {
            key: keyEvent.keyCode,
            // need to add a math.random here instead of the current time just in case the same key was pressed at the same time
            id: `${keyEvent.timestamp}_${Math.floor(Math.random() * 100) + 1}_${
              keyEvent.keyCode
            }`,
          },
        ]);
      }

      setEvents((previous) => [...previous, value]);
    }

    function onRoomUpdate(update) {
      setEvents((previous) => [...previous, update]);
      // since the actual user being in the room counts as 1, update that a new user has joined the room only when there is > 1 user
      console.log(update, socket, update.roomId === socket.id);
      // TODO: need to set a cap on the number of new user banners that appear since multiple users can join at the same time
      if (
        // update.socketId === socket.id &&
        update.newUser &&
        update.numberOfUsers > 1 &&
        !newUserToast.isActive(userJoinToastId)
      ) {
        newUserToast({
          title: "New User Joined!",
          status: "success",
          duration: 1500,
          isClosable: true,
          id: userJoinToastId,
          render: ({ title }) => <CustomSuccessToast title={title} />,
        });

        setNumberOfPlayers(update.numberOfUsers);
      } else if (update.roomId === socket.id && update.userDisconnected) {
        console.log("A user has disconnected");
        setNumberOfPlayers((numPlayers) => numPlayers - 1);
      }
    }

    const handleKeyDown = (event) => {
      if (!keysPressed[event.key]) {
        setKeysPressed((prev) => ({ ...prev, [event.key]: true }));

        // // make the assumption that no one would hold down the key
        // // which I can optionally handle later as well

        socket.emit(
          "keystroke",
          { keyDir: "keydown", keyCode: event.key, timestamp: event.timeStamp },
          roomCode
        );
      }
    };

    // Handle keyup event
    const handleKeyUp = (event) => {
      setKeysPressed((prev) => ({ ...prev, [event.key]: false }));
      socket.emit(
        "keystroke",
        { keyDir: "keyup", keyCode: event.key, timestamp: event.timeStamp },
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
              setNumberOfPlayers(1);
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
                <a
                  href="https://github.com/euanlimzx/websocket"
                  target="_blank"
                >
                  here
                </a>
              </Text>
            </p>
            <p>
              3. Play any game from{" "}
              <Text
                as="span"
                textDecoration="underline"
                textUnderlineOffset="3px"
              >
                <a
                  href="https://www.twoplayergames.org/game/basket-random"
                  target="_blank"
                >
                  twoplayergames.org
                </a>
              </Text>
              {""} and click 'Multi-play!'
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
            <Text
              color="black"
              fontSize="4xl"
              fontWeight="semibold"
              px="5rem"
              textAlign="center"
            >
              Your room code:
            </Text>
            <RoomCode roomCode={roomCode} onDisconnect={onDisconnect} />
          </VStack>
          <Box mt={12}>
            <ConnectionStatus
              isConnected={isConnected}
              setIsConnected={setIsConnected}
            />
            <Flex gap={3}>
              <Text color="black" fontSize="2xl">
                Number of players in room:
              </Text>
              <Text color="black" fontSize="2xl" fontWeight="semibold">
                {numberOfPlayers}
              </Text>
            </Flex>
          </Box>
          <Box marginTop={5} overflowX={"hidden"} padding={10} width={"87.5%"}>
            <Flex gap={3} justifyContent={"center"}>
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
          </Box>
        </Flex>
      )}
    </div>
  );
}
