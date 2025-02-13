import {
  Flex,
  VStack,
  Text,
  Stack,
  Image,
  Button,
  Box,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { TfiNewWindow } from "react-icons/tfi";

export function LandingPageTitle() {
  let navigate = useNavigate();

  return (
    <Flex
      pt={{ base: "5rem", md: "6rem" }}
      bg="white"
      flexDirection="column"
      justifyContent="center"
    >
      <VStack px={{ base: "2rem", md: "" }}>
        <Text
          color="black"
          align="center"
          fontSize={{ base: "3xl", md: "6xl", "2xl": "7xl" }}
          w={{ base: "", md: "70%", "2xl": "100%" }}
          fontWeight="bold"
        >
          Free online games for long distance couples ❤️
        </Text>
        <Text
          color="black"
          align="center"
          fontSize={{ base: "lg", md: "2xl" }}
          textColor="gray.600"
          maxW={{ base: "90%", md: "60%" }}
        >
          <Text>
            Long distance just got a little easier (and a lot more fun!)
          </Text>
          <Text>
            Play co-op browser games, even if you're not on the same laptop!
          </Text>
        </Text>
        <Stack
          justifyContent="center"
          alignItems="center"
          direction={{ base: "column", md: "row" }}
          gap={{ base: "0.75rem", md: "1rem" }}
          pt="1rem"
        >
          <Box
            bg="black"
            color="white"
            px={{ base: "4rem", md: "4.5rem" }}
            py="1rem"
            borderRadius="1rem"
            borderWidth="3px"
            borderStyle="solid"
            borderColor="black"
            cursor="pointer"
            _hover={{ bgGradient: "radial(gray.700, black)" }}
            onClick={() => navigate("/game-room")}
            boxShadow={{ base: "lg", md: "dark-lg" }}
          >
            <Text
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              fontWeight="bold"
            >
              Create Room
            </Text>
          </Box>
          <Box
            bg="white"
            boxShadow={{ base: "", md: "dark-lg" }}
            color="black"
            px="2.5rem"
            py="1rem"
            borderWidth="3px"
            borderStyle="solid"
            borderColor="gray.300"
            borderRadius="1rem"
            cursor="pointer"
            _hover={{ bgGradient: "radial(white, gray.200)" }}
          >
            <HStack justifyContent="center" alignItems="center">
              {" "}
              <Text
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                fontWeight="bold"
              >
                <a
                  href="https://chromewebstore.google.com/detail/duogames/menhjppgdgkbmeabgkpdmkemaljmehoa"
                  target="_blank"
                >
                  Get Extension
                </a>
              </Text>{" "}
              <TfiNewWindow fontWeight="bold" size="30px" />
            </HStack>
          </Box>
        </Stack>
      </VStack>
      <Flex
        justifyContent="center"
        alignItems="center"
        px={{ base: "2.5rem", md: "1rem" }}
        flexDir="column"
        pt={{ base: "2.25rem", md: "5rem" }}
      >
        <Image
          src="/gif.gif"
          alt="Demo video of Duogames"
          borderRadius="1rem"
          width="50rem"
          objectFit="cover"
          loading="lazy"
        />
        <Text
          fontSize={{ base: "sm", md: "medium" }}
          pt="0.5rem"
          textAlign="center"
        >
          Typically, this game requires a physical, shared keyboard. But we are,
          playing it online over discord!
        </Text>
      </Flex>
    </Flex>
  );
}
