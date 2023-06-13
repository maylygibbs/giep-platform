import { SelectOption } from './select-option';
export class Answers {
    id: string;
    answers: string;
    respuestas: SelectOption;
    public static map(answers: Answers):Answers{
        const newInstace = new Answers();
        newInstace.id = answers.id;
        newInstace.answers = answers.answers
        return newInstace
    }
    public static mapForPost(answers: Answers){
        let answersMap:any = {};
        if (answers.id) {
            Object.assign(answersMap, {id: answers.id}) 
        }
        Object.assign(answersMap, { Nombre: answers.answers });
        return answersMap;
    }
    public static mapFromObject(answersObj: any) {
        if (!answersObj)
            return;
        return new SelectOption(answersObj.id, answersObj.respuestas);
    }
}