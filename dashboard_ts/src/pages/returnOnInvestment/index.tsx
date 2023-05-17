import { Box, useTheme, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import DashboardBox from "../../components/DashboardBox";
import { useState } from "react";
import { FormControl, InputLabel } from "@mui/material";
import BoxHeader from "../../components/BoxHeader";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
  stampDutyCalculation,
  RefinanceProps,
  formValueProps,
  calculateResults,
} from "./ROICalcUtils";
import ReturnComponent from "./ReturnComponent";

const initialRefinanceResults = {
  TotalCost: null,
  CashBack: null,
  CashLeftIn: null,
  ReturnOnInvestment: null,
  NetReturnOnInvestment: null,
  YearlyIncome: null,
  YearlyMortgageRepayment: null,
  NetIncome: null,
};
const initialFormValues = {
  id: 0,
  PurchasePrice: null,
  LTVPercentage: 0,
  MortgageRate: 0,
  AmountLent: 0,
  Deposit: null,
  StampDuty: null,
  RefurbCost: 0,
  LegalCosts: 2000,
  AdditionalCosts: 0,
  NewPrice: null,
  MonthlyRentalIncome: null,
  FirstTimeBuyer: false,
  CurrentMortgageRate: null,
  NewMortgageRate: null,
  IsRefurbished: false,
  RefinanceResults: initialRefinanceResults,
};
type Props = {};

const gridTemplateLargeScreens = `
"a d"
"b d"
"c d"
`;

const gridTemplateSmallScreen = `
    "a"
    "a"
    "b"
    "b"
    "c"
    "c"
    "d"
    "d"
`;

const gridForm = `
    "a b"
    "c d"
`;
const ReturnOnInvestment = (props: Props) => {
  const [formValues, setFormValues] =
    useState<formValueProps>(initialFormValues);
  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var myBool = event.target.checked;
    var id = event.target.id;
    if (id === "FirstTimeBuyer") {
      if (formValues.PurchasePrice !== null) {
        setFormValues({
          ...formValues,
          [id]: myBool,
          StampDuty: stampDutyCalculation(myBool, formValues.PurchasePrice),
        });
      }
    } else {
      setFormValues({
        ...formValues,
        [id]: myBool,
      });
    }
  };

  const { palette } = useTheme();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: parseInt(value),
    });
    if (
      formValues.Deposit !== null &&
      formValues.PurchasePrice !== null &&
      formValues.MonthlyRentalIncome !== null
    ) {
      setFormValues((previous) => ({
        ...previous,
        RefinanceResults: calculateResults(previous),
      }));
    }
  };
  const handlePurchasePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value);
    const isFirstTimeBuyer = formValues.FirstTimeBuyer;
    setFormValues({
      ...formValues,
      PurchasePrice: value,
      StampDuty: stampDutyCalculation(isFirstTimeBuyer, +value),
    });
    if (formValues.LTVPercentage !== null) {
      let amountLent: number = (+formValues.LTVPercentage * +value) / 100;
      let deposit = +value - amountLent;
      setFormValues((previousValues) => ({
        ...previousValues,
        AmountLent: amountLent,
        Deposit: deposit,
      }));
    } else {
      if (formValues.AmountLent !== null) {
        let ltvPercentage: number = (+formValues.AmountLent / +value) * 100;
        let deposit = +value - +formValues.AmountLent;
        setFormValues((previousValues) => ({
          ...previousValues,
          LTVPercentage: Math.round(ltvPercentage * 10000) / 10000,
          Deposit: deposit,
        }));
      } else {
        if (formValues.Deposit !== null) {
          let amountLent = +value - +formValues.Deposit;
          let ltvPercentage = (+amountLent / +value) * 100;
          setFormValues({
            ...formValues,
            LTVPercentage: Math.round(ltvPercentage * 10000) / 10000,
            AmountLent: amountLent,
          });
        }
      }
    }
    if (
      formValues.Deposit !== null &&
      formValues.PurchasePrice !== null &&
      formValues.MonthlyRentalIncome !== null
    ) {
      setFormValues((previous) => ({
        ...previous,
        RefinanceResults: calculateResults(previous),
      }));
    }
  };
  const handleLoanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (formValues.PurchasePrice == null) {
      setFormValues({
        ...formValues,
        [id]: parseInt(value),
      });
    } else {
      switch (id) {
        case "LTVPercentage": {
          let amountLent: number = (+formValues.PurchasePrice * +value) / 100;
          let deposit = +formValues.PurchasePrice - amountLent;
          setFormValues({
            ...formValues,
            LTVPercentage: parseInt(value),
            AmountLent: amountLent,
            Deposit: deposit,
          });
          break;
        }
        case "AmountLent": {
          let ltvPercentage: number =
            (+value / +formValues.PurchasePrice) * 100;
          let deposit = +formValues.PurchasePrice - +value;
          setFormValues({
            ...formValues,
            LTVPercentage: Math.round(ltvPercentage * 10000) / 10000,
            AmountLent: parseInt(value),
            Deposit: deposit,
          });
          break;
        }
        case "Deposit": {
          let amountLent = +formValues.PurchasePrice - +value;
          let ltvPercentage = (+amountLent / +formValues.PurchasePrice) * 100;
          setFormValues({
            ...formValues,
            LTVPercentage: Math.round(ltvPercentage * 10000) / 10000,
            AmountLent: amountLent,
            Deposit: parseInt(value),
          });
          break;
        }
        default:
          break;
      }
    }
    if (
      formValues.Deposit !== null &&
      formValues.PurchasePrice !== null &&
      formValues.MonthlyRentalIncome !== null
    ) {
      setFormValues((previous) => ({
        ...previous,
        RefinanceResults: calculateResults(previous),
      }));
    }
  };

  const isAboveMediumScreens = useMediaQuery("(min-width:1200px)");
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      component="form"
      gap="1.5rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: "repeat(2, minmax(370px,1fr))", //meaning that each column has min 370px
              gridTemplateRows: "repeat(3, minmax(230px, 1fr))",
              gridTemplateAreas: gridTemplateLargeScreens,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTemplateSmallScreen,
            }
      }
    >
      <DashboardBox gridArea="a">
        {/* ##########################
        ######## 1ST BOX OF FORMS ########
        #################################*/}
        <BoxHeader title="Purchase" subtitle="Purchase information" />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={formValues.FirstTimeBuyer}
                onChange={handleCheckBoxChange}
                name="First time buyer"
                id="FirstTimeBuyer"
              />
            }
            sx={{ color: palette.grey[200] }}
            label={
              <Typography variant="body2" color={palette.grey[200]}>
                First time buyer
              </Typography>
            }
          />
        </Box>

        <Box
          width="100%"
          height="50%"
          display="grid"
          component="form"
          gap="1.5rem"
          sx={{
            gridTemplateColumns: "repeat(2, minmax(100px,1fr))", //meaning that each column has min 370px
            gridTemplateRows: "repeat(2, 40px)",
            gridTemplateAreas: gridForm,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Box gridArea="a">
            <FormControl sx={{ m: 1 }}>
              <InputLabel
                htmlFor="outlined-adornment-amount"
                sx={{ color: palette.grey[200] }}
              >
                Purchase Price
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">
                    <Typography color={palette.grey[100]}>£</Typography>
                  </InputAdornment>
                }
                label="PurchasePrice"
                inputProps={{
                  style: {
                    color: palette.grey[100],
                    backgroundColor: palette.background.default,
                  },
                }}
                size="small"
                type="number"
                value={formValues.PurchasePrice}
                onChange={handlePurchasePriceChange}
              />
            </FormControl>
          </Box>
          <Box gridArea="b">
            <FormControl sx={{ m: 1, color: palette.grey[200] }}>
              <InputLabel
                htmlFor="outlined-adornment-amount"
                sx={{ color: palette.grey[200] }}
              >
                Stamp Duty
              </InputLabel>
              <OutlinedInput
                id="StampDuty"
                startAdornment={
                  <InputAdornment position="start">
                    <Typography color={palette.grey[100]}>£</Typography>
                  </InputAdornment>
                }
                label="StampDuty"
                inputProps={{
                  style: {
                    color: palette.grey[100],
                    backgroundColor: palette.background.default,
                  },
                }}
                size="small"
                type="number"
                value={formValues.StampDuty}
                onChange={handleInputChange}
              />
            </FormControl>
          </Box>
          <Box gridArea="c">
            <FormControl sx={{ m: 1 }}>
              <InputLabel
                htmlFor="outlined-adornment-amount"
                sx={{ color: palette.grey[200] }}
              >
                Legal Costs
              </InputLabel>
              <OutlinedInput
                id="LegalCosts"
                startAdornment={
                  <InputAdornment position="start">
                    <Typography color={palette.grey[100]}>£</Typography>
                  </InputAdornment>
                }
                label="LegalCosts"
                inputProps={{
                  style: {
                    color: palette.grey[100],
                    backgroundColor: palette.background.default,
                  },
                }}
                size="small"
                type="number"
                value={formValues.LegalCosts}
                onChange={handleInputChange}
              />
            </FormControl>
          </Box>
          <Box gridArea="d">
            <FormControl sx={{ m: 1 }}>
              <InputLabel
                htmlFor="outlined-adornment-amount"
                sx={{ color: palette.grey[200] }}
              >
                Additional Costs
              </InputLabel>
              <OutlinedInput
                id="AdditionalCosts"
                startAdornment={
                  <InputAdornment position="start">
                    <Typography color={palette.grey[100]}>£</Typography>
                  </InputAdornment>
                }
                label="AdditionalCosts"
                inputProps={{
                  style: {
                    color: palette.grey[100],
                    backgroundColor: palette.background.default,
                  },
                }}
                size="small"
                type="number"
                value={formValues.AdditionalCosts}
                onChange={handleInputChange}
              />
            </FormControl>
          </Box>
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="b">
        {/* ##########################
        ######## 2ND BOX OF FORMS ########
        ################################# */}
        <BoxHeader title="Loan" subtitle="Loan information" />
        <Box
          width="100%"
          height="75%"
          display="grid"
          component="form"
          gap="1.5rem"
          sx={{
            gridTemplateColumns: "repeat(2, minmax(100px,1fr))", //meaning that each column has min 370px
            gridTemplateRows: "repeat(2, 40px)",
            gridTemplateAreas: gridForm,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Box gridArea="a">
            <FormControl sx={{ m: 1 }}>
              <InputLabel
                htmlFor="outlined-adornment-amount"
                sx={{ color: palette.grey[200] }}
              >
                Amount Lent
              </InputLabel>
              <OutlinedInput
                id="AmountLent"
                startAdornment={
                  <InputAdornment position="start">
                    <Typography color={palette.grey[100]}>£</Typography>
                  </InputAdornment>
                }
                label="AmountLent"
                inputProps={{
                  style: {
                    color: palette.grey[100],
                    backgroundColor: palette.background.default,
                  },
                }}
                size="small"
                type="number"
                value={formValues.AmountLent}
                onChange={handleLoanChange}
              />
            </FormControl>
          </Box>
          <Box gridArea="b">
            <FormControl sx={{ m: 1, color: palette.grey[200] }}>
              <InputLabel
                htmlFor="outlined-adornment-amount"
                sx={{ color: palette.grey[200] }}
              >
                Loan To Value
              </InputLabel>
              <OutlinedInput
                id="LTVPercentage"
                endAdornment={
                  <InputAdornment position="end">
                    <Typography color={palette.grey[100]}>%</Typography>
                  </InputAdornment>
                }
                label="LTV Percentage"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  style: {
                    color: palette.grey[100],
                    backgroundColor: palette.background.default,
                  },
                }}
                size="small"
                value={formValues.LTVPercentage}
                onChange={handleLoanChange}
              />
            </FormControl>
          </Box>
          <Box gridArea="c">
            <FormControl sx={{ m: 1 }}>
              <InputLabel
                htmlFor="outlined-adornment-amount"
                sx={{ color: palette.grey[200] }}
              >
                Deposit
              </InputLabel>
              <OutlinedInput
                id="Deposit"
                startAdornment={
                  <InputAdornment position="start">
                    <Typography color={palette.grey[100]}>£</Typography>
                  </InputAdornment>
                }
                label="Deposit"
                type="number"
                inputProps={{
                  style: {
                    color: palette.grey[100],
                    backgroundColor: palette.background.default,
                  },
                }}
                size="small"
                value={formValues.Deposit}
                onChange={handleLoanChange}
              />
            </FormControl>
          </Box>
          <Box gridArea="d">
            <FormControl sx={{ m: 1 }}>
              <InputLabel
                htmlFor="outlined-adornment-amount"
                sx={{ color: palette.grey[200] }}
              >
                Mortgage Rate
              </InputLabel>
              <OutlinedInput
                id="MortgageRate"
                endAdornment={
                  <InputAdornment position="end">
                    <Typography color={palette.grey[100]}>%</Typography>
                  </InputAdornment>
                }
                label="MortgageRate"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  style: {
                    color: palette.grey[100],
                    backgroundColor: palette.background.default,
                  },
                }}
                size="small"
                value={formValues.MortgageRate}
                onChange={handleInputChange}
              />
            </FormControl>
          </Box>
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="c">
        {/* ##########################
        ######## 3RD BOX OF FORMS ########
        ################################# */}
        <BoxHeader
          title="Income and Refurbs"
          subtitle="Income from the property and Refurbishment/Refinance"
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={formValues.IsRefurbished}
                onChange={handleCheckBoxChange}
                name="IsRefurbished"
                id="IsRefurbished"
              />
            }
            sx={{ color: palette.grey[200] }}
            label={
              <Typography
                variant="body2"
                fontSize={11}
                color={palette.grey[200]}
              >
                Refurbish and Refinance
              </Typography>
            }
          />
        </Box>

        <Box
          width="100%"
          height="40%"
          display="grid"
          component="form"
          gap="1.5rem"
          sx={{
            gridTemplateColumns: "repeat(2, minmax(100px,1fr))", //meaning that each column has min 370px
            gridTemplateRows: "repeat(2, 40px)",
            gridTemplateAreas: gridForm,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Box gridArea="a">
            <FormControl sx={{ m: 1 }}>
              <InputLabel
                htmlFor="outlined-adornment-amount"
                sx={{ color: palette.grey[200] }}
              >
                Monthly Rental Income
              </InputLabel>
              <OutlinedInput
                id="MonthlyRentalIncome"
                startAdornment={
                  <InputAdornment position="start">
                    <Typography color={palette.grey[100]}>£</Typography>
                  </InputAdornment>
                }
                label="Monthly Rental Income"
                inputProps={{
                  style: {
                    color: palette.grey[100],
                    backgroundColor: palette.background.default,
                  },
                }}
                size="small"
                type="number"
                value={formValues.MonthlyRentalIncome}
                onChange={handleInputChange}
              />
            </FormControl>
          </Box>
          <Box gridArea="b">
            <FormControl sx={{ m: 1, color: palette.grey[200] }}>
              <InputLabel
                htmlFor="outlined-adornment-amount"
                sx={{ color: palette.grey[200] }}
              >
                Refurbishment Cost
              </InputLabel>
              <OutlinedInput
                id="RefurbCost"
                startAdornment={
                  <InputAdornment position="start">
                    <Typography color={palette.grey[100]}>£</Typography>
                  </InputAdornment>
                }
                label="Refurbishment Cost"
                inputProps={{
                  style: {
                    color: palette.grey[100],
                    backgroundColor: palette.background.default,
                  },
                }}
                size="small"
                type="number"
                value={formValues.RefurbCost}
                onChange={handleInputChange}
              />
            </FormControl>
          </Box>
          <Box gridArea="c">
            <FormControl sx={{ m: 1 }}>
              <InputLabel
                htmlFor="outlined-adornment-amount"
                sx={{ color: palette.grey[200] }}
              >
                New Property Price
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">
                    <Typography color={palette.grey[100]}>£</Typography>
                  </InputAdornment>
                }
                label="New Property Price"
                inputProps={{
                  style: {
                    color: palette.grey[100],
                    backgroundColor: palette.background.default,
                  },
                }}
                size="small"
                type="number"
                value={formValues.NewPrice}
                onChange={handleInputChange}
              />
            </FormControl>
          </Box>
          <Box gridArea="d">
            <FormControl sx={{ m: 1 }}>
              <InputLabel
                htmlFor="outlined-adornment-amount"
                sx={{ color: palette.grey[200] }}
              >
                New Mortgage Rate
              </InputLabel>
              <OutlinedInput
                id="NewMortgageRate"
                endAdornment={
                  <InputAdornment position="end">
                    <Typography color={palette.grey[100]}>%</Typography>
                  </InputAdornment>
                }
                label="New Mortgage Rate"
                inputProps={{
                  style: {
                    color: palette.grey[100],
                    backgroundColor: palette.background.default,
                  },
                }}
                size="small"
                type="number"
                value={formValues.NewMortgageRate}
                onChange={handleInputChange}
              />
            </FormControl>
          </Box>
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="d">
        <ReturnComponent props={formValues.RefinanceResults} />
      </DashboardBox>
    </Box>
  );
};

export default ReturnOnInvestment;
