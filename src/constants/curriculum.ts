// CBC Curriculum constants
export const GRADES = [
    'Grade 1',
    'Grade 2',
    'Grade 3',
    'Grade 4',
    'Grade 5',
    'Grade 6',
    'Grade 7',
    'Grade 8',
] as const;

export const SUBJECTS = [
    'Mathematics',
    'English',
    'Kiswahili',
    'Integrated Science',
    'Social Studies',
    'Religious Education',
    'Creative Arts',
    'Physical Education',
    'Agriculture',
    'Home Science',
    'Computer Studies',
] as const;

export const TERMS = [
    'Term 1',
    'Term 2',
    'Term 3',
] as const;

export type Grade = typeof GRADES[number];
export type Subject = typeof SUBJECTS[number];
export type Term = typeof TERMS[number];
