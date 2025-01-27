import { Box, Text, Image } from "@chakra-ui/react";

export function ScreenRecordingBox({ videoSrc, placeholderImageSrc, title }) {
  return (
    <Box borderRadius={"2xl"}>
      {/* <Image
        src={src}
        alt="Share Screen Demo"
        borderRadius="1rem"
        width={{ base: "100%", md: "40vw" }}
        objectFit="cover"
        loading="lazy"
      /> */}
      <video src={videoSrc} poster={placeholderImageSrc} loop muted autoPlay playsInline preload="auto" style={{objectFit: "cover", borderRadius: "1rem"}}></video>
      <Text
        textAlign={"center"}
        marginTop={"1rem"}
        fontSize={{ base: "md", md: "xl" }}
      >
        {title}
      </Text>
    </Box>
  );
}
