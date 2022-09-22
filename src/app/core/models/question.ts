import { QuestionOption } from './question-option';
import { SelectOption } from './select-option';
export class Question {

    id: string;
    label: string;
    nameImput:string;
    order:number;
    inputType:SelectOption;
    className:string;
    score:string;
    valueResp:any | any[];
    valueType:string; // number, alphanumeric, etc
    required:boolean;
    minlength:number;
    maxlength:number;
    createAt:Date;
    updateAt:Date;
    options:Array<QuestionOption>;
    isReady:boolean;
    categoryBy:any



   


}
