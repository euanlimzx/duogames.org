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
      <VStack>
        <Text
          color="black"
          align="center"
          fontSize={{ base: "3xl", md: "7xl" }}
          fontWeight="bold"
        >
          Free online games for long distance couples ❤️
        </Text>
        <Text
          color="black"
          align="center"
          fontSize="2xl"
          textColor="gray.600"
          maxW="60%"
        >
          <Text>
            Long distance just got alot a little easier (and a lot more fun!)
          </Text>
          <Text>
            Play co-op browser games, even if you're not on the same laptop!
          </Text>
        </Text>
        <Stack
          justifyContent="center"
          alignItems="center"
          direction={{ base: "column", md: "row" }}
          gap={{ base: "0re", md: "1rem" }}
          pt="1rem"
        >
          <Box
            bg="black"
            color="white"
            px="4.5rem"
            py="1rem"
            borderRadius="1rem"
            cursor="pointer"
            _hover={{ bgGradient: "radial(gray.700, black)" }}
            onClick={() => navigate("/game-room")}
            boxShadow="dark-lg"
          >
            <Text fontSize="4xl" fontWeight="bold">
              Create Room
            </Text>
          </Box>
          <Box
            bg="white"
            boxShadow="dark-lg"
            color="black"
            px="2.5rem"
            py="1rem"
            borderRadius="1rem"
            border="3px"
            borderColor="black"
            cursor="pointer"
            _hover={{ bgGradient: "radial(white, gray.200)" }}
          >
            <HStack justifyContent="center" alignItems="center">
              {" "}
              <Text fontSize="4xl" fontWeight="bold">
                Get Extension
              </Text>{" "}
              <TfiNewWindow fontWeight="bold" size="30px" />
            </HStack>
          </Box>
        </Stack>
      </VStack>
      <Flex
        justifyContent="center"
        alignItems="center"
        px="1rem"
        flexDir="column"
        pt="5rem"
      >
        <Image
          src="/gif.gif"
          alt="Demo video of Duogames"
          borderRadius="1rem"
          width="50rem"
          objectFit="cover"
          loading="lazy"
        />
        <Text fontSize="medium" pt="0.5rem" textAlign="center">
          Typically, this game requires a physical, shared keyboard. But here I
          am, playing it online over facetime!
        </Text>
      </Flex>
    </Flex>
  );
}
