import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { SelectOption } from './select-option';
export class Academicstudy {
    id: number;
    idPersonal: number;
    idProfesion: SelectOption;
    dateGraduated: any;
    dateGraduatedlt: any;
    dateGraduated1: NgbDate;
    public static map(academicstudy: Academicstudy): Academicstudy {
        const newInstace = new Academicstudy();
        newInstace.id = academicstudy.id;
        newInstace.idPersonal = academicstudy.idPersonal;
        newInstace.idProfesion = academicstudy.idProfesion;
        newInstace.dateGraduated = academicstudy.dateGraduated;
        return newInstace
    }
     //Variable Mapping Method
     public static mapForPost(academicstudy: Academicstudy) {
        let academicstudyMap: any = {};
        if (academicstudy.id) {
            Object.assign(academicstudyMap, { id: academicstudy.id })
        }
        Object.assign(academicstudyMap, { iddatos_personales: academicstudy.idPersonal });
        Object.assign(academicstudyMap, { idprofesion: academicstudy.idProfesion.value });
        Object.assign(academicstudyMap, { fecha_graduado: `${academicstudy.dateGraduated.year}-${academicstudy.dateGraduated.month}-${academicstudy.dateGraduated.day}` });
        return academicstudyMap;
    }
    //Object Map Method
    public static mapFromObject(academicstudyObj: any) {
        if (!academicstudyObj)
            return;
        let academicstudy = new Academicstudy ();
        academicstudy.id = academicstudyObj.id;
        if (academicstudyObj.profesion)
        academicstudy.idProfesion =  new SelectOption(academicstudyObj.profesion.id, academicstudyObj.profesion.nombre);
        academicstudy.idPersonal = academicstudyObj.idDatosPersonales;
        if (!academicstudy.dateGraduated)
        academicstudy.dateGraduated =academicstudyObj.Datosfecha_graduado;
        academicstudy.dateGraduatedlt =academicstudyObj.Datosfecha_graduado;
        const d = new Date(academicstudyObj.Datosfecha_graduado);
        academicstudy.dateGraduated = {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() + 1};
        return academicstudy;
    }
}