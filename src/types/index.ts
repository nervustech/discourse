// User roles and types
export type UserRole = 'teacher' | 'student' | 'parent' | 'admin';

export interface User {
    id: string;
    email: string;
    fullName: string;
    role: UserRole;
    avatarUrl?: string;
    schoolId?: string;
    createdAt: string;
}

// Class types
export interface Class {
    id: string;
    name: string;
    grade: string;
    stream?: string;
    subject: string;
    teacherId: string;
    schoolId: string;
    studentCount?: number;
    avgScore?: number;
    pendingReviews?: number;
    lastActive?: string;
    createdAt: string;
}

export interface Student {
    id: string;
    fullName: string;
    email?: string;
    avatarUrl?: string;
    status?: 'needs_attention' | 'average' | 'strong_performance';
    avgScore?: number;
}

// Resource types
export type ResourceType = 'lesson_note' | 'evaluation' | 'quiz' | 'uploaded';

export interface Resource {
    id: string;
    title: string;
    type: ResourceType;
    content?: Record<string, unknown>;
    classId?: string;
    className?: string;
    term?: string;
    createdBy: string;
    createdAt: string;
    metadata?: {
        submissionCount?: number;
        questionCount?: number;
        gradedAt?: string;
    };
}

// AI Hub types
export type AICommand = '#generate' | '#evaluate' | '#chat' | '#analyze';

export interface Conversation {
    id: string;
    title: string;
    userId: string;
    pinned: boolean;
    lastMessage?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Message {
    id: string;
    conversationId: string;
    role: 'user' | 'assistant';
    content: string;
    metadata?: {
        command?: AICommand;
        resourceId?: string;
    };
    createdAt: string;
}

// Performance types
export interface ClassPerformance {
    subject: string;
    score: number;
    trend?: number;
}

export interface ActivityItem {
    id: string;
    type: 'graded' | 'published' | 'delivered' | 'updated';
    title: string;
    description?: string;
    timestamp: string;
    metadata?: {
        score?: number;
        studentName?: string;
    };
}
