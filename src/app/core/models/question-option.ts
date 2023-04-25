
/**
 * SelectOption model
 */
export class QuestionOption{

  public idOption: number;
  public value: string;
  public label: string;
  public score: string;
  public scoreByCharges: Array<any>;
  public disabled:boolean;
  public isSelected:boolean;
  public nameInputLabel:string;
  public nameInputValue:string;
  public nameInputScore:string;



  /**
   * Used to display data in forms.
   * @param value Select option value
   * @param label Select option value
   */
  constructor(
    value?: string,
    label?: string,
    disabled?:boolean
  ) {
    this.value = value;
    this.label = label;
    this.disabled = disabled
  }

  /**
   * Getter: value
   */
  get id(): number {
    return Number(this.value);
  }

  /**
   * Getter: label
   */
  get name(): string {
    return this.label;
  }

  /**
   * Convert the object to an string
   * @return string the serialized value
   */
  toString(): string {
    return this.name;
  }
}
