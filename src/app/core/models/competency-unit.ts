import { ChargeDomainLevelPriority } from './charge-domainlevel-priority';
import { SelectOption } from './select-option';
    
export class CompetencyUnit {
    id: number;
    competency: SelectOption;  // icompetencia
    nivel1: SelectOption;  // unidad nivel 0
    unit: SelectOption;  // unidad
    chargesDomainLevelPriority: Array<ChargeDomainLevelPriority>;
    charge: SelectOption;  // icargo
    domainLevel: SelectOption;  // nivel dominio
    priority: number;  // prioridad// prioridad
    niveles: Array<SelectOption>;

    constructor() {
        this.id = null;
        this.competency = null;
        this.unit = null;
        this.charge = null;
        this.domainLevel = null;
        this.priority = null;
        this.chargesDomainLevelPriority = [];
    }
} 