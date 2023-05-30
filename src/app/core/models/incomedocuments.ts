import { SelectOption } from './select-option';

export class Incomedocuments {
    id: string;
    idPersonal: number;
    job_Application: SelectOption;
    curricular_Synthesis: SelectOption;
    copia_Cedula: SelectOption;
    record_Work: SelectOption;
    reg_Fiscal_Information: SelectOption;
    labor_Ref_Verification: SelectOption;
    certification_Affidavit_Affidavit: SelectOption;
    license: SelectOption;
    medical_Certificate: SelectOption;
    point_Account: SelectOption;
    own_Title: SelectOption;
    job_Description: SelectOption;
    id_Confidentiality: SelectOption;
    id_Charge: SelectOption;
    department_Id: SelectOption;
    id_Area: SelectOption;
    id_Region: SelectOption;

    public static map(area: Incomedocuments):Incomedocuments{
        const newInstace = new Incomedocuments();
        newInstace.id = area.id;
        newInstace.job_Application  = area.job_Application;
        newInstace.curricular_Synthesis = area.curricular_Synthesis;
        newInstace.copia_Cedula = area.copia_Cedula;
        newInstace.record_Work = area.record_Work;
        newInstace.reg_Fiscal_Information = area.reg_Fiscal_Information;
        newInstace.labor_Ref_Verification = area.labor_Ref_Verification;
        newInstace.certification_Affidavit_Affidavit = area.certification_Affidavit_Affidavit;
        newInstace.license = area.license;
        newInstace.medical_Certificate = area.medical_Certificate;
        newInstace.point_Account = area.point_Account;
        newInstace.own_Title = area.own_Title;
        newInstace.job_Description = area.job_Description;
        newInstace.id_Confidentiality = area.id_Confidentiality;
        newInstace.id_Charge = area.id_Charge;
        newInstace.department_Id = area.department_Id;
        newInstace.id_Area = area.id_Area;
        newInstace.id_Region  = area.id_Region;
        return newInstace
    }
    public static mapForPost(area: Incomedocuments){
        let professionMap:any = {};
        if (area.id) {
            Object.assign(professionMap, {id: area.id}) 
        }
        Object.assign(professionMap, {id_datos_personales: area.idPersonal});
        Object.assign(professionMap, {solicitud_empleo  : area.job_Application.value});
        Object.assign(professionMap, {sintesis_curricular : area.curricular_Synthesis.value});
        Object.assign(professionMap, {copia_cedula : area.copia_Cedula.value});
        Object.assign(professionMap, {constancia_trabajo : area.record_Work.value});
        Object.assign(professionMap, {reg_informacion_fiscal : area.reg_Fiscal_Information.value});
        Object.assign(professionMap, {verificacion_ref_laborales : area.labor_Ref_Verification.value});
        Object.assign(professionMap, {certificacion_declaracion_jurada : area.certification_Affidavit_Affidavit.value});
        Object.assign(professionMap, {licencia : area.license.value});
        Object.assign(professionMap, {certificado_medico : area.medical_Certificate.value});
        Object.assign(professionMap, {punto_cuenta : area.point_Account.value});
        Object.assign(professionMap, {poseer_titulo : area.own_Title.value});
        Object.assign(professionMap, {descripcion_cargo : area.job_Description.value});
        Object.assign(professionMap, {id_confidencialidad : area.id_Confidentiality.value});
        Object.assign(professionMap, {id_cargo : area.id_Charge.value});
        Object.assign(professionMap, {id_departamento : area.department_Id.value});
        Object.assign(professionMap, {id_area : area.id_Area.value});
        Object.assign(professionMap, {id_region  : area.id_Region.value});
        return professionMap;
    }
    public static mapFromObject(areaspecialtiesObj: any) {
        if (!areaspecialtiesObj)
            return;
        let movtransfers = new Incomedocuments ();
        movtransfers.id = areaspecialtiesObj.id;
        movtransfers.job_Application=  new SelectOption(areaspecialtiesObj.Datossolicitud_empleo.id, areaspecialtiesObj.Datossolicitud_empleo.nombre);
        movtransfers.curricular_Synthesis=  new SelectOption(areaspecialtiesObj.Datossintesis_curricular.id, areaspecialtiesObj.Datossintesis_curricular.nombre);
        movtransfers.copia_Cedula=  new SelectOption(areaspecialtiesObj.Datoscopia_cedula.id, areaspecialtiesObj.Datoscopia_cedula.nombre);
        movtransfers.record_Work=  new SelectOption(areaspecialtiesObj.Datosconstancia_trabajo.id, areaspecialtiesObj.Datosconstancia_trabajo.nombre);
        movtransfers.reg_Fiscal_Information=  new SelectOption(areaspecialtiesObj.Datosreg_informacion_fiscal.id, areaspecialtiesObj.Datosreg_informacion_fiscal.nombre);
        movtransfers.labor_Ref_Verification=  new SelectOption(areaspecialtiesObj.Datosverificacion_ref_laborales.id, areaspecialtiesObj.Datosverificacion_ref_laborales.nombre);
        movtransfers.certification_Affidavit_Affidavit=  new SelectOption(areaspecialtiesObj.Datoscertificacion_declaracion_jurada.id, areaspecialtiesObj.Datoscertificacion_declaracion_jurada.nombre);
        movtransfers.license=  new SelectOption(areaspecialtiesObj.Datoslicencia.id, areaspecialtiesObj.Datoslicencia.nombre);
        movtransfers.medical_Certificate=  new SelectOption(areaspecialtiesObj.Datoscertificado_medico.id, areaspecialtiesObj.Datoscertificado_medico.nombre);
        movtransfers.point_Account=  new SelectOption(areaspecialtiesObj.Datospunto_cuenta.id, areaspecialtiesObj.Datospunto_cuenta.nombre);
        movtransfers.own_Title=  new SelectOption(areaspecialtiesObj.Datosposeer_titulo.id, areaspecialtiesObj.Datosposeer_titulo.nombre);
        movtransfers.job_Description=  new SelectOption(areaspecialtiesObj.Datosdescripcion_cargo.id, areaspecialtiesObj.Datosdescripcion_cargo.nombre);
        movtransfers.id_Confidentiality=  new SelectOption(areaspecialtiesObj.Datosid_confidencialidad.id, areaspecialtiesObj.Datosid_confidencialidad.nombre);
        movtransfers.id_Charge=  new SelectOption(areaspecialtiesObj.Datosid_cargo.id, areaspecialtiesObj.Datosid_cargo.nombre);
        movtransfers.department_Id=  new SelectOption(areaspecialtiesObj.departamento.id, areaspecialtiesObj.departamento.nombre);
        movtransfers.id_Area=  new SelectOption(areaspecialtiesObj.area.id, areaspecialtiesObj.area.nombre);
        movtransfers.id_Region=  new SelectOption(areaspecialtiesObj.region.id, areaspecialtiesObj.region.nombre);
       return movtransfers;
    }
}