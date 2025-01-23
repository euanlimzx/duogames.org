import {
  VStack,
  Stack,
  Text,
  Image,
  Box,
  Button,
  Flex,
  textDecoration,
} from "@chakra-ui/react";
import { ScreenRecordingBox } from "./components/ScreenRecordingBox";
import { useNavigate } from "react-router";

export function LandingPageSection() {
  let navigate = useNavigate();
  return (
    <>
      <VStack gap={{ base: "2rem", md: "5rem" }} w="80%">
        <Text
          fontSize={{ base: "2xl", md: "4xl" }}
          fontStyle="italic"
          fontWeight={"bold"}
          textAlign={"center"}
        >
          HOW TO GET STARTED
        </Text>
        <Stack
          direction={{ base: "column-reverse", md: "row" }}
          width={"100%"}
          display="flex"
          justifyContent="center"
          gap={{ base: "1rem", md: "5rem" }}
        >
          <Flex flex="1" justifyContent="end">
            <ScreenRecordingBox src="share_screen.gif" title="Your Screen" />
          </Flex>
          <Flex flex="1" alignItems="center">
            <VStack display="flex" alignItems="start">
              {" "}
              <Text
                fontSize={{ base: "2xl", md: "4xl" }}
                fontWeight={"bold"}
                textAlign="start"
                w="100%"
              >
                1. Download our extension
              </Text>
              <Text
                fontSize="2xl"
                display={{ base: "none", md: "block" }}
                w="100%"
              >
                Our extension lets your partner play the games that run on your
                browser
              </Text>
              <Box
                display={{ base: "none", md: "block" }}
                bg="white"
                boxShadow="dark-lg"
                color="black"
                px="2.5rem"
                mt="1.5rem"
                py="1rem"
                borderRadius="1rem"
                border="3px"
                borderColor="black"
                cursor="pointer"
                _hover={{ bgGradient: "radial(white, gray.200)" }}
              >
                <Stack
                  direction={{ base: "column", md: "row" }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Image
                    src="/chrome_web_store.svg"
                    width={"3rem"}
                    marginRight={"0.5rem"}
                  />
                  <Text
                    fontSize="2xl"
                    display={{ base: "none", md: "block" }}
                    fontWeight="bold"
                  >
                    <a
                      href="https://github.com/euanlimzx/websocket"
                      target="_blank"
                    >
                      Get Extension
                    </a>
                  </Text>{" "}
                </Stack>
              </Box>
            </VStack>
          </Flex>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          width={"100%"}
          display="flex"
          justifyContent="center"
          gap={{ base: "1rem", md: "5rem" }}
        >
          <Flex flex="1" alignItems="center">
            <VStack>
              {" "}
              <Text
                fontSize={{ base: "2xl", md: "4xl" }}
                fontWeight={"bold"}
                textAlign="start"
                w="100%"
              >
                2. Visit twoplayergames.org* and share your screen
              </Text>
              <Text
                fontSize="2xl"
                display={{ base: "none", md: "block" }}
                textAlign="start"
                w="100%"
              >
                For the best experience, we'd recommend{" "}
                <a
                  href="https://discord.com/channels/"
                  target="_blank"
                  style={{ "text-decoration": "underline" }}
                >
                  Discord
                </a>{" "}
                or{" "}
                <a href="facetime:" style={{ "text-decoration": "underline" }}>
                  FaceTime
                </a>
              </Text>
              <Text fontSize="xl" display={{ base: "none", md: "block" }}>
                <br />
                *This is currently the only website supported by our extension
                though we do plan to add more in the future. There's some ads
                though, so we'd recommend using an Adblocker!
              </Text>
            </VStack>
          </Flex>
          <Flex flex="1" justifyContent="end">
            <ScreenRecordingBox src="share_screen.gif" title="Your Screen" />
          </Flex>
        </Stack>
        <Stack
          direction={{ base: "column-reverse", md: "row" }}
          width={"100%"}
          display="flex"
          justifyContent="center"
          gap={{ base: "1rem", md: "5rem" }}
        >
          <Flex flex="1" justifyContent="end">
            <ScreenRecordingBox
              src="share_screen.gif"
              title="Your partner's screen"
            />
          </Flex>
          <Flex flex="1" alignItems="center">
            <VStack display="flex" alignItems="start">
              {" "}
              <Text
                fontSize={{ base: "2xl", md: "4xl" }}
                fontWeight={"bold"}
                textAlign="start"
                w="100%"
              >
                3. Have your partner visit our site and create a room code
              </Text>
              <Text
                fontSize="2xl"
                display={{ base: "none", md: "block" }}
                w="100%"
              >
                Inside the room, any keyboard strokes your partner enters on our
                site will be executed on your browser!
              </Text>
            </VStack>
          </Flex>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          width={"100%"}
          display="flex"
          justifyContent="center"
          gap={{ base: "1rem", md: "5rem" }}
        >
          <Flex flex="1" alignItems="center">
            <VStack>
              {" "}
              <Text
                fontSize={{ base: "2xl", md: "4xl" }}
                fontWeight={"bold"}
                textAlign="start"
                w="100%"
              >
                4. Choose a game, click multi-play and enter the room code!
              </Text>
              <Text
                fontSize="2xl"
                display={{ base: "none", md: "block" }}
                textAlign="start"
                w="100%"
              >
                You're all set and ready to play!
              </Text>
            </VStack>
          </Flex>
          <Flex flex="1" justifyContent="end">
            <ScreenRecordingBox
              src="key_in_room_code.gif"
              title="Your Screen"
            />
          </Flex>
        </Stack>
      </VStack>
      <Text textColor="black">
        Made with ❤️ by{" "}
        <Text as="span" hover={{ textDecoration: "underline" }}>
          <a href="https://linkedin.com/in/shawn-wei-chew/" target="_blank">
            Shawn
          </a>
        </Text>{" "}
        &{" "}
        <Text as="span" hover={{ textDecoration: "underline" }}>
          <a href="https://linkedin.com/in/euanlimzx/" target="_blank">
            Euan
          </a>
        </Text>{" "}
      </Text>
    </>
  );
}
