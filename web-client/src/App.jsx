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
        <VStack gap={"6rem"}>
          <LandingPageTitle />
          <Text
            fontSize={"4xl"}
            fontWeight={"bold"}
            textAlign={"center"}
            ref={setupSection}
          >
            Set Up Duogames
          </Text>
          <HStack gap={"13rem"}>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              1. Have your partner install our Chrome Extension
            </Text>
            <a href="https://google.com" target="_blank">
              <Button
                size="lg"
                px={{ base: "1rem", md: "1.75rem" }}
                py={"2.5rem"}
                background="black"
                color="white"
                _hover={{ bg: "gray.700" }}
                width={"15rem"}
              >
                <HStack>
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
          </HStack>
          <HStack gap={"13rem"}>
            <ScreenRecordingBox
              src="share_screen.gif"
              title="Partner's Screen"
            />
            <VStack>
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
          <VStack gap={"3rem"}>
            <Text fontSize={"xl"} fontWeight={"semibold"} textAlign={"center"}>
              3. Sync Up And Start Paying
            </Text>
            <HStack>
              <VStack width={"40rem"}>
                <ScreenRecordingBox
                  src={"key_in_room_code.gif"}
                  title="Your Screen"
                />
                <Text width={"20rem"} textAlign={"center"}>
                  Click 'Generate Room Code'
                </Text>
                <Text></Text>
              </VStack>
              <VStack width={"40rem"}>
                <ScreenRecordingBox
                  src={"key_in_room_code.gif"}
                  title="Partner's Screen"
                />
                <Text width={"20rem"} textAlign={"center"}>
                  Pop the code into your partner's Duogames extension and start
                  playing together!
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </div>
  );
}

// make a note about the adblocker
