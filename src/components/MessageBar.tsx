import React from "react";
import {
  Avatar,
  Box,
  Center,
  Flex,
  Modal,
  ModalContent,
  ModalOverlay,
  Portal,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

export default function MessageBox({
  right = false,
  message,
  name,
}: {
  right: boolean;
  message: string;
  name: string;
}) {
  return (
    <Flex
      gap={2}
      py={1}
      justifyContent={right ? "start" : "end"}
      flexDir={right ? "row-reverse" : "row"}
      alignItems={"center"}
    >
      <Box p={2} px={4} bgColor={"gray.700"} rounded={"lg"}>
        {message}
      </Box>
      <Center flexDir={"column"}>
        <Avatar size={"xs"} />
        <Text fontSize={"xs"}>{name}</Text>
      </Center>
    </Flex>
  );
}
