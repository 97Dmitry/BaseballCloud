export type DefSelectType = Array<{ value: string | number; label: string }>;

export default interface IInitialValueSideBarForm {
  defPosOne: DefSelectType;
  defPosTwo: DefSelectType;
  defThrow: DefSelectType;
  defBats: DefSelectType;
  defSchool: DefSelectType;
  defSchoolYear: DefSelectType;
  defTeams: DefSelectType;
  defFacility: DefSelectType;
}
