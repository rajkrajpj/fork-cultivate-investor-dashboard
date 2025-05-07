'use client';

import { AlertCircle, Check, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';
import { useInvestor } from '@/hooks/useInvestor';

export enum PaymentMethodsEnum {
  ACH = 'ACH',
  CARD = 'CARD',
  WIRE = 'WIRE'
}

const payments = [
  {
    name: 'From bank account',
    value: PaymentMethodsEnum.ACH,
    icon: '/img/payments/bank-account.png',
    disabled: false
  },
  {
    name: 'Credit or debit',
    value: PaymentMethodsEnum.CARD,
    icon: '/img/payments/credit.png',
    disabled: false
  },
  {
    name: 'Bank wire',
    value: PaymentMethodsEnum.WIRE,
    icon: '/img/payments/bank-wire.png',
    disabled: false
  }
];

interface ReinvestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (payment: string, mfaVerified: boolean) => void;
}

// Mock implementation of useRiseUpAPIV1
const useRiseUpAPIV1 = () => {
  const getOnboardProgress = async (onboardingId: string) => {
    // Mock API response
    return {
      status: 200,
      data: {
        capturedData: {
          investingProfile: {
            paymentMethod: 'ACH'
          }
        },
        mfaVerified: true
      }
    };
  };

  return { getOnboardProgress };
};

export function ReinvestModal({
  isOpen,
  onClose,
  onContinue
}: ReinvestModalProps) {
  const { getOnboardProgress } = useRiseUpAPIV1();
  const {
    samePaymentMethod,
    setSamePaymentMethod,
    investor: userData
  } = useInvestor();

  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [mfaVerified, setMfaVerified] = useState<boolean>(false);

  const getPreviousPayment = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await getOnboardProgress(userData?.onboardingId);
      if (res.status === 200) {
        setPaymentMethod(
          res?.data?.capturedData?.investingProfile?.paymentMethod
        );
        setMfaVerified(res?.data?.mfaVerified);
      }
    } catch (error: any) {
      console.log('Validation MFA code error:', error);
      setErrorMessage(
        error?.response?.data?.message ||
          'Failed to load payment information. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      getPreviousPayment();
    }
  }, [isOpen]);

  const isYesButtonDisabled = useMemo(() => {
    const currentPaymentMethod = payments.find(
      (p) => p.value === paymentMethod
    );
    return currentPaymentMethod?.disabled || false;
  }, [paymentMethod]);

  const PaymentOption = () => {
    return (
      <div className="grid w-full grid-cols-3 gap-4">
        {payments.map((item, i) => (
          <div
            key={i}
            className={`flex h-[152px] w-full flex-col items-start justify-center gap-3 rounded-md border p-6 transition-colors ${
              item.disabled
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer hover:border-primary'
            } ${paymentMethod === item.value && !item.disabled ? 'border-primary bg-blue-600/10' : ''}`}
            onClick={() => {
              if (!item.disabled) {
                setPaymentMethod(item.value);
              }
            }}
          >
            <div className="h-9 w-9">
              <Image
                src={item.icon || '/placeholder.svg'}
                alt="Payment-icon"
                width={36}
                height={36}
              />
            </div>
            <div
              className={`text-sm ${paymentMethod === item.value && !item.disabled ? 'text-primary' : 'text-gray-900'}`}
            >
              {item.name}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Reinvest</DialogTitle>
        </DialogHeader>
        <Separator className="my-2" />

        {isLoading ? (
          <div className="flex h-40 w-full items-center justify-center">
            <Spinner size="lg" variant="primary" />
          </div>
        ) : errorMessage ? (
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
            <div className="flex justify-center">
              <Button onClick={() => getPreviousPayment()}>Try Again</Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-medium">
              Would you like to reinvest using the same payment method?
            </h2>

            <p className="text-sm text-gray-500">
              Your first payment method is{' '}
              <span className="font-semibold text-gray-900">
                {paymentMethod}
              </span>
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div
                className={`flex h-16 items-center gap-3 rounded-md border p-4 transition-colors ${
                  isYesButtonDisabled
                    ? 'cursor-not-allowed opacity-50'
                    : 'cursor-pointer hover:border-primary'
                } ${samePaymentMethod && !isYesButtonDisabled ? 'border-primary bg-blue-600/10' : ''}`}
                onClick={() => {
                  if (!isYesButtonDisabled) {
                    setSamePaymentMethod(true);
                  }
                }}
              >
                <Check className="h-8 w-8 text-green-600" />
                <span className="text-gray-900">Yes</span>
              </div>

              <div
                className={`flex h-16 items-center gap-3 rounded-md border p-4 transition-colors cursor-pointer hover:border-primary ${
                  !samePaymentMethod ? 'border-primary bg-blue-600/10' : ''
                }`}
                onClick={() => {
                  setSamePaymentMethod(false);
                }}
              >
                <X className="h-8 w-8 text-red-500" />
                <span className="text-gray-900">No</span>
              </div>
            </div>

            {samePaymentMethod && !isYesButtonDisabled && (
              <p className="text-sm text-gray-500">
                We will ask for an authentication code to ensure your identity.
              </p>
            )}

            {isYesButtonDisabled && (
              <p className="text-sm text-red-500">
                {paymentMethod} payment method is not available for
                reinvestment. Please choose a different payment method.
              </p>
            )}

            {!samePaymentMethod && <PaymentOption />}
          </div>
        )}

        <DialogFooter className="flex justify-between gap-4 sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {!isLoading && !errorMessage && (
            <Button
              onClick={() => onContinue(paymentMethod, mfaVerified)}
              disabled={
                (!samePaymentMethod && !paymentMethod) ||
                (samePaymentMethod && isYesButtonDisabled)
              }
            >
              Continue
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
