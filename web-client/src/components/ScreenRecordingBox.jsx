import { Box, Text, Image } from "@chakra-ui/react";

export function ScreenRecordingBox({ src, title }) {
  return (
    <Box borderRadius={"2xl"}>
      <Image
        src={src}
        alt="Share Screen Demo"
        borderRadius="1rem"
        width="40vw"
        objectFit="cover"
        loading="lazy"
      />
      <Text textAlign={"center"} marginTop={"1rem"} fontSize="xl">
        {title}
      </Text>
    </Box>
  );
}
