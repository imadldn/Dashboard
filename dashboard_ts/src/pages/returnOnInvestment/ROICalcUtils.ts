export type RefinanceProps = {
  TotalCost: number | null;
  CashBack: number | null;
  CashLeftIn: number | null;
  ReturnOnInvestment: number | null;
  NetReturnOnInvestment: number | null;
  YearlyIncome: number | null;
  YearlyMortgageRepayment: number | null;
  NetIncome: number | null;
};

export type formValueProps = {
  id: number;
  PurchasePrice: number | null;
  LTVPercentage: number | null;
  MortgageRate: number;
  AmountLent: number;
  Deposit: number | null;
  StampDuty: number | null;
  RefurbCost: number;
  LegalCosts: number | null;
  AdditionalCosts: number;
  NewPrice: number | null;
  MonthlyRentalIncome: number | null;
  FirstTimeBuyer: boolean;
  CurrentMortgageRate: number | null;
  NewMortgageRate: number | null;
  IsRefurbished: boolean;
  RefinanceResults: RefinanceProps | null;
};

export const stampDutyCalculation = (
  firstTimeBuyer: Boolean,
  purchasePrice: number
) => {
  let firstStep: number = 250000;
  let firstStepTax: number = 0.05;
  let secondStep: number = 925000;
  let secondStepTax: number = 0.1;
  let thirdStep: number = 1500000;
  let thirdStepTax: number = 0.12;
  let additionalTax: number = 0.03;
  if (firstTimeBuyer) {
    additionalTax = 0;
    if (purchasePrice < 625000) {
      firstStep = 425000;
      firstStepTax = 0.05;
      secondStepTax = 0;
      thirdStepTax = 0;
    }
  }
  let taxableThird: number = 0; //taxable value third step
  let taxableSecond: number = 0; //taxable value second step
  let taxableFirst: number = 0; //taxable value first step
  if (purchasePrice > thirdStep) {
    taxableThird = purchasePrice - thirdStep;
    taxableSecond = thirdStep - secondStep;
    taxableFirst = secondStep - firstStep;
  } else {
    if (purchasePrice > secondStep) {
      taxableSecond = purchasePrice - secondStep;
      taxableFirst = secondStep - firstStep;
    } else {
      if (purchasePrice > firstStep) {
        taxableFirst = purchasePrice - firstStep;
      }
    }
  }
  let stampDuty =
    purchasePrice * additionalTax +
    taxableFirst * firstStepTax +
    taxableSecond * secondStepTax +
    taxableThird * thirdStepTax;
  return stampDuty;
};

export const calculateResults = (
  formFilledValues: formValueProps
): RefinanceProps | null => {
  if (
    formFilledValues.Deposit !== null &&
    formFilledValues.LegalCosts !== null &&
    formFilledValues.StampDuty !== null &&
    formFilledValues.MonthlyRentalIncome !== null
  ) {
    let totalCost: number =
      +formFilledValues.Deposit +
      +formFilledValues.LegalCosts +
      +formFilledValues.StampDuty +
      +formFilledValues.AdditionalCosts +
      +formFilledValues.RefurbCost;
    let totalCostwoDeposit: number =
      +formFilledValues.LegalCosts +
      +formFilledValues.StampDuty +
      +formFilledValues.AdditionalCosts +
      +formFilledValues.RefurbCost;
    let cashBack: number =
      +formFilledValues.IsRefurbished && formFilledValues.NewPrice !== null
        ? +formFilledValues.NewPrice * 0.75 -
          totalCostwoDeposit -
          +formFilledValues.AmountLent
        : 0;
    let moneyStillIn: number =
      +formFilledValues.IsRefurbished && formFilledValues.NewPrice !== null
        ? +formFilledValues.Deposit - cashBack
        : totalCost;
    let yearlyIncome: number = +formFilledValues.MonthlyRentalIncome * 12;

    let yearlyRepayment: number;
    if (formFilledValues.NewPrice === null) {
      yearlyRepayment =
        (+formFilledValues.AmountLent * +formFilledValues.MortgageRate) / 100;
    } else {
      if (formFilledValues.NewMortgageRate !== null) {
        yearlyRepayment =
          (+formFilledValues.NewPrice *
            0.75 *
            +formFilledValues.NewMortgageRate) /
          100;
      } else {
        yearlyRepayment = 0;
      }
    }

    let netIncome: number = yearlyIncome - yearlyRepayment;
    let returnOnInv: number = netIncome / moneyStillIn;
    let refinanceRes: RefinanceProps = {
      TotalCost: totalCost,
      CashBack: cashBack,
      CashLeftIn: moneyStillIn,
      ReturnOnInvestment: returnOnInv,
      NetReturnOnInvestment: returnOnInv * (1 - 0.2),
      YearlyIncome: yearlyIncome,
      YearlyMortgageRepayment: yearlyRepayment,
      NetIncome: netIncome,
    };
    return refinanceRes;
  } else {
    return null;
  }
};
