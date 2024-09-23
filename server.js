/*-----------------gpt-------------*/

const OpenAI = require("openai");
const express = require('express'); // Import express for HTTP server
const cors = require('cors'); // Import cors for cross-origin resource sharing

const openai = new OpenAI();
const app = express(); // Create an Express app
const PORT = 3000; // Define the port for the HTTP server

app.use(cors());
app.use(express.json({ limit: "10mb" }));  // Increase limit to 10 MB or adjust as needed
app.use(express.urlencoded({ limit: "10mb", extended: true }));  // Increase for URL-encoded data

// Async function to get completion from OpenAI API
async function getCompletion(userMessage, imageUrl) {
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: "system",
                    content: "You are my assistant. I will send you questions, maybe paired with images. Please answer the question within 100 words"
                },
                {
                    "role": "user",
                    "content": [
                      {
                        "type": "text", 
                        "text": userMessage
                    },
                      {
                        "type": "image_url",
                        "image_url": {
                          "url": imageUrl,
                        },
                      },
                    ],
                }
            ],
        });

        return completion.choices[0].message; // Return the response message
    } catch (error) {
        console.error('Error:', error.message);
        throw error; // Throw error to be handled by the calling function
    }
}

// Endpoint to handle OpenAI API requests from the webpage
app.post('/get-completion', async (req, res) => {
    try {
        const { userMessage, imageUrl } = req.body; // Get userMessage from the request body

        // Get completion from OpenAI API
        const responseMessage = await getCompletion(userMessage, imageUrl);

        // Send response back to the client
        res.json(responseMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the HTTP server
app.listen(PORT, () => {
    console.log(`HTTP server is running on http://localhost:${PORT}`);
});


/*---------------------object recognition-------------*/

const WebSocket = require('ws');

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
