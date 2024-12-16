import {
  Text,
  Flex,
  VStack,
  Button,
  Box,
  Stack,
  Image,
} from "@chakra-ui/react";

export default function App() {
  return (
    <div className="App">
      <Flex
        pt={{ base: "5rem", md: "8rem" }}
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
            Browser co-op, from the couch to the cloud.
          </Text>
          <Flex
            justifyContent="center"
            alignItems="center"
            px="1rem"
            flexDir="column"
          >
            <Image
              src="/gif.gif"
              alt="Demo video of Duogames"
              borderRadius="1rem"
              width="40rem"
              objectFit="cover"
            />
            <Text fontSize="small" pt="0.5rem" textAlign="center">
              Typically, this game requires a physical, shared keyboard. But
              here I am, playing it online over facetime!
            </Text>
          </Flex>
          <Stack
            justifyContent="center"
            alignItems="center"
            direction={{ base: "column", md: "row" }}
            gap={{ base: "0re", md: "1rem" }}
            pt="1rem"
          >
            <Button
              size="xl"
              borderRadius={{ base: "2.5rem", md: "5rem" }}
              p={{ base: "1rem", md: "1.75rem" }}
              background="black"
              color="white"
              _hover={{ bg: "gray.700" }}
            >
              <Text fontSize={{ base: "1xl", md: "2xl" }} fontWeight="semibold">
                <a
                  target="_blank"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSf14A09-qgbGKrO9QF1HGemr-vJG27ebPAoNKXICcYYd0KQqA/viewform?usp=dialog"
                >
                  {" "}
                  Notify me when we launch!
                </a>
              </Text>
            </Button>
            <Text
              textAlign="center"
              pt="1rem"
              fontWeight="semibold"
              _hover={{ textDecoration: "underline" }}
            >
              <a href="/beta">Or, try out the beta</a>
            </Text>
          </Stack>
        </VStack>
      </Flex>
    </div>
  );
}
