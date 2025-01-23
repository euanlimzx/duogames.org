import { Box, Text, Image } from "@chakra-ui/react";

export function ScreenRecordingBox({ src, title }) {
  return (
    <Box borderRadius={"2xl"}>
      <Image
        src={src}
        alt="Share Screen Demo"
        borderRadius="1rem"
        width={{ base: "100%", md: "40vw" }}
        objectFit="cover"
        loading="lazy"
      />
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
