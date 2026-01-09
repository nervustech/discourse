'use client';

import { useState } from 'react';
import { ConversationSidebar } from '@/components/ai-hub/conversation-sidebar';
import { ChatArea } from '@/components/ai-hub/chat-area';

// Mock conversation data - will be replaced with real data
const mockConversations = [
    {
        id: '1',
        title: 'Lesson Planning Help',
        subtitle: 'Grade 8 Math...',
        pinned: true,
        lastMessage: 'Generate notes for algebra unit',
        updatedAt: '2h ago',
    },
    {
        id: '2',
        title: 'Quiz Generation',
        subtitle: 'Science quiz',
        pinned: false,
        lastMessage: 'Create a quiz on photosynthesis',
        updatedAt: '2h ago',
    },
    {
        id: '3',
        title: 'IEP Strategies',
        subtitle: 'Student support',
        pinned: false,
        lastMessage: 'Accommodation strategies for...',
        updatedAt: 'Yesterday',
    },
    {
        id: '4',
        title: 'Student Feedback',
        subtitle: 'Grading assistance',
        pinned: false,
        lastMessage: 'Provide feedback for...',
        updatedAt: '3 days ago',
    },
];

export default function AIHubPage() {
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
    const [conversations, setConversations] = useState(mockConversations);

    // Find the selected conversation
    const selectedConversation = selectedConversationId
        ? conversations.find((c) => c.id === selectedConversationId)
        : null;

    // Handle creating a new conversation
    const handleNewConversation = () => {
        const newConversation = {
            id: Date.now().toString(),
            title: 'New Conversation',
            subtitle: '',
            pinned: false,
            lastMessage: '',
            updatedAt: 'Just now',
        };
        setConversations([newConversation, ...conversations]);
        setSelectedConversationId(newConversation.id);
    };

    return (
        <div className="flex h-full">
            {/* Left: Conversation Sidebar */}
            <ConversationSidebar
                conversations={conversations}
                selectedId={selectedConversationId}
                onSelect={setSelectedConversationId}
                onNewConversation={handleNewConversation}
            />

            {/* Right: Main Chat Area */}
            <ChatArea
                conversation={selectedConversation}
                onSendMessage={(message) => {
                    console.log('Send message:', message);
                    // TODO: Integrate with AI
                }}
            />
        </div>
    );
}
