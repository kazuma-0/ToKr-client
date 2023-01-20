import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { IconGlobe, IconSettings2 } from "@tabler/icons";
import React, { useEffect, useState } from "react";

export default function NavBar() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [name, setName] = useState("");
  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);
  return (
    <>
      <HStack
        h={"16"}
        px={3}
        alignItems={"center"}
        justifyContent={"space-between"}
        bgColor={"blue.800"}
        roundedBottom={"md"}
      >
        <IconGlobe size={40} />
        <Box>
          <IconButton
            onClick={onOpen}
            variant={"ghost"}
            aria-label={"settings"}
            icon={<IconSettings2 size={32} />}
          />
        </Box>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Settings</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input onChange={(e) => setName(e.target.value)}></Input>
              <FormHelperText>
                Only 5 characters will be displayed,{" "}
              </FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            {/*<Button onClick={() => {}}>Update</Button>*/}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
