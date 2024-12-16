import { Text, Flex, VStack, Button } from "@chakra-ui/react";

export default function App() {
  return (
    <div className="App">
      <Flex
        h={{ base: "60vh", md: "75vh" }}
        bg="white"
        justifyContent="center"
        alignItems="center"
      >
        <VStack gap="1.5rem">
          <Text
            color="black"
            align="center"
            fontSize={{ base: "3xl", md: "6xl" }}
            fontWeight="semibold"
            px={{ base: "2rem", md: "5rem" }}
          >
            Play local multiplayer games, online.
          </Text>
          <Button
            size="xl"
            borderRadius={{ base: "2.5rem", md: "5rem" }}
            p={{ base: "1rem", md: "1.75rem" }}
            background="black"
            color="white"
            _hover={{ bg: "gray.700" }}
          >
            <Text fontSize={{ base: "1xl", md: "2xl" }} fontWeight="semibold">
              Notify me when we launch!
            </Text>
          </Button>
        </VStack>
      </Flex>
    </div>
  );
}
