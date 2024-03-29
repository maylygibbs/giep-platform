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
    questionsByCategory:boolean;
    globalsPoints:boolean;
    sections: Array<Section>;
    questions: Array<Question>;
    isPublished:boolean
    isExpired:boolean;
    isEditable:boolean;
    answered:string;
    answeredDate:any;
    path:string;
    order:number;
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
        Object.assign(instrumentOutput,{questions: this.getQuestionsResponse(instrumentInput.sections)});

        return instrumentOutput;
    }

    private static getQuestionsResponse(sections: Array<Section>){
        const questionsOutput:any[]=[];
         sections.forEach((section:Section)=>{
            const arrayTemp = section.questions.map((question:Question)=>{
                let valueResp;
                
                if( question.inputType.label === 'select-multiple'  || question.inputType.label === 'checkbox'){
                    valueResp = question.valueResp.map((vr)=>{
                        return {idOption: vr, text:null}
                    })
                }else if(question.inputType.label === 'select' || question.inputType.label === 'radio'){
                    valueResp = [{idOption:question.valueResp, text:null}];

                }else{
                    if(question.inputType.label=='date'){
                        valueResp = [{idOption:null, text: moment().year(question.valueResp.year).month(question.valueResp.month - 1).date(question.valueResp.day).format('YYYY-MM-DD')}];
                    }else{
                        valueResp = [{idOption:null, text:question.valueResp}];
                        
                    }                    
                }
                return {
                    id:question.id,
                    response: valueResp
                }
            });
            questionsOutput.push(...arrayTemp);
        });
        return questionsOutput;
    }


   /* */


    /**
     * Process for post instrument new
     * @param instrumentInput 
     * @returns 
     */
    public static mapForPost(instrumentInput: Instrument, roles: string[], users:number[]){
        const instrumentOutput = {};

        if (instrumentInput.id) {
            Object.assign(instrumentOutput,{id: instrumentInput.id});  
        }

        Object.assign(instrumentOutput,{name: instrumentInput.name});
        Object.assign(instrumentOutput,{dutation: parseInt(instrumentInput.dutation)});
        Object.assign(instrumentOutput,{unitType: {id: parseInt(instrumentInput.unitType.value), label:instrumentInput.unitType.label} });
        Object.assign(instrumentOutput,{expirationDate: moment().year(instrumentInput.expirationDate.year).month(instrumentInput.expirationDate.month - 1).date(instrumentInput.expirationDate.day).format('YYYY-MM-DD') });
        Object.assign(instrumentOutput,{roles: roles});
        //Object.assign(instrumentOutput,{users: this.getUsers(users)});
        Object.assign(instrumentOutput,{questionsByCategory: instrumentInput.questionsByCategory ? 1 : 0});
        Object.assign(instrumentOutput,{puntosGlobales: instrumentInput.globalsPoints ? 1 : 0});
        Object.assign(instrumentOutput,{description: instrumentInput.description});
        Object.assign(instrumentOutput,{path: instrumentInput.path? instrumentInput.path:null});
        if(!instrumentInput.id || (instrumentInput.id && instrumentInput.isEditable)){
            Object.assign(instrumentOutput,{sections: this.getSections(instrumentInput.sections)});
        }
        

        return instrumentOutput;
    }

    public static getUsers( users:number[]){
        return users.map((item)=>{
            return {userId:item}
        })
    }

    private static getSections(sections: Array<Section>){
        let sectionsOutput = [];

        sectionsOutput = sections.map((section:Section)=>{
            const sectionOutput = {
                numberSection: section.numberSection,
                name: section.name? section.name : null,
                questions: this.getQuestions(section.questions)
            };
            if(section.id){
                Object.assign(sectionOutput, {id: section.id})
            }
            return sectionOutput

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
                required: question.required ? question.required : false,
                categoryId: question.categoryBy ? parseInt(question.categoryBy) : null,
                inputType: {id: parseInt(question.inputType.value) , label: question.inputType.label}
            };
            if(question.options && question.options.length > 0){
                Object.assign(questionOutput , {options: this.getOptions(question.options)})
            }
            if(question.id){
                Object.assign(questionOutput, {id: question.id});
            }
            return questionOutput;
        });
        return questionsOutput;
    }

    private static getOptions(options: Array<QuestionOption>){
        let optionsOutput;
        optionsOutput = options.map((opt:QuestionOption)=>{
            const optionOutput = {
                value: opt.value,
                label: opt.label
            }

            if(opt.scoreByCharges.length>0){
              const scoreBycharges =  opt.scoreByCharges.map((item:any)=>{
                return {
                    idCargo: parseInt(item.id),
                    score: parseFloat(item.score)
                }
              })
              Object.assign(optionOutput, {scoreBycharges: scoreBycharges});
            }else{
                Object.assign(optionOutput, {score: parseInt(opt.score)});
            }
            if(opt.idOption){
                Object.assign(optionOutput, {id: opt.idOption});
            }
            return optionOutput;

        });
        return optionsOutput;
    }

}
