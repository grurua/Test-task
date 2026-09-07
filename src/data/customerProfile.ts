import type { CustomerProfile } from "../types";

// A single consistent fictional customer profile powers every
// personalized surface in the Discover experience. Keeping this in one
// place prevents the feed from ever contradicting itself.
export const customerProfile: CustomerProfile = {
  firstName: "Giorgi",
  currentAccountBalance: 4350,
  averageSixMonthBalance: 4200,
  unusedStableAmount: 1000,
  eurTransactionsLastMonth: 11,
  electricityBillMonthsPaidManually: 6,
  transfersToFavorite: {
    name: "Nino",
    count: 8,
    periodMonths: 3,
  },
  recentTravelCountries: ["Cyprus", "Italy"],
  unusedFeatures: ["Virtual Card", "AutoPay", "Savings Goal"],
};
