import { VStack, HStack, Text, Image, Box, Button } from "@chakra-ui/react";
import { LandingPageTitle } from "./components/LandingPageTitle";
import { ScreenRecordingBox } from "./components/ScreenRecordingBox";
import { DuoNavBar } from "./components/DuoNavBar";
import { useRef } from "react";
import { useNavigate } from "react-router";

export default function App() {
  const setupSection = useRef(null);
  let navigate = useNavigate();
  return (
    <div className="App">
      <DuoNavBar
        setupRef={setupSection}
        isLanding={true}
        handleLogoClick={() => navigate("/")}
      />
      <Box marginBottom={"10rem"}>
        <VStack gap={"8rem"}>
          <LandingPageTitle />
          <Text
            fontSize={"4xl"}
            fontWeight={"bold"}
            textAlign={"center"}
            ref={setupSection}
          >
            Set Up Duogames
          </Text>
          <HStack gap={"15rem"} width={"80%"} justifyContent={"space-between"}>
            <Text fontSize={"xl"} fontWeight={"bold"} paddingLeft={"1rem"}>
              1. Have your partner install our Chrome Extension
            </Text>
            <Box paddingRight={"1rem"}>
              <a href="https://google.com" target="_blank">
                <Button
                  size="lg"
                  px={{ base: "1rem", md: "1.75rem" }}
                  py={"2.5rem"}
                  background="black"
                  color="white"
                  _hover={{ bg: "gray.700" }}
                  width={"23rem"}
                >
                  <HStack gap={"3rem"}>
                    <Image
                      src="/chrome_web_store.svg"
                      width={"3rem"}
                      marginRight={"0.5rem"}
                    />
                    <Text color={"white"} fontWeight={"bold"}>
                      Add to Chrome
                    </Text>
                  </HStack>
                </Button>
              </a>
            </Box>
          </HStack>

          <HStack gap={"15rem"} width={"80%"} justifyContent={"space-between"}>
            <ScreenRecordingBox
              src="share_screen.gif"
              title="Partner's Screen"
            />
            <VStack paddingRight={"1rem"}>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                2. Get your partner to start screen sharing
              </Text>
              <Text width={"20rem"} textAlign={"center"}>
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
            </VStack>
          </HStack>

          <HStack gap={"15rem"} width={"80%"} justifyContent={"space-between"}>
            <VStack gap={"2rem"} paddingX={"1rem"} alignContent={"center"}>
              <Text fontSize={"xl"} fontWeight={"bold"} textAlign={"center"}>
                3. Create your Duogames room
              </Text>
              <Button
                size="lg"
                p={{ base: "0.5rem", md: "1.5rem" }}
                background="black"
                borderRadius={"xl"}
                color="white"
                _hover={{ bg: "gray.700" }}
                onClick={() => navigate("/game-room")}
                width={"15rem"}
              >
                <Text
                  fontSize={{ base: "lg", md: "1xl" }}
                  fontWeight="semibold"
                >
                  Get Room Code !!!
                </Text>
              </Button>
            </VStack>
            <ScreenRecordingBox
              src={"key_in_room_code.gif"}
              title="Your Screen"
            />
          </HStack>

          <HStack gap={"15rem"} width={"80%"} justifyContent={"space-between"}>
            <ScreenRecordingBox
              src={"key_in_room_code.gif"}
              title="Partner's Screen"
            />

            <VStack paddingRight={"1rem"}>
              <Text fontSize={"xl"} fontWeight={"bold"} textAlign={"center"}>
                4. Get your partner to join the room
              </Text>
              <Text width={"20rem"} textAlign={"center"}>
                Pop the code into your partner's Duogames extension and start
                playing together!
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </Box>
    </div>
  );
}

// make a note about the adblocker
