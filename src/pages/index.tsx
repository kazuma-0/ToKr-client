import Head from "next/head";
import { Inter } from "@next/font/google";
import { v4 } from "uuid";

import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Portal,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { IconSend } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import useSocket from "@/hooks/useSocket";
import MessageBox from "@/components/MessageBar";
import useChatScroll from "@/hooks/useChatScroll";
import dynamic from "next/dynamic";

const NavBar = dynamic(
  () => import("@/components/NavBar").then((mod) => mod.default),
  {
    ssr: true,
  }
);
const inter = Inter({ subsets: ["latin"] });

const JoinModel = dynamic(() =>
  import("@/components/JoinModel").then((mod) => mod.default)
);

export default function Chat(props: any) {
  const [chatId, setChatId] = useState<string>("");
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const [userId, setUserId] = useState(v4());
  const { isOpen, onClose, onOpen } = useDisclosure({
    defaultIsOpen: true,
  });
  const [messages, setMessaages] = useState<
    { user: string; chatId: string; trl: string; message: string }[]
  >([]);

  const chatScroll = useChatScroll(messages);
  const router = useRouter();
  const toast = useToast({
    position: "top",
  });
  const socket = useSocket(props.socketUrl);
  useEffect(() => {
    let name = localStorage.getItem("name");
    if (name) {
      setUserId(name);
    }
  }, []);

  function sendMessage() {
    const message = inputRef.current.value;
    if (!message) {
      return;
    }
    // @ts-ignore
    setMessaages((state) => {
      return [
        ...state,
        {
          message: message,
          chatId: chatId,
          user: "me",
          trl: null,
        },
      ];
    });
    socket?.emit("msgToServer", {
      chatId,
      message,
      user: userId,
    });
    inputRef.current.value = "";
  }

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        toast({
          title: `Gateway connected`,
          status: "success",
          isClosable: true,
        });
        socket.on("msgToClient", (data) => {
          setMessaages((state) => {
            return [...state, data];
          });
        });
      });
      socket.on("joinedChat", (data) => {
        setChatId(data);
      });
    }
  }, [socket]);
  useEffect(() => {
    const { code } = router.query;
    if (code && socket) {
      onClose();
      socket.emit("joinChat", {
        chatId: code,
      });
    }
    if (socket) {
    }
  }, [router.query.code, socket]);
  return (
    <>
      <Head>
        <title>ToKr</title>
        <meta name="description" content="A real time translation app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box h={"100vh"} maxW={"lg"} mx={"auto"}>
        <NavBar />
        <Flex
          px={1}
          pb={3}
          flexDir={"column"}
          justifyContent={"flex-end"}
          h={"calc(100vh - 64px - 64px - 20px)"}
        >
          <Box ref={chatScroll} p="2" maxH={"full"} overflowY={"auto"}>
            {messages.map((message, i) => (
              <MessageBox
                name={message.user.slice(0, 5)}
                right={message.user !== "me"}
                message={message.message}
                key={i}
              />
            ))}
          </Box>
        </Flex>
        <Flex
          justifyContent={"space-between"}
          px={3}
          alignItems={"center"}
          h={"5"}
          bgColor={"gray.700"}
        >
          <Box></Box>
          <Text fontSize={"sm"} textTransform={"uppercase"} fontFamily={"mono"}>
            {chatId ? `Connected to room ${chatId}` : `disconnected`}
          </Text>
        </Flex>
        <HStack h={"16"} px={3}>
          <Center h={"full"} w={"full"}>
            <Input
              ref={inputRef}
              onChange={(e) => {
                inputRef.current.value = e.target.value;
              }}
              variant={"outline"}
              roundedEnd={0}
              flex={1}
              placeholder={"Start typing"}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            ></Input>
            <IconButton
              onClick={() => {
                sendMessage();
              }}
              aria-label={"send"}
              variant={"outline"}
              roundedStart={0}
              icon={<IconSend />}
            ></IconButton>
          </Center>
        </HStack>
      </Box>
      <JoinModel isOpen={isOpen} onClose={onClose}></JoinModel>
    </>
  );
}

Chat.getInitialProps = async () => {
  return { socketUrl: process.env.SOCKET };
};
