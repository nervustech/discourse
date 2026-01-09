'use client';

import { MessageSquare, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock student data - will be replaced with real data from Supabase
const mockStudents = [
    {
        id: '1',
        fullName: 'Kamau Juma',
        studentId: '88291',
        avatarUrl: undefined,
        status: 'needs_attention' as const,
        avgScore: 45,
    },
    {
        id: '2',
        fullName: 'Amina Yusuf',
        studentId: '88294',
        avatarUrl: undefined,
        status: 'strong_performance' as const,
        avgScore: 92,
    },
    {
        id: '3',
        fullName: 'Brian Ochieng',
        studentId: '88295',
        avatarUrl: undefined,
        status: 'average' as const,
        avgScore: 68,
    },
];

type StudentStatus = 'needs_attention' | 'average' | 'strong_performance';

interface StudentRosterProps {
    classId: string;
    studentCount: number;
}

export function StudentRoster({ classId, studentCount }: StudentRosterProps) {
    // Get initials from name
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Get status badge styling
    const getStatusBadge = (status: StudentStatus) => {
        switch (status) {
            case 'needs_attention':
                return {
                    label: 'Needs Attention',
                    className: 'bg-orange-100 text-orange-700 hover:bg-orange-100 dark:bg-orange-900 dark:text-orange-100',
                };
            case 'strong_performance':
                return {
                    label: 'Strong Performance',
                    className: 'bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900 dark:text-green-100',
                };
            default:
                return {
                    label: 'Average',
                    className: 'bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100',
                };
        }
    };

    // Get action button based on status
    const getActionButton = (status: StudentStatus) => {
        if (status === 'needs_attention') {
            return (
                <Button size="sm" variant="default">
                    Evaluate
                </Button>
            );
        }
        return (
            <Button size="sm" variant="outline">
                View
            </Button>
        );
    };

    return (
        <div className="space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-muted-foreground">
                    STUDENT ROSTER ({studentCount})
                </h4>
                <Button variant="link" size="sm" className="text-muted-foreground">
                    View All →
                </Button>
            </div>

            {/* Student List */}
            <div className="space-y-2">
                {mockStudents.map((student) => {
                    const statusBadge = getStatusBadge(student.status);

                    return (
                        <div
                            key={student.id}
                            className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
                        >
                            {/* Left: Avatar and Info */}
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={student.avatarUrl} alt={student.fullName} />
                                    <AvatarFallback className="bg-primary/10 text-sm">
                                        {getInitials(student.fullName)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{student.fullName}</p>
                                    <p className="text-xs text-muted-foreground">ID: {student.studentId}</p>
                                </div>
                            </div>

                            {/* Middle: Status Badge */}
                            <Badge className={cn('font-medium', statusBadge.className)}>
                                {statusBadge.label}
                            </Badge>

                            {/* Right: Actions */}
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MessageSquare className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                                {getActionButton(student.status)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
