import { Flex, Text, Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { socket } from "../socket";
export function ConnectionStatus({ isConnected, setIsConnected }) {
  useEffect(() => {
    const checkConnection = setInterval(() => {
      if (!socket.connected) {
        setIsConnected(false);
      }
      console.log("still alive");
    }, 2000); // 1000ms = 1 second

    return () => {
      clearInterval(checkConnection);
    };
  }, []);
  return (
    <Flex gap={3}>
      <Text color="black" fontSize="2xl">
        Room status:
      </Text>
      {isConnected ? (
        <>
          <Text color="black" fontSize="2xl">
            Connected
          </Text>
          <Box
            width="17px"
            height="17px"
            borderRadius="50%"
            bg="green.400"
            alignSelf="center"
          />
        </>
      ) : (
        <>
          {" "}
          <Text color="black" fontSize="2xl">
            Not connected
          </Text>
          <Box
            width="17px"
            height="17px"
            borderRadius="50%"
            bg="red.400"
            alignSelf="center"
          />
        </>
      )}
    </Flex>
  );
}
