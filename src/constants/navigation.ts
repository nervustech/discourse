// Navigation configuration for the app
import {
    Home,
    Users,
    Sparkles,
    Library,
    type LucideIcon
} from 'lucide-react';

export interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
    badge?: string;
}

export const MAIN_NAV: NavItem[] = [
    {
        title: 'Home',
        href: '/',
        icon: Home,
    },
    {
        title: 'Classes',
        href: '/classes',
        icon: Users,
    },
    {
        title: 'AI Hub',
        href: '/ai-hub',
        icon: Sparkles,
    },
    {
        title: 'Library',
        href: '/library',
        icon: Library,
    },
];

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    DASHBOARD: '/',
    CLASSES: '/classes',
    AI_HUB: '/ai-hub',
    LIBRARY: '/library',
} as const;
