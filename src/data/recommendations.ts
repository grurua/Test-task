import type { Recommendation } from "../types";

// Base recommendation data. Live status (dismissed / completed) is layered
// on top at runtime by AppStateContext so components always read the
// current, interactive state rather than this static seed.
export const recommendations: Recommendation[] = [
  {
    id: "rec-deposit",
    type: "deposit",
    category: "save-money",
    headline: "You could have earned",
    description:
      "₾1,000 has remained in your current account for the last 6 months. If you had placed it into an eligible 6-month deposit, you could have earned approximately ₾150 more.",
    value: "+₾150",
    supportingText: "Based on your average balance over the last 6 months.",
    calculationNote:
      "Based on your average available balance during the previous 6 months and the current eligible deposit rate.",
    reason:
      "We noticed that an average of approximately ₾1,000 has remained available in your account during the last six months. We use this information to identify banking features that may be useful to you.",
    ctaLabel: "Explore deposit",
    secondaryLabel: "Why am I seeing this?",
    priority: 1,
    status: "active",
    metadata: { icon: "deposit", accent: "primary", emphasis: "hero" },
    comparison: {
      currentLabel: "Current account",
      currentAmount: 1000,
      currentTerm: "6 months",
      currentReturn: 0,
      proposedLabel: "Deposit",
      proposedAmount: 1000,
      proposedTerm: "6 months",
      proposedReturn: 150,
    },
  },
  {
    id: "rec-autopay",
    type: "autopay",
    category: "save-time",
    headline: "You do this every month",
    description:
      "You paid the same electricity bill manually for the last 6 months.",
    supportingText: "Set up AutoPay and avoid repeating it every month.",
    reason:
      "We noticed you've manually paid the same electricity bill for 6 consecutive months. AutoPay can take this off your plate.",
    ctaLabel: "Set up AutoPay",
    secondaryLabel: "Why am I seeing this?",
    priority: 2,
    status: "active",
    metadata: { icon: "autopay", accent: "neutral", emphasis: "standard" },
  },
  {
    id: "rec-eur-account",
    type: "eur-account",
    category: "cards",
    headline: "You spend in EUR often",
    description: "You made 11 EUR transactions last month.",
    supportingText: "An EUR account may reduce repeated currency conversions.",
    reason:
      "You made 11 transactions in EUR last month, plus recent activity in Cyprus and Italy. A EUR account may reduce conversion fees.",
    ctaLabel: "Explore EUR account",
    secondaryLabel: "Why am I seeing this?",
    priority: 3,
    status: "active",
    metadata: { icon: "eur", accent: "neutral", emphasis: "standard" },
  },
  {
    id: "rec-favorite-recipient",
    type: "favorite-recipient",
    category: "transfers",
    headline: "Make your next transfer faster",
    description: "You transferred money to Nino 8 times during the last 3 months.",
    reason:
      "You've sent money to Nino 8 times in the last 3 months. Saving them as a favorite makes future transfers quicker.",
    ctaLabel: "Save as favorite",
    secondaryLabel: "Why am I seeing this?",
    priority: 4,
    status: "active",
    metadata: { icon: "favorite", accent: "neutral", emphasis: "compact" },
  },
  {
    id: "rec-savings",
    type: "savings",
    category: "save-money",
    headline: "Your money could work harder",
    description: "Your average available balance was ₾4,200 during the last 6 months.",
    supportingText: "A savings goal can help you put idle balance to work.",
    reason:
      "Your average available balance stayed around ₾4,200 for 6 months, and you haven't set up a Savings Goal yet.",
    ctaLabel: "See savings options",
    secondaryLabel: "Why am I seeing this?",
    priority: 5,
    status: "active",
    metadata: { icon: "savings", accent: "neutral", emphasis: "standard" },
  },
];
