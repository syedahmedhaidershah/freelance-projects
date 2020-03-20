export interface ExamInfo {
    _id?: string;
    examTitle: string,
    examColor: string,
    startDate: string,
    endDate: string,
    schoolLevel: Array<string>,
    schoolYear: string,
    subject: string,
    topic: string,
    description: string,
    tools: Array<string>,
    tags: Array<string>,
    status: number | -1;
    autoShuffle: boolean,
    deleted: number | 0;
}
