import { Text, Flex, VStack } from "@chakra-ui/react";

export default function App() {
  return (
    <div className="App">
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
        </VStack>
      </Flex>
      x
    </div>
  );
}
