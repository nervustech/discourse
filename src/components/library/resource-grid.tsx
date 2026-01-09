'use client';

import { FileText, CheckSquare, HelpCircle, Upload, MoreVertical } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ResourceType = 'lesson_note' | 'evaluation' | 'quiz' | 'uploaded';

interface Resource {
    id: string;
    title: string;
    type: ResourceType;
    subject?: string;
    term?: string;
    metadata?: string;
    createdAt: string;
    icon?: string;
}

interface ResourceGridProps {
    resources: Resource[];
    viewMode: 'grid' | 'list';
}

export function ResourceGrid({ resources, viewMode }: ResourceGridProps) {
    if (resources.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
                <FileText className="h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-lg font-medium">No resources found</p>
                <p className="text-sm text-muted-foreground">
                    Try adjusting your filters or upload a new resource.
                </p>
            </div>
        );
    }

    return (
        <div
            className={cn(
                viewMode === 'grid'
                    ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
                    : 'flex flex-col gap-3'
            )}
        >
            {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} viewMode={viewMode} />
            ))}
        </div>
    );
}

function ResourceCard({ resource, viewMode }: { resource: Resource; viewMode: 'grid' | 'list' }) {
    // Get icon based on type
    const getIcon = () => {
        switch (resource.type) {
            case 'lesson_note':
                return <FileText className="h-8 w-8" />;
            case 'evaluation':
                return <CheckSquare className="h-8 w-8" />;
            case 'quiz':
                return <HelpCircle className="h-8 w-8" />;
            case 'uploaded':
                return <Upload className="h-8 w-8" />;
            default:
                return <FileText className="h-8 w-8" />;
        }
    };

    // Get badge styling based on type
    const getBadgeStyle = () => {
        switch (resource.type) {
            case 'lesson_note':
                return 'bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100';
            case 'evaluation':
                return 'bg-orange-100 text-orange-700 hover:bg-orange-100 dark:bg-orange-900 dark:text-orange-100';
            case 'quiz':
                return 'bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900 dark:text-green-100';
            case 'uploaded':
                return 'bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-100';
            default:
                return '';
        }
    };

    // Get type label
    const getTypeLabel = () => {
        switch (resource.type) {
            case 'lesson_note':
                return 'Lesson Note';
            case 'evaluation':
                return 'Evaluation';
            case 'quiz':
                return 'Quiz';
            case 'uploaded':
                return 'Uploaded';
            default:
                return '';
        }
    };

    if (viewMode === 'list') {
        return (
            <Card className="flex items-center gap-4 p-4">
                <div className="rounded-lg bg-muted p-3">{getIcon()}</div>
                <div className="flex-1">
                    <h3 className="font-medium">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">
                        {resource.subject}
                        {resource.term && ` • ${resource.term}`}
                        {resource.metadata && ` • ${resource.metadata}`}
                    </p>
                </div>
                <Badge className={getBadgeStyle()}>{getTypeLabel()}</Badge>
                <span className="text-sm text-muted-foreground">{resource.createdAt}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </Card>
        );
    }

    return (
        <Card className="group cursor-pointer transition-all hover:shadow-md">
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <div className="rounded-lg bg-muted p-3">{getIcon()}</div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </div>
                <h3 className="mt-4 font-semibold">{resource.title}</h3>
                <Badge className={cn('mt-2', getBadgeStyle())}>{getTypeLabel()}</Badge>
                <p className="mt-2 text-sm text-muted-foreground">
                    {resource.subject}
                    {resource.term && ` • ${resource.term}`}
                </p>
                {resource.metadata && (
                    <p className="text-sm text-muted-foreground">{resource.metadata}</p>
                )}
                <p className="mt-2 text-xs text-muted-foreground">
                    Created {resource.createdAt}
                </p>
            </CardContent>
        </Card>
    );
}
