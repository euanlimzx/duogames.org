import { Flex, Text, HStack, Image, Box, Tooltip } from "@chakra-ui/react";

export function DuoNavBar({ isLanding, handleLogoClick }) {
  return (
    <Flex width={"100%"} zIndex={100} bg="purple.600" justifyContent="center">
      <Text
        color="white"
        fontWeight="semibold"
        fontSize={{ base: "md", md: "large" }}
        py="1rem"
        px="2rem"
        textAlign="center"
      >
        Wanna support us or leave feedback?
        <Text
          as="span"
          cursor="pointer"
          _hover={{ textDecoration: "underline" }}
          fontWeight="bold"
        >
          {" "}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdfUnlkyoLIYcINHhkQNjNLXNUBnTMEIyESxTNqHG6abL7XVw/viewform?usp=header"
            target="_blank"
          >
            Let us know here.
          </a>
        </Text>
      </Text>
    </Flex>
  );
}
