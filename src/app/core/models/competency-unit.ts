import { SelectOption } from './select-option';

export class CompetencyUnit {
    id: number;
    charge: SelectOption;  // icargo
    domainLevel: SelectOption;  // nivel dominio
    competency: SelectOption;  // icompetencia
    unit: SelectOption;  // unidad
    priority: number;  // prioridad

    constructor() {
        this.id = null;
        this.charge = null;
        this.domainLevel = null;
        this.competency = null;
        this.unit = null;
        this.priority = null;
    }
} 