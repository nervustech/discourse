'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface FilterBarProps {
    selectedClass: string;
    selectedTerm: string;
    onClassChange: (value: string) => void;
    onTermChange: (value: string) => void;
}

const CLASSES = [
    { value: 'all', label: 'All Classes' },
    { value: 'grade-8-math', label: 'Grade 8 Math' },
    { value: 'grade-7-science', label: 'Grade 7 Science' },
    { value: 'grade-6-tech', label: 'Grade 6 Tech' },
];

const TERMS = [
    { value: 'all', label: 'All Terms' },
    { value: 'term-1', label: 'Term 1' },
    { value: 'term-2', label: 'Term 2' },
    { value: 'term-3', label: 'Term 3' },
];

export function FilterBar({
    selectedClass,
    selectedTerm,
    onClassChange,
    onTermChange,
}: FilterBarProps) {
    const selectedClassLabel = CLASSES.find((c) => c.value === selectedClass)?.label || 'All Classes';
    const selectedTermLabel = TERMS.find((t) => t.value === selectedTerm)?.label || 'All Terms';

    return (
        <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
                {/* Class Filter */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                            {selectedClassLabel}
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        {CLASSES.map((cls) => (
                            <DropdownMenuItem
                                key={cls.value}
                                onClick={() => onClassChange(cls.value)}
                            >
                                {cls.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Term Filter */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                            {selectedTermLabel}
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        {TERMS.map((term) => (
                            <DropdownMenuItem
                                key={term.value}
                                onClick={() => onTermChange(term.value)}
                            >
                                {term.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Sort */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                        Sort by: Recent
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Recent</DropdownMenuItem>
                    <DropdownMenuItem>Oldest</DropdownMenuItem>
                    <DropdownMenuItem>Name A-Z</DropdownMenuItem>
                    <DropdownMenuItem>Name Z-A</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
