import { Flex, Text, HStack, Image, Box } from "@chakra-ui/react";

export function DuoNavBar({ isLanding, setupRef, handleLogoClick }) {
  return (
    // NOt surte why Shadow does not work properly here
    <Box width={"100%"} zIndex={100}>
      <Flex
        paddingX={"3rem"}
        paddingY={"2rem"}
        backgroundColor={"black"}
        height={"5rem"}
        alignItems={"center"}
        flex={"row"}
        justify={"space-between"}
        position={"fixed"}
        width={"100%"}
        zIndex={100}
      >
        <HStack gap={"1.5rem"} cursor={"pointer"} onClick={handleLogoClick}>
          <Image src="/vite.svg" width="3rem"></Image>
          <Text
            color="white"
            fontSize={"4xl"}
            fontWeight={"extrabold"}
            letterSpacing={"wider"}
          >
            Duogames
          </Text>
        </HStack>
        {isLanding && (
          <Flex alignItems={"center"} justifyContent={"center"} flexDir={"row"}>
            <Text
              color="white"
              paddingTop={"1rem"}
              fontSize={"lg"}
              cursor={"pointer"}
              fontWeight={"semibold"}
              onClick={() => {
                if (setupRef?.current) {
                  setupRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "center",
                  });
                }
              }}
              letterSpacing={"wider"}
              paddingBottom={"0.5rem"}
            >
              setup
            </Text>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
