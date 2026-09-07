import type { FeatureUpdate } from "../types";

export const features: FeatureUpdate[] = [
  {
    id: "feat-international-transfers",
    category: "transfers",
    title: "International Transfers",
    headline: "Know where your transfer is",
    benefit: "Clearer progress and status information",
    description:
      "International transfers now provide clearer progress and status information, so you always know what stage your money is at.",
    isNew: true,
    ctaLabel: "See what's new",
    icon: "transfer",
    detail: {
      whatItDoes:
        "Every international transfer now shows a step-by-step status, from sent to received, instead of a single pending state.",
      whyUseful:
        "You no longer need to guess whether a transfer has cleared, is being processed by an intermediary bank, or has reached the recipient.",
      benefits: [
        "Step-by-step delivery status",
        "Estimated arrival window",
        "Notification when funds arrive",
      ],
    },
  },
  {
    id: "feat-virtual-card",
    category: "cards",
    title: "Virtual Card",
    headline: "A separate card for online purchases",
    benefit: "Create one in seconds",
    description:
      "Create a virtual card in seconds and manage it directly from the app.",
    isNew: true,
    ctaLabel: "Create virtual card",
    icon: "virtual-card",
    detail: {
      whatItDoes:
        "A virtual card is a separate card number linked to your account, created instantly for online purchases and subscriptions.",
      whyUseful:
        "Keeping online spending on a separate card number makes it easier to track subscriptions and limit exposure if a card number is ever compromised.",
      benefits: [
        "Ready to use in seconds",
        "Freeze or delete anytime",
        "Works with any online merchant",
      ],
    },
  },
  {
    id: "feat-card-controls",
    category: "cards",
    title: "Card Controls",
    headline: "More control over your card",
    benefit: "Manage usage from one place",
    description:
      "Manage online, international and ATM usage from one place.",
    isNew: false,
    ctaLabel: "Explore controls",
    icon: "card-controls",
    detail: {
      whatItDoes:
        "Card Controls lets you turn specific types of card usage on or off — online payments, international payments, and ATM withdrawals.",
      whyUseful:
        "If you're not travelling or shopping online, switching those off adds a layer of protection without freezing the whole card.",
      benefits: [
        "Toggle usage types independently",
        "Changes apply immediately",
        "No need to freeze the entire card",
      ],
    },
  },
  {
    id: "feat-savings-goal",
    category: "saving",
    title: "Savings Goal",
    headline: "Give your savings a purpose",
    benefit: "Set a target and track progress",
    description:
      "Set a target amount and a date, and watch your progress as you save toward it.",
    isNew: true,
    ctaLabel: "Create a goal",
    icon: "goal",
    detail: {
      whatItDoes:
        "Savings Goal lets you set aside money for something specific, with a visual tracker showing progress toward your target.",
      whyUseful:
        "Idle balance can be directed toward a purpose, making it easier to save consistently instead of leaving it in your current account.",
      benefits: [
        "Set a target amount and date",
        "Track progress automatically",
        "Move money in and out anytime",
      ],
    },
  },
  {
    id: "feat-spending-insights",
    category: "featured",
    title: "Spending Insights",
    headline: "See where your money goes",
    benefit: "Automatic monthly breakdown",
    description:
      "A monthly breakdown of your spending by category, updated automatically.",
    isNew: false,
    ctaLabel: "View insights",
    icon: "insights",
    detail: {
      whatItDoes:
        "Spending Insights groups your transactions into categories like groceries, transport, and bills, and shows how spending changes month to month.",
      whyUseful:
        "Understanding where money goes each month makes it easier to spot patterns and adjust spending without manual tracking.",
      benefits: [
        "Automatic categorization",
        "Month-over-month comparison",
        "No manual entry required",
      ],
    },
  },
  {
    id: "feat-scheduled-payments",
    category: "payments",
    title: "Scheduled Payments",
    headline: "Pay bills on your own schedule",
    benefit: "Set it once, pay automatically",
    description:
      "Schedule a one-time or repeating payment and we'll take care of the rest.",
    isNew: false,
    ctaLabel: "Schedule a payment",
    icon: "transfer",
    detail: {
      whatItDoes:
        "Scheduled Payments lets you set a future date, or a repeating interval, for any payment or transfer.",
      whyUseful:
        "Useful for rent, invoices, or any payment you make on a predictable schedule but don't want to trigger manually.",
      benefits: [
        "One-time or repeating schedules",
        "Edit or cancel anytime",
        "Reminder before each payment",
      ],
    },
  },
];
