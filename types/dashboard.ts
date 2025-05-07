export type ChartDataPoint = {
  value: number;
};

// Dashboard card data types
export type CardData = {
  count: number;
  percentage: string;
  percentageLabel: string;
  average: number;
  committed: number;
  percentageCommitted: string;
  chartData: ChartDataPoint[];
  averageAmount: number;
  cardColor?: string;
  averageLabel: string;
};

export type PeriodData = {
  disbursedInvestors: CardData;
  abandons: CardData;
};

export type DashboardData = {
  today: PeriodData;
  yesterday: PeriodData;
  thisWeek: PeriodData;
  lastWeek: PeriodData;
  allTime: PeriodData;
};

// Funds and closings types
export type FundsAndClosingsData = {
  cleared: {
    investors: number;
    funds: number;
  };
  notCleared: {
    investors: number;
    funds: number;
  };
  lastDisbursement: {
    date: string;
    investors: number;
    funds: number;
  };
};

// Table data types
export type InvestorData = {
  id: number;
  email: string;
  name: string;
  amount: number;
  date: string;
};

export type TableData = {
  topInvestors: InvestorData[];
  topAbandons: InvestorData[];
};

// API response interfaces moved from useDashboardData.ts

// Type for table row data
export interface TableRowData {
  id: number;
  name: string;
  email: string;
  amount: number;
  date: string;
}

// Type for the Abandons API response
export interface AbandonsApiResponse {
  success: boolean;
  error: string | null;
  data: {
    totalAbandons: number;
    totalCommittedAmount: number;
    averageAbandons: number;
    averageCommittedAmount: number;
    percentageChange: {
      abandons: {
        value: number;
        period: string;
      };
      committedAmount: {
        value: number;
        period: string;
      };
    };
  };
}

// Type for the Disbursed Investors (Disbursements) API response
export interface DisbursementsApiResponse {
  success: boolean;
  error: string | null;
  data: {
    totalDisbursements: number;
    totalDisbursedAmount: number;
    averageDisbursements: number;
    averageDisbursedAmount: number;
    conversionRate: number;
    percentageChange: {
      disbursements: {
        value: number;
        period: string;
      };
      disbursedAmount: {
        value: number;
        period: string;
      };
    };
  };
}

// Type for Latest Batch Disbursement API response
export interface LatestBatchDisbursementApiResponse {
  success: boolean;
  data: {
    batchNumber: string;
    offeringId: string;
    offeringName: string;
    dateInitiated: string;
    numberOfInvestors: number;
    totalFundsDisbursed: number;
    disbursementCount: number;
    investors: Array<BatchInvestor>;
  };
}

// Type for a batch investor from the latest batch
export interface BatchInvestor {
  investorId: string;
  investorName: string;
  email: string;
  investorType: string;
  disbursements: Array<BatchDisbursement>;
  totalAmount: number;
}

// Type for a disbursement within a batch
export interface BatchDisbursement {
  id: string;
  disbursementNumber: string;
  type: string;
  shares: number;
  amount: number;
  dateInitiated: string;
}

// Type for Top Disbursements API response
export interface TopDisbursementsApiResponse {
  success: boolean;
  data: Array<{
    id: string;
    offeringId: string;
    amount: string;
    email: string;
    dateInitiated: string;
    investor: {
      firstName: string;
      lastName: string;
      email: string;
      investorType: string;
    };
  }>;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

// Type for Top Abandons API response
export interface TopAbandonsApiResponse {
  success: boolean;
  data: Array<{
    id: string;
    userId: string;
    investorId: string;
    offeringId: string;
    referralCodeId: string | null;
    email: string;
    investorType: string;
    lastCompletedStage: string;
    isFinished: boolean;
    isArchived: boolean;
    isAbandons: boolean;
    amount: string;
    documents: Record<string, any>;
    dateSignedSubscriptionAgreement: string | null;
    recoveryCode: string;
    progress: Record<string, any>;
    metadata: {
      email: string;
      lastName: string;
      firstName: string;
      ipAddress: string;
      referralCodeId: string | null;
    };
    createdAt: string;
    updatedAt: string;
    finishedAt: string | null;
    expiresAt: string;
    gaClientId: string | null;
    lastTrackedStage: string | null;
    offering: {
      id: string;
      name: string;
      description: string;
      status: string;
      regulationType: string;
    };
    investor: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string | null;
      investorType: string;
    };
    referralCode: null;
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
  }>;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
export interface YearlyDataPoint {
  year: string;
  investors?: number;
  amount?: number;
}

export interface WeeklyDataPoint {
  week: string;
  investors?: number;
  amount?: number;
}

export interface MonthlyDataPoint {
  month: string;
  investors?: number;
  amount?: number;
}

export interface ChartData {
  investorData: Array<YearlyDataPoint | WeeklyDataPoint | MonthlyDataPoint>;
  investmentData: Array<YearlyDataPoint | WeeklyDataPoint | MonthlyDataPoint>;
}
