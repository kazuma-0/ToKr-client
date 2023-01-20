import {useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";

export default function useSocket(url: string){
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(()=>{
        const socketIo = io(url);

        setSocket(socketIo);

        return () => {
            socketIo.disconnect();
        }
    }, [])

    return socket;
}