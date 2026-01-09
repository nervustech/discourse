'use client';

import { useState } from 'react';
import { Search, Grid3X3, List, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResourceGrid } from '@/components/library/resource-grid';
import { FilterBar } from '@/components/library/filter-bar';

// Resource types
type ResourceType = 'lesson_note' | 'evaluation' | 'quiz' | 'uploaded';

// Mock data
const mockResources = [
    {
        id: '1',
        title: 'Personal Hygiene - Grade 4',
        type: 'lesson_note' as ResourceType,
        subject: 'Env. Activities',
        term: 'Term 3',
        createdAt: 'Oct 24',
        icon: 'document',
    },
    {
        id: '2',
        title: 'Term 1 Math Assessment',
        type: 'evaluation' as ResourceType,
        subject: 'Grade 8 Math',
        metadata: '42 submissions',
        createdAt: 'Oct 20',
        icon: 'checklist',
    },
    {
        id: '3',
        title: 'Algebra Basics Quiz',
        type: 'quiz' as ResourceType,
        subject: 'Grade 8 Math',
        metadata: '15 questions',
        createdAt: 'Oct 18',
        icon: 'quiz',
    },
    {
        id: '4',
        title: 'Soil Conservation Notes',
        type: 'lesson_note' as ResourceType,
        subject: 'Env. Activities',
        term: 'Term 2',
        createdAt: 'Sep 15',
        icon: 'document',
    },
    {
        id: '5',
        title: 'Computer Devices Assessment',
        type: 'evaluation' as ResourceType,
        subject: 'Grade 6 Tech',
        metadata: '30 submissions',
        createdAt: 'Sep 10',
        icon: 'checklist',
    },
    {
        id: '6',
        title: 'Geometry Formulas',
        type: 'uploaded' as ResourceType,
        subject: 'Grade 8 Math',
        createdAt: 'Sep 5',
        icon: 'upload',
    },
];

const TABS = [
    { value: 'all', label: 'All Resources' },
    { value: 'lesson_note', label: 'Lesson Notes' },
    { value: 'evaluation', label: 'Evaluations' },
    { value: 'quiz', label: 'Quizzes' },
    { value: 'uploaded', label: 'Uploaded Files' },
];

export default function LibraryPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedClass, setSelectedClass] = useState<string>('all');
    const [selectedTerm, setSelectedTerm] = useState<string>('all');

    // Filter resources
    const filteredResources = mockResources.filter((resource) => {
        // Tab filter
        if (activeTab !== 'all' && resource.type !== activeTab) return false;

        // Search filter
        if (searchQuery && !resource.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        return true;
    });

    return (
        <div className="flex h-full flex-col">
            {/* Header */}
            <header className="border-b border-border bg-background px-6 py-4">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">My Library</h1>
                        <p className="text-sm text-muted-foreground">
                            Access your saved notes, evaluations, and teaching resources.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search resources..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-64 pl-9"
                            />
                        </div>

                        {/* View toggle */}
                        <div className="flex rounded-lg border">
                            <Button
                                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                                size="icon"
                                className="h-9 w-9 rounded-r-none"
                                onClick={() => setViewMode('grid')}
                            >
                                <Grid3X3 className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                                size="icon"
                                className="h-9 w-9 rounded-l-none"
                                onClick={() => setViewMode('list')}
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Upload button */}
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Upload Resource
                        </Button>
                    </div>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
                    <TabsList>
                        {TABS.map((tab) => (
                            <TabsTrigger key={tab.value} value={tab.value}>
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
                {/* Filters */}
                <FilterBar
                    selectedClass={selectedClass}
                    selectedTerm={selectedTerm}
                    onClassChange={setSelectedClass}
                    onTermChange={setSelectedTerm}
                />

                {/* Resource Grid/List */}
                <ResourceGrid
                    resources={filteredResources}
                    viewMode={viewMode}
                />

                {/* Results count */}
                <div className="mt-6 text-sm text-muted-foreground">
                    Showing {filteredResources.length} of {mockResources.length} resources
                </div>
            </div>
        </div>
    );
}
