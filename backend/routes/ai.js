import express from 'express';
import { generateResponse } from '../controllers/aiController.js';
const router = express.Router();

router.post('/', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const response = await generateResponse(prompt);
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

export default router;