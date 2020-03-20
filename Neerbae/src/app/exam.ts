export interface Exam {
    autoShuffle: boolean;
    deleted: boolean;
    description: string;
    endDate: Date;
    examCode: string;
    examColor: string;
    examTitle: string;
    googleId: string;
    schoolLevel: Array<string>;
    schoolYear: string;
    startDate: string;
    status: number;
    subject: string;
    tags: Array<string>;
    tools: Array<string>;
    topic: string;
    __v: number;
    _id: string|null;
}
