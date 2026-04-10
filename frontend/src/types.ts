export interface Faculty {
    id?: string;
    name: string;
    email: string;
    password?: string;
}

export interface Student {
    id?: string;
    name: string;
    rollNumber: string;
    email: string;
    password?: string;
}

export interface Event {
    id?: string;
    studentName: string;
    rollNumber: string;
    eventName: string;
    location: string;
    date: string;
    description: string;
    facultyId: string;
}

export type Role = 'Faculty' | 'Student';
