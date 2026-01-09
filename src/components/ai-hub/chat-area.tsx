'use client';

import { useState } from 'react';
import { Send, Paperclip, Mic, Sparkles, FileCheck, MessageCircle, BarChart3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Conversation } from './conversation-sidebar';

// Command definitions
const COMMANDS = [
    {
        id: 'generate',
        command: '#generate',
        title: 'Create lesson notes',
        description: 'Generate CBC-aligned content instantly',
        icon: Sparkles,
    },
    {
        id: 'evaluate',
        command: '#evaluate',
        title: 'Grade assignments',
        description: 'AI-powered evaluation with feedback',
        icon: FileCheck,
    },
    {
        id: 'chat',
        command: '#chat',
        title: 'Ask anything',
        description: 'Get help with teaching questions',
        icon: MessageCircle,
    },
    {
        id: 'analyze',
        command: '#analyze',
        title: 'Class insights',
        description: 'View performance patterns',
        icon: BarChart3,
    },
];

interface ChatAreaProps {
    conversation: Conversation | null | undefined;
    onSendMessage: (message: string) => void;
}

export function ChatArea({ conversation, onSendMessage }: ChatAreaProps) {
    const [inputValue, setInputValue] = useState('');

    const handleSend = () => {
        if (inputValue.trim()) {
            onSendMessage(inputValue);
            setInputValue('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleCommandClick = (command: string) => {
        setInputValue(command + ' ');
        // Focus the input
        document.getElementById('chat-input')?.focus();
    };

    return (
        <div className="flex flex-1 flex-col">
            {/* Main Content Area */}
            <div className="flex-1 overflow-auto p-6">
                {!conversation ? (
                    // Welcome Screen
                    <WelcomeScreen onCommandClick={handleCommandClick} />
                ) : (
                    // Chat Messages (placeholder for now)
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                        <p>Chat with: {conversation.title}</p>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="border-t border-border p-4">
                <div className="mx-auto max-w-3xl">
                    <div className="flex items-center gap-2 rounded-lg border bg-background p-2">
                        <Input
                            id="chat-input"
                            placeholder="Type a message or use # for quick actions..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 border-0 focus-visible:ring-0"
                        />
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Paperclip className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Mic className="h-4 w-4" />
                        </Button>
                        <Button
                            size="icon"
                            className="h-8 w-8"
                            onClick={handleSend}
                            disabled={!inputValue.trim()}
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Welcome screen with command cards
function WelcomeScreen({ onCommandClick }: { onCommandClick: (command: string) => void }) {
    return (
        <div className="flex h-full flex-col items-center justify-center">
            <div className="max-w-2xl space-y-8 text-center">
                {/* Title */}
                <div>
                    <h1 className="text-3xl font-bold">Welcome to AI Hub</h1>
                    <p className="mt-2 text-muted-foreground">
                        Choose an action or type # in the input below
                    </p>
                </div>

                {/* Command Cards Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {COMMANDS.map((cmd) => (
                        <Card
                            key={cmd.id}
                            className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
                            onClick={() => onCommandClick(cmd.command)}
                        >
                            <CardContent className="flex flex-col items-start p-4">
                                <div className="flex w-full items-start justify-between">
                                    <div className="rounded-lg bg-muted p-2">
                                        <cmd.icon className="h-5 w-5" />
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        {cmd.command}
                                    </Badge>
                                </div>
                                <h3 className="mt-3 font-semibold">{cmd.title}</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {cmd.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
