import { Header } from '@/components/layout/header';
import { AIAssistantCard } from '@/components/dashboard/ai-assistant-card';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { ClassPerformance } from '@/components/dashboard/class-performance';
import { RecentActivity } from '@/components/dashboard/recent-activity';

// Mock data for the dashboard
const mockClasses = [
    { id: '1', name: 'Grade 8 Math' },
    { id: '2', name: 'Grade 7 Science' },
    { id: '3', name: 'Grade 8 English' },
];

const mockPerformance = [
    { subject: 'Algebra', score: 85 },
    { subject: 'Geometry', score: 65 },
    { subject: 'Fractions', score: 45 },
];

const mockInsights = [
    'Specific observations indicate incorrect scanning of portionalized recent productions.',
    'Growth in observation, geometry notes and added 3 new diagrams within it.',
    'Trends of Algebra honors 89% on row its and next format; evaluating fraction\'s evaluations.',
];

const mockActivity = [
    {
        id: '1',
        type: 'graded' as const,
        title: 'Assignment Graded: Algebra I - Submitted by John Doe',
        timestamp: '13:30',
        metadata: { score: 78 },
    },
    {
        id: '2',
        type: 'published' as const,
        title: 'Material Updated: Geometry Notes - Added 3 new diagrams',
        timestamp: '13:30',
    },
    {
        id: '3',
        type: 'delivered' as const,
        title: 'Announcement Sent - "Mid-term Exam Schedule"',
        timestamp: '13:30',
    },
];

export default function DashboardPage() {
    return (
        <>
            <Header
                title="👋 Jambo, Ms. Wanjiku"
                subtitle="Overview for Grade 8 Math (CBC) • Tags"
                currentClass={mockClasses[0]}
                classes={mockClasses}
                showNewButton
                newButtonLabel="New Lesson Plan"
            />

            <div className="flex-1 overflow-auto p-6">
                <div className="mx-auto max-w-6xl space-y-6">
                    {/* Top section: AI Assistant + Quick Actions */}
                    <div className="grid gap-6 md:grid-cols-3">
                        <AIAssistantCard />
                        <QuickActions />
                    </div>

                    {/* Middle section: Class Performance */}
                    <ClassPerformance
                        overallStatus="Good"
                        trend={12}
                        subjects={mockPerformance}
                        insights={mockInsights}
                    />

                    {/* Bottom section: Recent Activity */}
                    <RecentActivity activities={mockActivity} />
                </div>
            </div>
        </>
    );
}
