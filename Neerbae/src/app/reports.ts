import { Exam } from './exam';

export interface Reports {
    _id: string;
    googleId: string;
    totalCandidates: number;
    examCode: string;
    exam: Exam | null;
    gradedDate: string;
    createdAt: string;
    updatedAt: string;
}
