import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetEconomicActivityResponse } from "./nomisType";
import { economicActivityModifiedResponse } from "./nomisUtils";

export const nomisApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.nomisweb.co.uk/api/v01/dataset",
  }),
  reducerPath: "nomisApiReducer",
  tagTypes: ["EconomicActivity"],
  endpoints: (build) => ({
    getEconomicActivity: build.query<any, void>({
      query: () =>
        "NM_2083_1.jsonstat.json?date=latest&geography=E00021377,E00000052&c2021_eastat_20=1002,7,1007,14...19&measures=20301",
      providesTags: ["EconomicActivity"],
      transformResponse: (response: any): GetEconomicActivityResponse => {
        const modifiedResponse = economicActivityModifiedResponse(response);
        return modifiedResponse;
      },
    }),
  }),
});

export const { useGetEconomicActivityQuery } = nomisApi;
