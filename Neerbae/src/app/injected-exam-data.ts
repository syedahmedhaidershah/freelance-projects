import { Elements } from './elements';
import { ExamInfo } from './exam-info';
import { FormGroup } from '@angular/forms';

export interface InjectedExamData {
    elements: Array<Elements>;
    info: ExamInfo;
    elementInfoForms: Array<FormGroup>;
}
