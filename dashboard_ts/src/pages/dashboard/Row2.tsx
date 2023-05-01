import React from "react";
import DashboardBox from "../../components/DashboardBox";
import { useGetEconomicActivityQuery } from "../../data/nomisApi";
import { useMemo } from "react";
import { useTheme } from "@mui/material";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import BoxHeader from "../../components/BoxHeader";
type Props = {};

const Row2 = (props: Props) => {
  const { palette } = useTheme();
  const renderColorfulLegendText = (value: String, entry: any) => {
    const color = palette.grey[300];

    return <span style={{ color }}>{value}</span>;
  };
  const { data, isLoading, isSuccess, isError, error } =
    useGetEconomicActivityQuery();
  const nomis = useMemo(() => {
    return data && data.economicActivity;
  }, [data]);
  console.log(nomis);
  return (
    <>
      <DashboardBox gridArea="d">
        <BoxHeader
          title="Economic activity"
          subtitle="Economic activity for the area searched"
          sideText="+4%"
        />
        <ResponsiveContainer maxHeight={200} width="100%" height="100%">
          <BarChart
            width={500}
            height={400}
            data={nomis}
            margin={{
              top: 15,
              right: 25,
              left: 10,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="colorEconomicActivity"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="economicStatus"
              style={{ fontSize: "10px" }}
              tickLine={false}
            />
            <YAxis style={{ fontSize: "10px" }} />
            <Tooltip />
            <Legend
              style={{ fontSize: "10px" }}
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
              formatter={renderColorfulLegendText}
            />
            <Bar dataKey="value" fill="url(#colorExpenses)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="e"></DashboardBox>
      <DashboardBox gridArea="f"></DashboardBox>
    </>
  );
};

export default Row2;
