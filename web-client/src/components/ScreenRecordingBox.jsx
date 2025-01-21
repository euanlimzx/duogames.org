import { Box, Text, Image } from "@chakra-ui/react";

export function ScreenRecordingBox({ src, title }) {
  return (
    <Box padding={"1rem"} borderRadius={"2xl"}>
      <Image
        src={src}
        alt="Share Screen Demo"
        borderRadius="1rem"
        width="30rem"
        objectFit="cover"
        loading="lazy"
      />
      <Text textAlign={"center"} marginTop={"1rem"} fontWeight={"semibold"}>
        {title}
      </Text>
    </Box>
  );
}
