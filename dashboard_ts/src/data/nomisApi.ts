import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetEconomicActivityResponse } from "./nomisType";
import { economicActivityModifiedResponse } from "./nomisUtils";

export const nomisApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.nomisweb.co.uk/api/v01/dataset",
  }),
  reducerPath: "nomisApiReducer",
  tagTypes: ["EconomicActivity", "AreaCode"],
  endpoints: (build) => ({
    getEconomicActivity: build.query<any, void>({
      query: () =>
        "NM_2083_1.jsonstat.json?date=latest&geography=E00000052&c2021_eastat_20=1002,7,1007,14...19&measures=20301",
      providesTags: ["EconomicActivity"],
      transformResponse: (response: any): GetEconomicActivityResponse => {
        const modifiedResponse = economicActivityModifiedResponse(response);
        return modifiedResponse;
      },
    }),
    getAreaCode: build.query<any, { postcode: string }>({
      query: (arg) => {
        const { postcode } = arg;
        console.log("arg: ", arg);
        return {
          url:
            "https://www.nomisweb.co.uk/api/v01/dataset/NM_144_1/geography/POSTCODE|" +
            postcode +
            ";299.def.sdmx.json",
        };
      },
      providesTags: ["AreaCode"],
      transformResponse: (response: any): String => {
        const modifiedResponse =
          response["structure"]["codelists"]["codelist"][0]["code"][0][
            "description"
          ]["value"];
        return modifiedResponse;
      },
    }),
  }),
});

export const { useGetEconomicActivityQuery, useGetAreaCodeQuery } = nomisApi;
