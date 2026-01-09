'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { SearchAndFilter } from '@/components/classes/search-and-filter';

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
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGrades, setSelectedGrades] = useState<string[]>([]);

    // Filter classes based on search and grade filters
    const filteredClasses = mockClasses.filter((classItem) => {
        // Search filter
        const matchesSearch = searchQuery === '' ||
            classItem.name.toLowerCase().includes(searchQuery.toLowerCase());

        // Grade filter
        const matchesGrade = selectedGrades.length === 0 ||
            selectedGrades.includes(classItem.grade);

        return matchesSearch && matchesGrade;
    });

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
                    {/* Search and Filter */}
                    <SearchAndFilter
                        onSearch={setSearchQuery}
                        onFilterChange={setSelectedGrades}
                    />

                    {/* Class Cards */}
                    {filteredClasses.length === 0 ? (
                        <div className="rounded-lg border bg-card p-8 text-center">
                            <p className="text-muted-foreground">No classes found matching your filters.</p>
                        </div>
                    ) : (
                        filteredClasses.map((classItem) => (
                            <div key={classItem.id} className="rounded-lg border bg-card p-4">
                                <p className="font-medium">{classItem.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {classItem.studentCount} Students • Avg: {classItem.avgScore}%
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
