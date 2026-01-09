'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { StudentRoster } from './student-roster';

export interface ClassData {
    id: string;
    name: string;
    grade: string;
    subject: string;
    curriculum: string;
    status: 'active' | 'inactive';
    avgScore: number;
    pendingReviews: number;
    studentCount: number;
    lastActive: string;
}

interface ClassCardProps {
    classData: ClassData;
    defaultExpanded?: boolean;
}

export function ClassCard({ classData, defaultExpanded = false }: ClassCardProps) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    // Determine if this class needs attention (has pending reviews)
    const needsAttention = classData.pendingReviews > 0;

    // Get color for average score
    const getScoreColor = (score: number) => {
        if (score >= 70) return 'text-green-600';
        if (score >= 50) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <Card className={cn(
            'transition-all duration-200',
            isExpanded && 'ring-1 ring-primary/20'
        )}>
            <CardHeader className="pb-3">
                {/* Top row: Name, Status, Metrics */}
                <div className="flex items-start justify-between gap-4">
                    {/* Left: Name and metadata */}
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{classData.name}</h3>
                            <Badge
                                variant="outline"
                                className={cn(
                                    'text-xs font-medium',
                                    classData.status === 'active'
                                        ? 'border-green-500 text-green-600'
                                        : 'border-gray-400 text-gray-500'
                                )}
                            >
                                {classData.status === 'active' ? 'ACTIVE' : 'INACTIVE'}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" />
                            <span>Last active: {classData.lastActive}</span>
                        </div>
                    </div>

                    {/* Right: Metrics */}
                    <div className="flex items-center gap-6">
                        {/* Average Score */}
                        <div className="text-right">
                            <div className={cn('text-xl font-bold', getScoreColor(classData.avgScore))}>
                                {classData.avgScore}%
                            </div>
                            <div className="text-xs text-muted-foreground">Avg. Score</div>
                        </div>

                        {/* Pending Reviews */}
                        {needsAttention && (
                            <div className="text-right">
                                <Badge variant="destructive" className="text-sm font-bold">
                                    {classData.pendingReviews}
                                </Badge>
                                <div className="mt-1 text-xs text-muted-foreground">Pending Reviews</div>
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>

            {/* Expandable Student Roster */}
            {isExpanded && (
                <CardContent className="border-t pt-4">
                    <StudentRoster
                        classId={classData.id}
                        studentCount={classData.studentCount}
                    />
                </CardContent>
            )}

            {/* Expand/Collapse Toggle */}
            <div className="flex justify-center border-t py-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-muted-foreground hover:text-foreground"
                >
                    {isExpanded ? (
                        <ChevronUp className="h-5 w-5" />
                    ) : (
                        <ChevronDown className="h-5 w-5" />
                    )}
                </Button>
            </div>
        </Card>
    );
}
