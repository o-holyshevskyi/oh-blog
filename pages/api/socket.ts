import getDomain from "@/app/[locale]/domain";
import { Server } from "socket.io";

export default async function handler(req: any, res: any) {
    // if (!res.socket.server.io) {
    //     const io = new Server(res.socket.server);
    //     res.socket.server.io = io;

    //     io.on("connection", (socket) => {
    //         console.log("Client connected");

    //         socket.on("message", (message) => {
    //             console.log("Received message:", message);
    //             socket.emit("response", "Server received: " + message);
    //         });

    //         socket.on("disconnect", () => {
    //             console.log("Client disconnected");
    //         });
    //     });
    // }

    // res.end();
    if (!res.socket.server.io) {
        const domain = await getDomain();
        const io = new Server(res.socket.server, {
            cors: {
                origin: domain, // Your frontend's address (if different from backend)
                methods: ["GET", "POST"],
            },
            path: "/socket.io", // Ensure that the correct path is set here
        });
        res.socket.server.io = io;

        io.on("connection", (socket) => {
            console.log("User connected:", socket.id);

            socket.on("message", async (message) => {
                console.log("Message received from client:", message);

                try {
                    const response = await fetch(`${domain}/api/chatbot`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ message }),
                    });

                    const result = await response.json();
                    console.log("Reply from OpenAI:", result);

                    socket.emit("response", result.content); // Send the response back to the frontend
                } catch (error) {
                    console.error("Error sending message to OpenAI:", error);
                }
            });

            socket.on("disconnect", () => {
                console.log("User disconnected:", socket.id);
            });
        });
    }
}
