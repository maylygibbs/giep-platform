import { Question } from './question';
import { User } from './user';


export class Section {

    id: string;
    name: string;
    numberSection:number;
    description:string;
    questions: Array<Question>;
    createAt:Date;
    updateAt:Date;
    users:Array<User>;

}
