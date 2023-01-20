import {
  Button,
  Center,
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Portal,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

interface joinModelProps {
  isOpen: boolean;
  onClose: () => void;
}
function randomAlphaNumeric(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
export default function JoinModel({ isOpen, onClose }: joinModelProps) {
  const router = useRouter();
  return (
    <Portal>
      <Modal isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <ModalHeader>
            <Heading textAlign={"center"}>Create or Join a Chat Room</Heading>
          </ModalHeader>
          <Divider />
          <ModalBody>
            <Heading size={"lg"} textAlign={"center"}>
              Join an existing room
            </Heading>
            <Center gap={3} py={3}>
              <PinInput
                onComplete={(e) => {
                  router.push("/?code=" + e);
                }}
                type={"alphanumeric"}
              >
                <PinInputField></PinInputField>
                <PinInputField></PinInputField>
                <PinInputField></PinInputField>
                <PinInputField></PinInputField>
              </PinInput>
            </Center>
            <Center>
              <Heading>Or</Heading>
            </Center>
            <Center py={3}>
              <Button
                onClick={() => {
                  router.push("/?code=" + randomAlphaNumeric());
                }}
                colorScheme={"whatsapp"}
              >
                Create new Room
              </Button>
            </Center>
          </ModalBody>
          <Divider />
          <ModalFooter>
            Made with 💖 by @{" "}
            <Link href={"https://github.com/kazuma-0"}>kazuma-0</Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Portal>
  );
}
