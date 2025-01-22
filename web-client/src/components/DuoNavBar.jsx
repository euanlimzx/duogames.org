import { Flex, Text, HStack, Image, Box, Tooltip } from "@chakra-ui/react";

export function DuoNavBar({ isLanding, setupRef, handleLogoClick }) {
  return (
    <Flex width={"100%"} zIndex={100} bg="purple.600" justifyContent="center">
      <Text color="white" fontWeight="semibold" fontSize="large" py="1rem">
        Wanna support us or leave feedback?
        <Text
          as="span"
          cursor="pointer"
          _hover={{ textDecoration: "underline" }}
          fontWeight="bold"
        >
          {" "}
          Let us know here.
        </Text>
      </Text>
    </Flex>
  );
}
