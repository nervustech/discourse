import { ThemeProvider } from 'next-themes';
import { Sidebar } from '@/components/layout/sidebar';

// Mock user data - will be replaced with real auth data
const mockUser = {
    name: 'Ms. Wanjiku',
    role: 'Teacher',
    avatarUrl: undefined,
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
            <div className="flex h-screen overflow-hidden bg-background">
                {/* Sidebar */}
                <Sidebar user={mockUser} />

                {/* Main content area */}
                <main className="flex flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
        </ThemeProvider>
    );
}
