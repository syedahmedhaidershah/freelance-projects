export interface Mcqs {
    id: string;
    type: number;
    title: string;
    items: Array<string | number>;
    category: string;
    points: number;
}