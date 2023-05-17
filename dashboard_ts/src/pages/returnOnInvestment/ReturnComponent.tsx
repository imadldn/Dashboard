import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { RefinanceProps } from "./ROICalcUtils";

interface Props {
  props: RefinanceProps | null;
}

const ReturnComponent = ({ props }: Props) => {
  console.log(props);
  if (!!props) {
    if (
      props.ReturnOnInvestment !== null &&
      props.CashBack !== null &&
      props.CashLeftIn !== null &&
      props.NetReturnOnInvestment !== null &&
      props.YearlyIncome !== null &&
      props.YearlyMortgageRepayment !== null &&
      props.NetIncome !== null
    ) {
      let ROI: number = props.ReturnOnInvestment;
      let cashBack: number = props.CashBack;
      let cashLeftIn: number = props.CashLeftIn;
      let netROI: number = props.NetReturnOnInvestment;
      let YealyIncome: number = props.YearlyIncome;
      let YealyRepayment: number = props.YearlyMortgageRepayment;
      let NetIncome: number = props.NetIncome;
      return (
        <Paper elevation={3} style={{ margin: "auto", marginTop: 40 }}>
          <Grid container rowSpacing={1}>
            <Grid
              item
              xs={12}
              display="flex"
              style={{ border: "1px solid grey" }}
            >
              <Typography variant="subtitle1" marginLeft={2}>
                Yearly Income: {YealyIncome}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              style={{ border: "1px solid grey" }}
            >
              <Typography variant="subtitle1" marginLeft={2}>
                Yearly Mortgage Payments: {YealyRepayment}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              style={{ border: "1px solid grey" }}
            >
              <Typography variant="subtitle1" marginLeft={2}>
                Net Yearly Income: {NetIncome}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              style={{ border: "1px solid grey" }}
            >
              <Typography variant="subtitle1" marginLeft={2}>
                Money back after remortgage and offsetting costs: {cashBack}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              style={{ border: "1px solid grey" }}
            >
              <Typography variant="subtitle1" marginLeft={2}>
                Net cash invested into the property: {cashLeftIn}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              style={{ border: "1px solid grey" }}
            >
              <Typography variant="subtitle1" marginLeft={2}>
                Return on cash invested: {Math.round(ROI * 10000) / 100}%
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      );
    } else {
      return <></>;
    }
  } else {
    return <></>;
  }
};
export default ReturnComponent;
