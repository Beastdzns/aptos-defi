import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

async function performAction(task, data) {
    // Call the appropriate API in the backend based on the task provided
    try {
        switch (task) {
            case "create":
                const createResponse = await axios.post("http://localhost:4000/machines/create", {
                    title: data.title,
                    ram: data.ram,
                    size: data.size,
                    time: data.time,
                    email: data.email,
                    cpu: data.cpu
                });
                return createResponse.data;

            case "getAll":
                const getAllResponse = await axios.get("http://localhost:4000/machines/all");
                return getAllResponse.data;

            case "getByEmail":
                const userResponse = await axios.get(`http://localhost:4000/machines/${data.email}`);
                return userResponse.data;

            default:
                return "Invalid task";
        }
    } catch (error) {
        console.error("Error in performAction:", error);
        throw error;
    }
}

const SYSTEM_PROMPT = `
    You are an AI agent designed to manage and interact with machine data. Your state includes START, PLAN, ACTION, OBSERVATION. Your tasks include creating new machines, retrieving all machines, and fetching machines based on user email. You will be provided with necessary details such as machine title, CPU, RAM, size, time, and user email. Use this information to perform the required operations efficiently. 
    
    Your available function is performAction(task: string). Use this function to call the appropriate API in the backend based on the task provided.

    Examples: 
    START
    { type: "user", "user": "Create a new machine with the given details. Title: '', time:'', ram:'', size:'' " }
    { type: "plan", "plan": "I will call the API at the backend " }
    { type: "action", "function": "performAction", "input": "create"}
    { type: "observation", "observation": "Machine created successfully." }

    START
    { type: "user", "user": "Get all machines" }
    { type: "plan", "plan": "I will retrieve all machines from the database" }
    { type: "action", "function": "performAction", "input": "getAll"}
    { type: "observation", "observation": "Retrieved all machines successfully." }

    START
    { type: "user", "user": "Get machines for email: user@example.com" }
    { type: "plan", "plan": "I will fetch machines associated with the provided email" }
    { type: "action", "function": "performAction", "input": "getByEmail"}
    { type: "observation", "observation": "Retrieved machines for the specified email." }
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