import { Question } from './question';
import { Section } from './section';
import { User } from './user';


export class Instrument {

    id: string;
    name: string;
    description:string;
    roles?:any[];
    users:Array<User>;
    dutation:string;
    unitType: string;
    sections: Array<Section>;
    questions: Array<Question>;
    path:string;
    createAt:Date;
    updateAt:Date;



    public static mapForPost(instrumentInput: Instrument){
        const instrumentOutput = {};

        Object.assign(instrumentOutput,{id: instrumentInput.id});
        Object.assign(instrumentOutput,{questions: this.getQuestionsResponse(instrumentInput.questions)});

        return instrumentOutput;
    }

    public static getQuestionsResponse(questions: Array<Question>){
        const questionsOutput = questions.map((question:Question)=>{
                let valueResp;
                if(question.valueResp instanceof Array){
                    valueResp = question.valueResp.map((vr)=>{
                        return {idOption: vr, text:null}
                    })
                }else{
                    valueResp = [{idOption:question.valueResp, text:null}];
                }
                return {
                    id:question.id,
                    response: valueResp
                }
        });
        return questionsOutput;
    }


}
