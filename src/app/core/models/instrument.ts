import { SelectOption } from './select-option';
import { Question } from './question';
import { Section } from './section';
import { User } from './user';
import { QuestionOption } from './question-option';
import * as moment from 'moment';


export class Instrument {

    id: string;
    name: string;
    description:string;
    roles?:any[];
    users:Array<User>;
    dutation:string;
    unitType: SelectOption;
    expirationDate:any;
    publicationDate:Date;
    questionsByCategory:any;
    sections: Array<Section>;
    questions: Array<Question>;
    isPublished:boolean
    path:string;
    createAt:Date;
    updateAt:Date;


    /**
     * Process for post response of user
     * @param instrumentInput 
     * @returns 
     */
    public static mapForPostResponse(instrumentInput: Instrument){
        const instrumentOutput = {};

        Object.assign(instrumentOutput,{id: instrumentInput.id});
        Object.assign(instrumentOutput,{questions: this.getQuestionsResponse(instrumentInput.questions)});

        return instrumentOutput;
    }

    private static getQuestionsResponse(questions: Array<Question>){
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

    /**
     * Process for post instrument new
     * @param instrumentInput 
     * @returns 
     */
    public static mapForPost(instrumentInput: Instrument, users:number[]){
        const instrumentOutput = {};

        Object.assign(instrumentOutput,{name: instrumentInput.name});
        Object.assign(instrumentOutput,{dutation: parseInt(instrumentInput.dutation)});
        Object.assign(instrumentOutput,{unitType: {id: parseInt(instrumentInput.unitType.value), label:instrumentInput.unitType.label} });
        Object.assign(instrumentOutput,{expirationDate: moment().year(instrumentInput.expirationDate.year).month(instrumentInput.expirationDate.month - 1).date(instrumentInput.expirationDate.day).format('YYYY-MM-DD') });
        Object.assign(instrumentOutput,{roles: instrumentInput.roles});
        Object.assign(instrumentOutput,{users: this.getUsers(users)});
        Object.assign(instrumentOutput,{questionsByCategory: instrumentInput.questionsByCategory =='true' ? 1 : 0});
        Object.assign(instrumentOutput,{description: instrumentInput.description});
        Object.assign(instrumentOutput,{path: instrumentInput.path? instrumentInput.path:null});
        Object.assign(instrumentOutput,{sections: this.getSections(instrumentInput.sections)});

        return instrumentOutput;
    }

    private static getUsers( users:number[]){
        return users.map((item)=>{
            return {userId:item}
        })
    }

    private static getSections(sections: Array<Section>){
        let sectionsOutput = [];

        sectionsOutput = sections.map((section:Section)=>{
            return {
                numberSection: section.numberSection,
                name: section.name? section.name : null,
                questions: this.getQuestions(section.questions)
            }
        })

        return sectionsOutput;

    }

    private static getQuestions(questions: Array<Question>){
        let questionsOutput = [];
        questionsOutput = questions.map((question:Question)=>{
            let questionOutput = {
                order: question.order,
                label: question.label,
                score: parseInt(question.score),
                required: question.required,
                categoryId:null,
                inputType: {id: parseInt(question.inputType.value) , label: question.inputType.label}
            };
            if(question.options && question.options.length > 0){
                Object.assign(questionOutput , {options: this.getOptions(question.options)})
            }
            return questionOutput;
        })

        return questionsOutput;
    }

    private static getOptions(options: Array<QuestionOption>){
        let optionsOutput;
        optionsOutput = options.map((opt:QuestionOption)=>{
            return {
                value: opt.value,
                label: opt.label,
                score: parseInt(opt.score)
            }
        });
        return optionsOutput;
    }

}
