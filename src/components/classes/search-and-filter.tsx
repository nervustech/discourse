'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SearchAndFilterProps {
    onSearch: (query: string) => void;
    onFilterChange: (grades: string[]) => void;
    availableGrades?: string[];
}

export function SearchAndFilter({
    onSearch,
    onFilterChange,
    availableGrades = ['Grade 7', 'Grade 8'],
}: SearchAndFilterProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
    const [showNeedsAttention, setShowNeedsAttention] = useState(false);

    // Handle search input changes
    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        onSearch(value);
    };

    // Toggle a grade filter on/off
    const toggleGrade = (grade: string) => {
        const newSelected = selectedGrades.includes(grade)
            ? selectedGrades.filter((g) => g !== grade)
            : [...selectedGrades, grade];

        setSelectedGrades(newSelected);
        onFilterChange(newSelected);
    };

    return (
        <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search by student, class or stream..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-9"
                />
            </div>

            {/* Grade Filter Buttons */}
            <div className="flex items-center gap-2">
                {availableGrades.map((grade) => (
                    <Button
                        key={grade}
                        variant={selectedGrades.includes(grade) ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => toggleGrade(grade)}
                        className="h-8"
                    >
                        {grade}
                    </Button>
                ))}
            </div>

            {/* Needs Attention Filter */}
            <Badge
                variant={showNeedsAttention ? 'default' : 'outline'}
                className={cn(
                    'cursor-pointer px-3 py-1',
                    showNeedsAttention
                        ? 'bg-orange-500 hover:bg-orange-600'
                        : 'hover:bg-orange-100 dark:hover:bg-orange-900'
                )}
                onClick={() => setShowNeedsAttention(!showNeedsAttention)}
            >
                Needs Attention
            </Badge>
        </div>
    );
}
