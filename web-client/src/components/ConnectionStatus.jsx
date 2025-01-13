import { Flex, Text, Box } from "@chakra-ui/react";
export function ConnectionStatus({ isConnected }) {
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
