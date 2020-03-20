import { Mcqs } from './mcqs';
import { Hotspot } from './hotspot';
import { ItemsFree } from './items-free';

export interface Elements {
    examId: string;
    title: string;
    deleted: number | 0;
    description: string;
    imageUrl?: string;
    // questions: Array<Mcqs | Hotspot | Itemsfree>;
    questions?: Array<any>;
    questionForm?: Array<any>;
    __v?: number;
    _id?: string;
}
