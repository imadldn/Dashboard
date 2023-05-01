import {
  EconomicActivityRecord,
  GetEconomicActivityResponse,
} from "./nomisType";

const EmploymentDict: Record<string, string> = {
  "Economically active (excluding full-time students):In employment":
    "Economically active: Employed",
  "Economically active (excluding full-time students): Unemployed":
    "Economically active: Unemployed",
  "Economically active and a full-time student:In employment":
    "Full-time student: Employed",
  "Economically active and a full-time student: Unemployed":
    "Full-time student: Unemployed",
  "Economically inactive: Retired": "Retired",
  "Economically inactive: Student": "Student",
  "Economically inactive: Looking after home or family":
    "Looking after home or family",
  "Economically inactive: Long-term sick or disabled": "Disabled",
  "Economically inactive: Other": "Economically inative: Other",
};

export const economicActivityModifiedResponse = (
  response: any
): GetEconomicActivityResponse => {
  let readData: GetEconomicActivityResponse = { economicActivity: [] };
  const dict = response.dimension.c2021_eastat_20.category.label;
  const keyDict = response.dimension.c2021_eastat_20.category.index;
  for (var key in dict) {
    if (!dict[key].includes("All categories")) {
      let record: EconomicActivityRecord = {
        economicStatus: EmploymentDict[dict[key]],
        value: response.value[keyDict[key]],
      };
      readData.economicActivity.push(record);
    }
    //i++;
  }
  return readData;
};
