import {
  VStack,
  HStack,
  Text,
  Image,
  Box,
  Button,
  Flex,
} from "@chakra-ui/react";
import { ScreenRecordingBox } from "./components/ScreenRecordingBox";
import { useNavigate } from "react-router";

export function LandingPageSection() {
  let navigate = useNavigate();
  return (
    <>
      <VStack gap="5rem" w="80%">
        <Text
          fontSize={"4xl"}
          fontStyle="italic"
          fontWeight={"bold"}
          textAlign={"center"}
        >
          HOW TO GET STARTED
        </Text>
        <HStack
          width={"100%"}
          display="flex"
          justifyContent="center"
          gap="5rem"
        >
          <Flex flex="1" justifyContent="end">
            <ScreenRecordingBox src="share_screen.gif" title="Your Screen" />
          </Flex>
          <Flex flex="1">
            <VStack display="flex" alignItems="start">
              {" "}
              <Text
                fontSize={"4xl"}
                fontWeight={"bold"}
                textAlign="start"
                w="100%"
              >
                1. Download our extension
              </Text>
              <Text fontSize="2xl" w="100%">
                Our extension lets your partner play the games that run on your
                browser
              </Text>
              <Box
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
                <HStack justifyContent="center" alignItems="center">
                  <Image
                    src="/chrome_web_store.svg"
                    width={"3rem"}
                    marginRight={"0.5rem"}
                  />
                  <Text fontSize="2xl" fontWeight="bold">
                    Get Extension
                  </Text>{" "}
                </HStack>
              </Box>
            </VStack>
          </Flex>
        </HStack>
        <HStack
          width={"100%"}
          display="flex"
          justifyContent="center"
          gap="5rem"
        >
          <Flex flex="1">
            <VStack>
              {" "}
              <Text
                fontSize={"4xl"}
                fontWeight={"bold"}
                textAlign="start"
                w="100%"
              >
                2. Visit twoplayergames.org* and share your screen
              </Text>
              <Text fontSize="2xl" textAlign="start" w="100%">
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
              <Text fontSize="xl">
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
        </HStack>
        <HStack
          width={"100%"}
          display="flex"
          justifyContent="center"
          gap="5rem"
        >
          <Flex flex="1" justifyContent="end">
            <ScreenRecordingBox
              src="share_screen.gif"
              title="Your partner's screen"
            />
          </Flex>
          <Flex flex="1">
            <VStack display="flex" alignItems="start">
              {" "}
              <Text
                fontSize={"4xl"}
                fontWeight={"bold"}
                textAlign="start"
                w="100%"
              >
                3. Have your partner visit our site and create a room code
              </Text>
              <Text fontSize="2xl" w="100%">
                Inside the room, any keyboard strokes your partner enters on our
                site will be executed on your browser!
              </Text>
            </VStack>
          </Flex>
        </HStack>
        <HStack
          width={"100%"}
          display="flex"
          justifyContent="center"
          gap="5rem"
        >
          <Flex flex="1">
            <VStack>
              {" "}
              <Text
                fontSize={"4xl"}
                fontWeight={"bold"}
                textAlign="start"
                w="100%"
              >
                4. Choose a game, click multi-play and enter the room code!
              </Text>
              <Text fontSize="2xl" textAlign="start" w="100%">
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
        </HStack>
        <HStack width={"100%"} display="flex" justifyContent="center">
          <Flex flex="1" justifyContent="end" paddingRight="3rem">
            <ScreenRecordingBox
              src="share_screen.gif"
              title="Partner's Screen"
            />
          </Flex>
          <Flex flex="1">
            <VStack paddingLeft={"3rem"}>
              {" "}
              <Text fontSize={"4xl"} fontWeight={"bold"} textAlign="start">
                Visit twoplayergames.org and share your screen
              </Text>
              <Text fontSize="2xl">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias
                magnam, non qui sint dolores asperiores reiciendis, quia earum
                harum recusandae ducimus porro soluta iste eveniet eligendi
                natus! Nemo, non illo.
              </Text>
            </VStack>
          </Flex>
        </HStack>
      </VStack>
    </>
  );
}

// <HStack gap={"15rem"} width={"80%"}>
//   <ScreenRecordingBox src="share_screen.gif" title="Partner's Screen" />
//   <VStack paddingRight={"1rem"}>
//     <Text fontSize={"xl"} fontWeight={"bold"}>
//       2. Get your partner to start screen sharing
//     </Text>
//     <Text width={"20rem"} textAlign={"center"}>
//       For the best experience, we'd recommend{" "}
//       <a
//         href="https://discord.com/channels/"
//         target="_blank"
//         style={{ "text-decoration": "underline" }}
//       >
//         Discord
//       </a>{" "}
//       or{" "}
//       <a href="facetime:" style={{ "text-decoration": "underline" }}>
//         FaceTime
//       </a>
//     </Text>
//   </VStack>
// </HStack>
// <HStack gap={"15rem"} width={"80%"}>
//   <VStack gap={"2rem"} paddingX={"1rem"} alignContent={"center"}>
//     <Text fontSize={"xl"} fontWeight={"bold"} textAlign={"center"}>
//       3. Create your Duogames room
//     </Text>
//     <Button
//       size="lg"
//       p={{ base: "0.5rem", md: "1.5rem" }}
//       background="black"
//       borderRadius={"xl"}
//       color="white"
//       _hover={{ bg: "gray.700" }}
//       onClick={() => navigate("/game-room")}
//       width={"15rem"}
//     >
//       <Text fontSize={{ base: "lg", md: "1xl" }} fontWeight="semibold">
//         Get Room Code !!!
//       </Text>
//     </Button>
//   </VStack>
//   <ScreenRecordingBox
//     src={"key_in_room_code.gif"}
//     title="Your Screen"
//   />
// </HStack>
// <HStack gap={"15rem"} width={"80%"}>
//   <ScreenRecordingBox
//     src={"key_in_room_code.gif"}
//     title="Partner's Screen"
//   />

//   <VStack paddingRight={"1rem"}>
//     <Text fontSize={"xl"} fontWeight={"bold"} textAlign={"center"}>
//       4. Get your partner to join the room
//     </Text>
//     <Text width={"20rem"} textAlign={"center"}>
//       Pop the code into your partner's Duogames extension and start
//       playing together!
//     </Text>
//   </VStack>
// </HStack>
