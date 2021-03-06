
/**
 * SelectOption model
 */
export class SelectOption{

  public value: string;
  public label: string;
  public disabled:boolean;
  public link_google: string;
  public morada:string;

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
    this.value = String(value);
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
