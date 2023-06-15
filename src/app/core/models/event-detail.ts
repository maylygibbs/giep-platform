import { SelectOption } from './select-option';
import * as moment from 'moment';
import { MenuItem } from './menu.model';
import { EventApi } from '@fullcalendar/core';
import { AcreditationItem } from './accreditation-item';
export class EventDetail {

    id: string;
    title:string;
    eventDate: any;
    start:string;
    end:string;
    startHour:any;
    endHour:any;
    description:string;
    classNames:string; 
    usersInvited: any[];
    usersAccredited: any[];
    ownerEvent:string;
    accreditationRequired:boolean;
    accreditationItems:Array<AcreditationItem>;
    urlImg:string;



    public static mapForPost(eventDetail: EventDetail){
        let eventOut = {};
        Object.assign(eventOut, {start: this.getStartEvent(eventDetail)});
        Object.assign(eventOut, {end: this.getEndEvent(eventDetail)});
        Object.assign(eventOut, {title: eventDetail.title});
        Object.assign(eventOut, {description: eventDetail.description});
        Object.assign(eventOut, {classNames: eventDetail.classNames});
        Object.assign(eventOut, {users: this.getUsers(eventDetail.usersInvited)});
        Object.assign(eventOut, {acreditacion: eventDetail.accreditationRequired ? 1 : 0});
        if(eventDetail.accreditationRequired){
            Object.assign(eventOut, {accreditationItems: eventDetail.accreditationItems.map((item:AcreditationItem)=>{ return {id:item.id, quantity: item.quantity}})});
        }
        return eventOut;
    }

    public static getStartEvent(eventDetail: EventDetail){

        const hour = eventDetail.startHour.hour < 10 ? '0'+eventDetail.startHour.hour : eventDetail.startHour.hour;
        const minute = eventDetail.startHour.minute < 10 ? '0'+eventDetail.startHour.minute : eventDetail.startHour.minute;
        const second = '00';
        
        let startDate = moment(moment().year(eventDetail.eventDate.year).month(eventDetail.eventDate.month - 1).date(eventDetail.eventDate.day)).format('YYYY-MM-DD')+' '+hour+':'+minute+':'+second;
        return startDate;

    }

    public static getEndEvent(eventDetail: EventDetail){
        const hour = eventDetail.endHour.hour < 10 ? '0'+eventDetail.endHour.hour : eventDetail.endHour.hour;
        const minute = eventDetail.endHour.minute < 10 ? '0'+eventDetail.endHour.minute : eventDetail.endHour.minute;
        const second = '00';

        let endDate = moment(moment().year(eventDetail.eventDate.year).month(eventDetail.eventDate.month - 1).date(eventDetail.eventDate.day)).format('YYYY-MM-DD')+' '+hour+':'+minute+':'+second;
        return endDate;
    }

    private static getUsers(users:Array<string>){
        let usersOut = users?.map((item:string)=>{
            return {
                email: item
            }        
        });
        return usersOut || [];

    }


}
