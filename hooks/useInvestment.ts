'use client';

import { UserInvestmentRow } from '@/components/dashboard/main/interfaces';
import { useEffect, useState } from 'react';

interface UseInvestmentProps {
  offeringId?: string;
  limit?: number;
  page?: number;
}

interface UseInvestmentReturn {
  investments: UserInvestmentRow[];
  isLoading: boolean;
  error: Error | null;
  totalCount: number;
  refetch: () => Promise<void>;
}

/**
 * Custom hook to fetch and manage investment data
 *
 * @param {UseInvestmentProps} props - Configuration options
 * @returns {UseInvestmentReturn} Investment data and state
 */
export function useInvestment({
  offeringId,
  limit = 10,
  page = 1
}: UseInvestmentProps = {}): UseInvestmentReturn {
  const [investments, setInvestments] = useState<UserInvestmentRow[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  // Mock data for development purposes
  // In a real application, this would be replaced with an API call
  const mockInvestments: UserInvestmentRow[] = [
    {
      _id: '1',
      userId: 'user123',
      offeringId: offeringId || '9599ecdf-6f12-418c-90c7-3769bf663c7f',
      investmentId: 'inv123',
      itemId: 1,
      tradeId: 101,
      totalShares: 100,
      amount: 10000,
      paymentMethod: 'ACH',
      paymentProvider: 'NorthCapital',
      paymentId: 1001,
      isClearedForDisbursement: true,
      isClearedForDisbursementBy: null,
      isDisbursed: false,
      isDisbursedBy: null,
      settled: true,
      cancelled: false,
      cancelledBy: null,
      documentIsApproved: true,
      dateInitiated: '2023-05-01T10:00:00Z',
      dateLastUpdate: '2023-05-02T14:30:00Z',
      dateSettled: '2023-05-03T09:15:00Z',
      createdAt: '2023-05-01T10:00:00Z',
      updatedAt: '2023-05-02T14:30:00Z',
      remarks: [],
      transactionStatus: 'Completed',
      transactionFundStatus: 'Funds Received'
    },
    {
      _id: '2',
      userId: 'user456',
      offeringId: offeringId || '9599ecdf-6f12-418c-90c7-3769bf663c7f',
      investmentId: 'inv456',
      itemId: 2,
      tradeId: 102,
      totalShares: 50,
      amount: 5000,
      paymentMethod: 'Wire',
      paymentProvider: 'NorthCapital',
      paymentId: 1002,
      isClearedForDisbursement: false,
      isClearedForDisbursementBy: null,
      isDisbursed: false,
      isDisbursedBy: null,
      settled: false,
      cancelled: false,
      cancelledBy: null,
      documentIsApproved: true,
      dateInitiated: '2023-05-05T11:20:00Z',
      dateLastUpdate: '2023-05-06T16:45:00Z',
      dateSettled: null,
      createdAt: '2023-05-05T11:20:00Z',
      updatedAt: '2023-05-06T16:45:00Z',
      remarks: [],
      transactionStatus: 'Pending',
      transactionFundStatus: 'Funds Not Received'
    },
    {
      _id: '3',
      userId: 'user789',
      offeringId: offeringId || '9599ecdf-6f12-418c-90c7-3769bf663c7f',
      investmentId: 'inv789',
      itemId: 3,
      tradeId: 103,
      totalShares: 200,
      amount: 20000,
      paymentMethod: 'Check',
      paymentProvider: 'NorthCapital',
      paymentId: 1003,
      isClearedForDisbursement: true,
      isClearedForDisbursementBy: true,
      isDisbursed: true,
      isDisbursedBy: true,
      settled: true,
      cancelled: false,
      cancelledBy: null,
      documentIsApproved: true,
      dateInitiated: '2023-04-28T09:10:00Z',
      dateLastUpdate: '2023-05-10T13:25:00Z',
      dateSettled: '2023-05-10T13:25:00Z',
      createdAt: '2023-04-28T09:10:00Z',
      updatedAt: '2023-05-10T13:25:00Z',
      remarks: [],
      transactionStatus: 'Completed',
      transactionFundStatus: 'Invested'
    }
  ];

  const fetchInvestments = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real application, this would be an API call
      // const response = await fetch(`/api/investments?offeringId=${offeringId}&limit=${limit}&page=${page}`);
      // const data = await response.json();

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Filter by offeringId if provided
      const filteredData = offeringId
        ? mockInvestments.filter((inv) => inv.offeringId === offeringId)
        : mockInvestments;

      setInvestments(filteredData);
      setTotalCount(filteredData.length);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to fetch investments')
      );
      console.error('Error fetching investments:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, [offeringId, limit, page]);

  return {
    investments,
    isLoading,
    error,
    totalCount,
    refetch: fetchInvestments
  };
}
