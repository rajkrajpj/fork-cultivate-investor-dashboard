export type PeriodType =
  | 'today'
  | 'yesterday'
  | 'thisWeek'
  | 'lastWeek'
  | 'allTime';

export const getInvestorCardColor = (period: PeriodType) => {
  if (period === 'today' || period === 'yesterday') return 'bg-[#3C985C]';
  if (period === 'thisWeek' || period === 'lastWeek') return 'bg-[#3863AE]';
  return 'bg-[#2B2B2B]';
};

export const getAbandonCardColor = (period: PeriodType) => {
  if (period === 'today' || period === 'yesterday') return 'bg-[#5148B4]';
  if (period === 'thisWeek' || period === 'lastWeek') return 'bg-[#9C42AC]';
  return 'bg-[#2B2B2B]';
};

export const getPercentageColorClass = (percentageStr: string) => {
  if (!percentageStr) return '';
  return percentageStr.includes('+') ? 'text-green-500' : 'text-red-500';
};
