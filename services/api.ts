import type {
  ChartData,
  DashboardData,
  FundsAndClosingsData,
  TableData
} from '@/types/dashboard';

// Mock data for dashboard cards
const dashboardData: DashboardData = {
  today: {
    disbursedInvestors: {
      count: 1242,
      percentage: '+5%',
      percentageLabel: 'from last week',
      average: 14915,
      committed: 10489,
      percentageCommitted: '+5% from last week',
      chartData: [
        { value: 10 },
        { value: 40 },
        { value: 30 },
        { value: 70 },
        { value: 50 },
        { value: 90 },
        { value: 60 }
      ],
      averageAmount: 45993,
      averageLabel: 'Average'
    },
    abandons: {
      count: 20,
      percentage: '-14%',
      percentageLabel: 'from last month',
      average: 486,
      committed: 2312,
      percentageCommitted: '-2% from last week',
      chartData: [
        { value: 40 },
        { value: 60 },
        { value: 30 },
        { value: 70 },
        { value: 40 },
        { value: 90 },
        { value: 50 }
      ],
      averageAmount: 10287,
      averageLabel: 'Average'
    }
  },
  yesterday: {
    disbursedInvestors: {
      count: 901,
      percentage: '+4.2%',
      percentageLabel: 'from last week',
      average: 14915,
      committed: 8489,
      percentageCommitted: '+5% from last week',
      chartData: [
        { value: 20 },
        { value: 50 },
        { value: 40 },
        { value: 80 },
        { value: 60 },
        { value: 100 },
        { value: 70 }
      ],
      averageAmount: 44012,
      averageLabel: 'Average'
    },
    abandons: {
      count: 9,
      percentage: '-5%',
      percentageLabel: 'from last month',
      average: 436,
      committed: 1854,
      percentageCommitted: '-2% from last week',
      chartData: [
        { value: 30 },
        { value: 50 },
        { value: 20 },
        { value: 60 },
        { value: 30 },
        { value: 80 },
        { value: 40 }
      ],
      averageAmount: 7975,
      averageLabel: 'Average'
    }
  },
  thisWeek: {
    disbursedInvestors: {
      count: 1242,
      percentage: '+1.5%',
      percentageLabel: 'from last week',
      average: 14915,
      committed: 10489,
      percentageCommitted: '+5% from last week',
      chartData: [
        { value: 10 },
        { value: 40 },
        { value: 30 },
        { value: 70 },
        { value: 50 },
        { value: 90 },
        { value: 60 }
      ],
      averageAmount: 45993,
      cardColor: 'bg-blue-600',
      averageLabel: 'Average'
    },
    abandons: {
      count: 20,
      percentage: '-15%',
      percentageLabel: 'from last month',
      average: 486,
      committed: 2312,
      percentageCommitted: '-2% from last week',
      chartData: [
        { value: 40 },
        { value: 60 },
        { value: 30 },
        { value: 70 },
        { value: 40 },
        { value: 90 },
        { value: 50 }
      ],
      averageAmount: 10287,
      cardColor: 'bg-purple-600',
      averageLabel: 'Average'
    }
  },
  lastWeek: {
    disbursedInvestors: {
      count: 901,
      percentage: '+4.2%',
      percentageLabel: 'from last week',
      average: 14915,
      committed: 10489,
      percentageCommitted: '+5% from last week',
      chartData: [
        { value: 20 },
        { value: 50 },
        { value: 40 },
        { value: 80 },
        { value: 60 },
        { value: 100 },
        { value: 70 }
      ],
      averageAmount: 45993,
      cardColor: 'bg-blue-600',
      averageLabel: 'Average'
    },
    abandons: {
      count: 9,
      percentage: '-5%',
      percentageLabel: 'from last month',
      average: 436,
      committed: 2312,
      percentageCommitted: '-2% from last week',
      chartData: [
        { value: 30 },
        { value: 50 },
        { value: 20 },
        { value: 60 },
        { value: 30 },
        { value: 80 },
        { value: 40 }
      ],
      averageAmount: 10287,
      cardColor: 'bg-purple-600',
      averageLabel: 'Average'
    }
  },
  allTime: {
    disbursedInvestors: {
      count: 9208,
      percentage: '',
      percentageLabel: '',
      average: 210,
      committed: 100481,
      percentageCommitted: '',
      chartData: [
        { value: 20 },
        { value: 50 },
        { value: 40 },
        { value: 80 },
        { value: 60 },
        { value: 100 },
        { value: 70 }
      ],
      averageAmount: 10299,
      cardColor: 'bg-gray-900',
      averageLabel: 'Average per week'
    },
    abandons: {
      count: 924,
      percentage: '',
      percentageLabel: '',
      average: 24,
      committed: 20905,
      percentageCommitted: '',
      chartData: [
        { value: 30 },
        { value: 50 },
        { value: 20 },
        { value: 60 },
        { value: 30 },
        { value: 80 },
        { value: 40 }
      ],
      averageAmount: 2011,
      cardColor: 'bg-gray-900',
      averageLabel: 'Average per week'
    }
  }
};

// Mock data for funds and closings
const fundsAndClosingsData: FundsAndClosingsData = {
  cleared: {
    investors: 42,
    funds: 10421
  },
  notCleared: {
    investors: 20,
    funds: 5903
  },
  lastDisbursement: {
    date: 'MM/DD',
    investors: 430,
    funds: 32210
  }
};

// Mock data for tables
const tableData: TableData = {
  topInvestors: [
    {
      id: 1,
      email: 'michael@gmail.com',
      name: 'Michael Kane',
      amount: 18120,
      date: 'MM/YY'
    },
    {
      id: 2,
      email: 'robert@gmail.com',
      name: 'Robert Bare',
      amount: 15000,
      date: 'MM/YY'
    },
    {
      id: 3,
      email: 'john.c@gmail.com',
      name: 'John Cena',
      amount: 12000,
      date: 'MM/YY'
    },
    {
      id: 4,
      email: 'phil.w@gmail.com',
      name: 'Phil Wayne',
      amount: 10500,
      date: 'MM/YY'
    },
    {
      id: 5,
      email: 'john.s@gmail.com',
      name: 'John Smith',
      amount: 9800,
      date: 'MM/YY'
    }
  ],
  topAbandons: [
    {
      id: 1,
      email: 'michael@gmail.com',
      name: 'Michael Kane',
      amount: 18120,
      date: 'MM/YY'
    },
    {
      id: 2,
      email: 'robert@gmail.com',
      name: 'Robert Bare',
      amount: 15000,
      date: 'MM/YY'
    },
    {
      id: 3,
      email: 'john.c@gmail.com',
      name: 'John Cena',
      amount: 12000,
      date: 'MM/YY'
    },
    {
      id: 4,
      email: 'phil.w@gmail.com',
      name: 'Phil Wayne',
      amount: 10500,
      date: 'MM/YY'
    },
    {
      id: 5,
      email: 'john.s@gmail.com',
      name: 'John Smith',
      amount: 9800,
      date: 'MM/YY'
    }
  ]
};

// Mock data for charts
const chartData: ChartData = {
  investorData: [
    { month: 'Jan', investors: 2100 },
    { month: 'Feb', investors: 2400 },
    { month: 'Mar', investors: 3200 },
    { month: 'Apr', investors: 2800 },
    { month: 'May', investors: 2600 },
    { month: 'Jun', investors: 3202 },
    { month: 'Jul', investors: 3100 },
    { month: 'Aug', investors: 3400 },
    { month: 'Sep', investors: 3000 },
    { month: 'Oct', investors: 2800 }
  ],
  investmentData: [
    { month: 'Jan', amount: 5100 },
    { month: 'Feb', amount: 6400 },
    { month: 'Mar', amount: 9200 },
    { month: 'Apr', amount: 7800 },
    { month: 'May', amount: 6600 },
    { month: 'Jun', amount: 12291 },
    { month: 'Jul', amount: 11100 },
    { month: 'Aug', amount: 10400 },
    { month: 'Sep', amount: 9000 },
    { month: 'Oct', amount: 8800 }
  ]
};

// Mock API functions with artificial delay
export const fetchDashboardData = async (): Promise<DashboardData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return dashboardData;
};

export const fetchFundsAndClosingsData =
  async (): Promise<FundsAndClosingsData> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return fundsAndClosingsData;
  };

export const fetchTableData = async (): Promise<TableData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return tableData;
};

export const fetchChartData = async (): Promise<ChartData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return chartData;
};
