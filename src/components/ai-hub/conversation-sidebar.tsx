'use client';

import { useState } from 'react';
import { Plus, Search, Pin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface Conversation {
    id: string;
    title: string;
    subtitle?: string;
    pinned: boolean;
    lastMessage?: string;
    updatedAt: string;
}

interface ConversationSidebarProps {
    conversations: Conversation[];
    selectedId: string | null;
    onSelect: (id: string) => void;
    onNewConversation: () => void;
}

export function ConversationSidebar({
    conversations,
    selectedId,
    onSelect,
    onNewConversation,
}: ConversationSidebarProps) {
    const [searchQuery, setSearchQuery] = useState('');

    // Split into pinned and recent
    const pinnedConversations = conversations.filter((c) => c.pinned);
    const recentConversations = conversations.filter((c) => !c.pinned);

    // Filter by search
    const filterConversations = (list: Conversation[]) => {
        if (!searchQuery) return list;
        return list.filter(
            (c) =>
                c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const filteredPinned = filterConversations(pinnedConversations);
    const filteredRecent = filterConversations(recentConversations);

    return (
        <aside className="flex h-full w-64 flex-col border-r border-border bg-muted/30">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-3">
                <h2 className="font-semibold">Conversations</h2>
                <Button size="sm" onClick={onNewConversation} className="h-8 gap-1">
                    <Plus className="h-4 w-4" />
                    New
                </Button>
            </div>

            {/* Search */}
            <div className="p-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-9 pl-9 text-sm"
                    />
                </div>
            </div>

            {/* Conversation Lists */}
            <div className="flex-1 overflow-auto">
                {/* Pinned Section */}
                {filteredPinned.length > 0 && (
                    <div className="px-3 py-2">
                        <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">
                            Pinned
                        </h3>
                        <div className="space-y-1">
                            {filteredPinned.map((conversation) => (
                                <ConversationItem
                                    key={conversation.id}
                                    conversation={conversation}
                                    isSelected={selectedId === conversation.id}
                                    onClick={() => onSelect(conversation.id)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Recent Section */}
                {filteredRecent.length > 0 && (
                    <div className="px-3 py-2">
                        <h3 className="mb-2 text-xs font-medium uppercase text-muted-foreground">
                            Recent
                        </h3>
                        <div className="space-y-1">
                            {filteredRecent.map((conversation) => (
                                <ConversationItem
                                    key={conversation.id}
                                    conversation={conversation}
                                    isSelected={selectedId === conversation.id}
                                    onClick={() => onSelect(conversation.id)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {filteredPinned.length === 0 && filteredRecent.length === 0 && (
                    <div className="p-6 text-center text-sm text-muted-foreground">
                        No conversations found
                    </div>
                )}
            </div>
        </aside>
    );
}

// Individual conversation item
function ConversationItem({
    conversation,
    isSelected,
    onClick,
}: {
    conversation: Conversation;
    isSelected: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'flex w-full items-start gap-2 rounded-lg p-2 text-left text-sm transition-colors',
                isSelected
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-accent/50'
            )}
        >
            {conversation.pinned && (
                <Pin className="mt-0.5 h-3 w-3 text-muted-foreground" />
            )}
            <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between gap-2">
                    <span className="truncate font-medium">{conversation.title}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                        {conversation.updatedAt}
                    </span>
                </div>
                {conversation.subtitle && (
                    <p className="truncate text-xs text-muted-foreground">
                        {conversation.subtitle}
                    </p>
                )}
            </div>
        </button>
    );
}
