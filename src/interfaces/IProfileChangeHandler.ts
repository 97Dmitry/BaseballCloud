type SelectFormType = { value: string; label: string };
type SelectFormTypeWithId = { value: number; label: string };
type ArraySelectFormType = Array<{ value: string; label: string }>;

export default interface IProfileChangeHandler {
  age: number;
  bats: SelectFormType;
  biography: string;
  facility: ArraySelectFormType;
  feet: number;
  firstName: string;
  inches: number;
  lastName: string;
  positionOne: SelectFormType;
  positionTwo: SelectFormType;
  school: SelectFormTypeWithId;
  schoolsYear: SelectFormType;
  teams: ArraySelectFormType;
  throws: SelectFormType;
  weight: number;
}
