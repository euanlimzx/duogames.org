import { Box, Flex, Text } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

export default function CustomSuccessToast({ title }) {
  return (
    <Box
      p={2}
      bg="#2F8559"
      borderRadius="lg"
      textAlign="center"
      marginBottom={5}
      textColor={"white"}
    >
      <Flex alignItems={"center"} justifyContent={"center"} padding={3} gap={7}>
        <Text fontWeight={700} textAlign={"center"}>
          {title}
        </Text>
        <FaCheckCircle strokeWidth={2} />
      </Flex>
    </Box>
  );
}
