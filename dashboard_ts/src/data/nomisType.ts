/*export interface Index {
  [name: number]: number;
}

export interface Label {
  [name: number]: string;
}
export interface Category {
  index: Index;
  label: Label;
}
export interface C2021_eastat_20 {
  category: Category;
}
export interface Dimension {
  c2021_eastat_20: C2021_eastat_20;
}
*/

export interface GetEconomicActivityResponse {
  economicActivity: Array<EconomicActivityRecord>;
}

export interface EconomicActivityRecord {
  economicStatus: String;
  value: Number;
}
