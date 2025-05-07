// hooks/useInvestor.ts
import { useCallback, useEffect, useState } from 'react';

import { UserData } from '@/components/dashboard/main/interfaces';
import { format, parseISO } from 'date-fns';

/**
 * Interface for the return value of the useInvestor hook
 */
interface UseInvestorResult {
  investor: UserData;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  updateInvestor: (data: Partial<UserData>) => Promise<void>;
  isProcessing: boolean;
  formatDateOfBirth: (format?: string) => string;
  formatSsn: () => string;
  getFullName: () => string;
  getFullAddress: () => string;
  getAccountStatus: () => 'active' | 'blocked' | 'pending';
  hasCompletedKyc: () => boolean;
  samePaymentMethod: boolean;
  setSamePaymentMethod: (value: boolean) => void;
}

/**
 * Custom hook to manage investor data in fintech applications
 *
 * @param investorId - Optional ID of the investor to fetch, defaults to current user
 * @returns Object containing investor data and related functions
 */
export const useInvestor = (investorId?: string): UseInvestorResult => {
  const [investor, setInvestor] = useState<UserData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [samePaymentMethod, setSamePaymentMethod] = useState<boolean>(false);

  /**
   * Fetch investor data from the API
   */
  const fetchInvestorData = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, this would be an API call
      // Example with authentication headers:
      // const token = await getAuthToken();
      // const response = await fetch(`/api/investors/${investorId || 'current'}`, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      // if (!response.ok) {
      //   throw new Error(`Error fetching investor: ${response.statusText}`);
      // }
      // const data = await response.json();

      // For demo purposes, simulating API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Simulated response data
      const mockResponse: UserData = {
        _id: investorId || '60f7b0b3e6b1f3001c8c9a7b',
        username: 'investor_jane',
        userId: 'user_123456',
        onboardingId: 'onb_789012',
        offeringId: 'off_345678',
        firstName: 'Jane',
        lastName: 'Smith',
        birthday: '1985-06-15T00:00:00.000Z',
        phoneNumber: '+1 (555) 123-4567',
        email: 'jane.smith@example.com',
        role: 'investor' as any, // Type assertion as Role enum
        passwordAttempt: 0,
        hasSetPassword: true,
        ssn: '123-45-6789',
        address1: '123 Finance Street',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        signUpDate: '2023-01-15T14:30:00.000Z',
        isActive: true,
        blocked: false,
        accountType: 'individual',
        isToReceiveSetPasswordEmail: false,
        mfaSecret: 'secret_key_here',
        mfaVerified: true,
        documents: [
          {
            id: 'doc_1',
            type: 'id_verification',
            status: 'approved',
            dateUploaded: '2023-01-16T10:22:00.000Z'
          },
          {
            id: 'doc_2',
            type: 'proof_of_address',
            status: 'approved',
            dateUploaded: '2023-01-16T10:25:00.000Z'
          }
        ],
        createdAt: '2023-01-15T14:30:00.000Z',
        updatedAt: '2023-04-20T09:15:00.000Z',
        passwordExpired: '2023-10-15T14:30:00.000Z',
        userPayments: {
          totalInvested: 250000,
          lastPayment: {
            amount: 50000,
            date: '2023-04-10T11:30:00.000Z',
            status: 'completed'
          }
        },
        rememberMe: false,
        loginDate: '2023-05-01T08:45:00.000Z'
      };

      setInvestor(mockResponse);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to fetch investor data')
      );
      console.error('Error fetching investor data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [investorId]);

  /**
   * Update investor data
   * @param data - Partial user data to update
   */
  const updateInvestor = async (data: Partial<UserData>): Promise<void> => {
    setIsProcessing(true);
    setError(null);

    try {
      // In a real implementation:
      // const token = await getAuthToken();
      // const response = await fetch(`/api/investors/${investor?._id || 'current'}`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(data)
      // });
      // if (!response.ok) {
      //   throw new Error(`Error updating investor: ${response.statusText}`);
      // }
      // const updatedData = await response.json();

      // For demo purposes
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update local state with new data
      setInvestor((prev) =>
        prev ? { ...prev, ...data, updatedAt: new Date().toISOString() } : null
      );

      // In production, you might display a success notification here
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Failed to update investor data')
      );
      console.error('Error updating investor data:', err);
      // In production, you might display an error notification here
    } finally {
      setIsProcessing(false);
    }
  };

  // Initialize data fetch on component mount or investorId change
  useEffect(() => {
    fetchInvestorData();
  }, [fetchInvestorData]);

  /**
   * Format the investor's date of birth
   */
  const formatDateOfBirth = (dateFormat: string = 'MMMM d, yyyy'): string => {
    if (!investor?.birthday) return 'Not provided';
    try {
      return format(parseISO(investor.birthday), dateFormat);
    } catch (err) {
      console.error('Error formatting date of birth:', err);
      return 'Invalid date';
    }
  };

  /**
   * Format SSN for secure display
   */
  const formatSsn = (): string => {
    if (!investor?.ssn) return 'Not provided';
    // Only show last 4 digits of SSN
    return investor.ssn.replace(/^[\d-]+(?=\d{4})/, '***-**-');
  };

  /**
   * Get investor's full name
   */
  const getFullName = (): string => {
    if (!investor) return '';
    return `${investor.firstName} ${investor.lastName}`;
  };

  /**
   * Get investor's full address
   */
  const getFullAddress = (): string => {
    if (!investor) return '';
    return `${investor.address1}, ${investor.city}, ${investor.state} ${investor.zip}, United States of America`;
  };

  /**
   * Get investor's account status
   */
  const getAccountStatus = (): 'active' | 'blocked' | 'pending' => {
    if (!investor) return 'pending';
    if (investor.blocked) return 'blocked';
    if (investor.isActive) return 'active';
    return 'pending';
  };

  /**
   * Check if investor has completed KYC
   */
  const hasCompletedKyc = (): boolean => {
    if (!investor) return false;
    // Check if required documents are approved
    const requiredDocTypes = ['id_verification', 'proof_of_address'];
    return requiredDocTypes.every((docType) =>
      investor.documents.some(
        (doc) => doc.type === docType && doc.status === 'approved'
      )
    );
  };

  return {
    investor,
    isLoading,
    error,
    refetch: fetchInvestorData,
    updateInvestor,
    isProcessing,
    formatDateOfBirth,
    formatSsn,
    getFullName,
    getFullAddress,
    getAccountStatus,
    hasCompletedKyc,
    samePaymentMethod,
    setSamePaymentMethod
  };
};

/**
 * Type guard to check if an investor is accredited
 */
export function isAccreditedInvestor(investor: UserData | null): boolean {
  if (!investor) return false;
  return investor.accountType === 'accredited';
}

/**
 * Check if investor is eligible for specific investment types
 */
export function checkInvestmentEligibility(
  investor: UserData | null,
  minimumRequirements: {
    kycRequired?: boolean;
    mustBeAccredited?: boolean;
    minimumAccountAge?: number; // in days
  }
): { eligible: boolean; reasons: string[] } {
  const reasons: string[] = [];

  if (!investor) {
    return { eligible: false, reasons: ['No investor data available'] };
  }

  // Check KYC requirement
  if (minimumRequirements.kycRequired) {
    const hasApprovedDocs = investor.documents.some(
      (doc) => doc.status === 'approved'
    );
    if (!hasApprovedDocs) {
      reasons.push('KYC verification required');
    }
  }

  // Check accreditation
  if (
    minimumRequirements.mustBeAccredited &&
    investor.accountType !== 'accredited'
  ) {
    reasons.push('Accredited investor status required');
  }

  // Check account age
  if (typeof minimumRequirements.minimumAccountAge === 'number') {
    const accountCreationDate = new Date(investor.createdAt);
    const currentDate = new Date();
    const accountAgeInDays = Math.floor(
      (currentDate.getTime() - accountCreationDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (accountAgeInDays < minimumRequirements.minimumAccountAge) {
      reasons.push(
        `Account must be at least ${minimumRequirements.minimumAccountAge} days old`
      );
    }
  }

  return {
    eligible: reasons.length === 0,
    reasons
  };
}
