'use client';

import { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const quickLinks = [
    { label: 'Lesson Planning', href: '/ai-hub?cmd=generate' },
    { label: 'Quiz Generator', href: '/ai-hub?cmd=generate&type=quiz' },
    { label: 'IEP Support', href: '/ai-hub?cmd=chat&topic=iep' },
];

export function AIAssistantCard() {
    const [query, setQuery] = useState('');

    return (
        <Card className="col-span-1">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                    <span className="text-lg">✨</span>
                    AI ASSISTANT
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Search input */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Ask AI..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>

                {/* Quick links */}
                <div className="space-y-1">
                    {quickLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                            {link.label}
                            <ChevronRight className="h-4 w-4" />
                        </a>
                    ))}
                </div>

                <a
                    href="/ai-hub"
                    className="block text-center text-sm text-muted-foreground hover:text-foreground"
                >
                    View all conversations
                </a>
            </CardContent>
        </Card>
    );
}
