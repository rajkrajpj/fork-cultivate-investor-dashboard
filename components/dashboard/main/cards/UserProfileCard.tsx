'use client';

import { useState } from 'react';
import {
  MdCalendarMonth,
  MdEmail,
  MdHome,
  MdOutlineCreditCard,
  MdOutlineModeEditOutline,
  MdPhone
} from 'react-icons/md';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import EditProfileModal from '@/components/modal/EditProfile';
import { upperFirstLetter } from '@/utils/helpers';
import type { UserData } from '../interfaces';

// Helper function to capitalize first letter

interface UserProfileCardProps {
  userData?: UserData;
  isLoading?: boolean;
}

export default function UserProfileCard({
  userData,
  isLoading = false
}: UserProfileCardProps) {
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);

  const onOpenModal = () => {
    setIsEditModalVisible(true);
  };

  // Get initials for avatar fallback
  const getInitials = () => {
    if (!userData) return '';
    return `${userData.firstName?.charAt(0) || ''}${userData.lastName?.charAt(0) || ''}`.toUpperCase();
  };

  if (isLoading) {
    return (
      <Card className="h-full w-full">
        <CardContent className="p-6">
          {/* Profile header skeleton */}
          <div className="mb-6 flex items-start gap-4">
            <Skeleton className="h-[87px] w-[87px] rounded-full" />
            <div className="flex flex-1 flex-col gap-2">
              <div>
                <Skeleton className="h-7 w-48" />
                <Skeleton className="mt-1 h-4 w-24" />
              </div>
              <Skeleton className="h-9 w-32" />
            </div>
          </div>

          {/* Profile details skeleton */}
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center">
                <Skeleton className="h-10 w-10 rounded-md" />
                <div className="ml-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="mt-1 h-5 w-48" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!userData) {
    return (
      <Card className="h-full w-full">
        <CardContent className="p-6">
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">No user data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full w-full">
      <CardContent className="p-6">
        {/* Profile header */}
        <div className="mb-6 flex items-start gap-4">
          <Avatar className="h-[87px] w-[87px] border-4 border-white">
            <AvatarFallback className="bg-blue-600 text-2xl text-primary-foreground">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col gap-2">
            <div>
              <h4 className="text-xl font-bold text-zinc-900 dark:text-white">
                {upperFirstLetter(userData.firstName)}{' '}
                {upperFirstLetter(userData.lastName)}
              </h4>
              <p className="text-sm text-muted-foreground">Investor</p>
            </div>
            <div>
              <Button
                size="sm"
                className="h-9 bg-zinc-900"
                onClick={onOpenModal}
              >
                <MdOutlineModeEditOutline className="mr-2 h-4 w-4" />
                Edit profile
              </Button>
            </div>
          </div>
        </div>

        {/* Profile details */}
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
              <MdEmail className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="ml-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">
                Email
              </div>
              <div className="text-sm font-medium text-zinc-900 dark:text-white">
                {userData.email}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
              <MdPhone className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="ml-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">
                Phone
              </div>
              <div className="text-sm font-medium text-zinc-900 dark:text-white">
                {userData.phoneNumber}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
              <MdHome className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="ml-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">
                Address
              </div>
              <div className="text-sm font-medium text-zinc-900 dark:text-white">
                {userData.address1}, {userData.city}, {userData.state}{' '}
                {userData.zip}, United States of America
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
              <MdCalendarMonth className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="ml-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">
                Date of Birth
              </div>
              <div className="text-sm font-medium text-zinc-900 dark:text-white">
                {userData.birthday
                  ? new Date(userData.birthday).toLocaleDateString()
                  : 'Not provided'}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
              <MdOutlineCreditCard className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="ml-4">
              <div className="text-xs font-semibold uppercase text-muted-foreground">
                SSN
              </div>
              <div className="text-sm font-medium text-zinc-900 dark:text-white">
                {userData?.ssn?.replace(/.{0,6}$/, '*-****') || 'Not provided'}
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <EditProfileModal
        isOpen={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        userData={userData}
      />
    </Card>
  );
}
