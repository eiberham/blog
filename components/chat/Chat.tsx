"use client"

import { useFormStatus } from 'react-dom'
import { useChat } from '@ai-sdk/react';
import { motion, AnimatePresence } from "framer-motion";
import { useState } from 'react';

export default function Chat() {
    const { pending } = useFormStatus();
    const { messages, sendMessage } = useChat();
    const [input, setInput] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage({ text: input });
        setInput("");
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                name="message"
                value={input}
                onFocus={() => setIsExpanded(true)}
                onChange={handleInputChange}
                placeholder="Chat with my notes..."
                required
            />
            <button type="submit" disabled={pending}>Send</button>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div>
                        {messages.map(message => (
                            <div key={message.id} className="whitespace-pre-wrap">
                            {message.role === 'user' ? 'User: ' : 'AI: '}
                            {message.parts.map((part, i) => {
                                switch (part.type) {
                                case 'text':
                                    return <div key={`${message.id}-${i}`}>{part.text}</div>;
                                }
                            })}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </form>
    );
}