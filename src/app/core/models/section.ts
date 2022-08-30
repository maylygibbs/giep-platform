import { Question } from './question';


export class Section {

    id: string;
    name: string;
    numberSection:number;
    description:string;
    questions: Array<Question>;
    createAt:Date;
    updateAt:Date;




}
