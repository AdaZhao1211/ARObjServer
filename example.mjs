import OpenAI from "openai";
const openai = new OpenAI();

const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: "Write a haiku about recursion in programming.",
        },
    ],
});

console.log(completion.choices[0].message);



// JavaScript source code
import WebSocket from "ws";

// Create WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });
let clients = [];

wss.on('connection', (ws) => {
    console.log('Client connected');
    clients.push(ws);
    // Receive messages from the client
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        clients[0].send(message);
    });

    // Client disconnected
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
