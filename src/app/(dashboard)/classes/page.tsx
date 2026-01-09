import { Header } from '@/components/layout/header';

// This will be replaced with real data from Supabase
const mockClasses = [
    {
        id: '1',
        name: 'Grade 8 Math - Stream A',
        grade: 'Grade 8',
        subject: 'Mathematics',
        curriculum: 'CBC',
        status: 'active' as const,
        avgScore: 65,
        pendingReviews: 12,
        studentCount: 42,
        lastActive: '2 hours ago',
    },
    {
        id: '2',
        name: 'Grade 7 Integrated Science',
        grade: 'Grade 7',
        subject: 'Integrated Science',
        curriculum: 'CBC',
        status: 'active' as const,
        avgScore: 78,
        pendingReviews: 5,
        studentCount: 38,
        lastActive: '1 day ago',
    },
    {
        id: '3',
        name: 'Grade 8 English - Literature',
        grade: 'Grade 8',
        subject: 'English',
        curriculum: 'CBC',
        status: 'active' as const,
        avgScore: 72,
        pendingReviews: 0,
        studentCount: 40,
        lastActive: '3 days ago',
    },
];

export default function ClassesPage() {
    return (
        <>
            <Header
                title="Classes Management"
                subtitle="Manage your CBC curriculum streams and student rosters."
                showNewButton
                newButtonLabel="New Class"
            />

            <div className="flex-1 overflow-auto p-6">
                <div className="mx-auto max-w-4xl space-y-4">
                    {/* Search and Filter - TODO */}
                    <div className="rounded-lg border bg-card p-4">
                        <p className="text-muted-foreground">Search and filter coming next...</p>
                    </div>

                    {/* Class Cards - TODO */}
                    {mockClasses.map((classItem) => (
                        <div key={classItem.id} className="rounded-lg border bg-card p-4">
                            <p className="font-medium">{classItem.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {classItem.studentCount} Students • Avg: {classItem.avgScore}%
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
