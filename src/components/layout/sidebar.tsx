'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, LogOut } from 'lucide-react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { MAIN_NAV } from '@/constants/navigation';

interface SidebarProps {
    user?: {
        name: string;
        email?: string;
        role: string;
        avatarUrl?: string;
    };
}

export function Sidebar({ user }: SidebarProps) {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();

    // Get user initials for avatar fallback
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <aside className="flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar">
            {/* Logo */}
            <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <svg
                        className="h-5 w-5 text-primary-foreground"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                    </svg>
                </div>
                <span className="text-lg font-semibold text-sidebar-foreground">
                    Discourse
                </span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
                >
                    <LogOut className="h-4 w-4" />
                </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-3">
                {MAIN_NAV.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href !== '/' && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.title}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom section */}
            <div className="mt-auto border-t border-sidebar-border p-3">
                {/* Theme toggle */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="mb-3 w-full justify-start gap-3 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                    {theme === 'dark' ? (
                        <Sun className="h-5 w-5" />
                    ) : (
                        <Moon className="h-5 w-5" />
                    )}
                    Toggle Theme
                </Button>

                <Separator className="mb-3 bg-sidebar-border" />

                {/* User profile */}
                {user && (
                    <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                            <AvatarFallback className="bg-sidebar-accent text-sm">
                                {getInitials(user.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                            <p className="truncate text-sm font-medium text-sidebar-foreground">
                                {user.name}
                            </p>
                            <p className="truncate text-xs text-sidebar-foreground/60">
                                {user.role}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
}
