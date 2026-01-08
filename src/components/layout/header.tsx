'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, Plus } from 'lucide-react';

interface HeaderProps {
    title: string;
    subtitle?: string;
    currentClass?: {
        id: string;
        name: string;
    };
    classes?: Array<{
        id: string;
        name: string;
    }>;
    onClassChange?: (classId: string) => void;
    showNewButton?: boolean;
    newButtonLabel?: string;
    onNewClick?: () => void;
}

export function Header({
    title,
    subtitle,
    currentClass,
    classes,
    onClassChange,
    showNewButton = false,
    newButtonLabel = 'New',
    onNewClick,
}: HeaderProps) {
    return (
        <header className="flex h-14 items-center justify-between border-b border-border bg-background px-6">
            <div className="flex items-center gap-4">
                {/* Page title */}
                <div>
                    <h1 className="text-xl font-semibold text-foreground">{title}</h1>
                    {subtitle && (
                        <p className="text-sm text-muted-foreground">{subtitle}</p>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* Class selector */}
                {classes && classes.length > 0 && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2">
                                {currentClass?.name || 'Select Class'}
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Your Classes</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {classes.map((cls) => (
                                <DropdownMenuItem
                                    key={cls.id}
                                    onClick={() => onClassChange?.(cls.id)}
                                >
                                    {cls.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}

                {/* Action button */}
                {showNewButton && (
                    <Button size="sm" onClick={onNewClick} className="gap-2">
                        <Plus className="h-4 w-4" />
                        {newButtonLabel}
                    </Button>
                )}
            </div>
        </header>
    );
}
