import {
  Flex,
  VStack,
  Text,
  Stack,
  Image,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { TfiNewWindow } from "react-icons/tfi";

export function LandingPageTitle() {
  let navigate = useNavigate();

  return (
    <Flex
      pt={{ base: "5rem", md: "8rem" }}
      bg="white"
      justifyContent="center"
      alignItems="center"
      height={"45rem"}
    >
      <Flex gap="1.5rem">
        <VStack spacing="3rem" flex={1} justify={"space-evenly"}>
          <Text
            color="black"
            align="center"
            fontSize={{ base: "3xl", md: "6xl" }}
            fontWeight="bold"
            px={{ base: "2rem", md: "5rem" }}
            width={"85%"}
          >
            Browser co-op, from the couch to the cloud.
          </Text>
          <Stack
            justifyContent="center"
            alignItems="center"
            direction={{ base: "column", md: "row" }}
            gap={{ base: "0re", md: "1rem" }}
            pt="1rem"
          >
            <Button
              size="lg"
              p={{ base: "1rem", md: "1.75rem" }}
              background="black"
              color="white"
              _hover={{ bg: "gray.700" }}
              onClick={() => navigate("/game-room")}
              width={"15rem"}
            >
              <Text fontSize={{ base: "lg", md: "1xl" }} fontWeight="semibold">
                Generate Room Code
              </Text>
            </Button>
            <Button
              size="lg"
              p={{ base: "1rem", md: "1.75rem" }}
              _hover={{ bg: "gray.200" }}
              width={"15rem"}
            >
              <Flex
                justify={"space-evenly"}
                alignContent={"center"}
                gap={"1rem"}
              >
                <Text>Download Extension</Text>
                <TfiNewWindow />
              </Flex>
              {/* this should have a popup icon that says get our accompanying extension */}
            </Button>
          </Stack>
        </VStack>
        <Flex
          justifyContent="center"
          alignItems="center"
          px="1rem"
          flexDir="column"
          flex={1}
        >
          <Image
            src="/gif.gif"
            alt="Demo video of Duogames"
            borderRadius="1rem"
            width="40rem"
            objectFit="cover"
            loading="lazy"
          />
          <Text fontSize="small" pt="0.5rem" textAlign="center">
            Typically, this game requires a physical, shared keyboard. But here
            I am, playing it online over facetime!
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
