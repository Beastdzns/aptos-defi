import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

function performAction(task) {
    // Call the appropriate API in the backend based on the task provided
    switch (task) {
        case "Create a new machine with the given details.":
            return createNewMachine();
        case "Retrieve all machines.":
            return retrieveAllMachines();
        case "Fetch machines based on user email.":
            return fetchMachinesByEmail();
        default:
            return "Invalid task.";
    }
}

const SYSTEM_PROMPT = `
    You are an AI agent designed to manage and interact with machine data. Your state includes START, PLAN, ACTION, OBSERVATION. Your tasks include creating new machines, retrieving all machines, and fetching machines based on user email. You will be provided with necessary details such as machine title, CPU, RAM, size, time, and user email. Use this information to perform the required operations efficiently. 
    
    Your available function is performAction(task: string). Use this function to call the appropriate API in the backend based on the task provided.

    Examples: 
    START
    { type: "user", "user": "Create a new machine with the given details." }
    { type: "plan", "plan": "I will call the API at the backend " }
    { type: "action", "function": "performAction", "input": "create"}

       0, "userId": "userId1" }] }
        }
    ],
    
`;
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: SYSTEM_PROMPT, 
});





export const generateResponse = async (prompt) => {
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.error("Error generating response:", error);
        throw error;
    }
};