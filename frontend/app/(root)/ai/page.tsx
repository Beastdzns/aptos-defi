"use client"
import React from 'react';
import { useState } from 'react';

export default function Page() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!prompt.trim()) return;

        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            const res = await fetch(`${process.env.PUBLIC_URL}/ai`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!res.ok) {
                throw new Error('Failed to get a response from the backend');
            }

            const data = await res.json();
            setResponse(data.response); 
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-6">AI Chatbot</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-center gap-4">
                    <input
                        type="text"
                        value={prompt}
                        onChange={handleChange}
                        placeholder="Ask me anything..."
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-3 bg-blue-500 text-white font-semibold rounded-md disabled:bg-gray-400"
                    >
                        {loading ? 'Thinking...' : 'Ask'}
                    </button>
                </div>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {response && (
                <div className="mt-6 p-4 bg-gray-100 rounded-md">
                    <h2 className="font-semibold text-xl mb-2">Response:</h2>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
};

