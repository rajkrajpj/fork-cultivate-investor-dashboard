'use client';

import type React from 'react';

import { CalendarIcon, Eye, EyeOff } from 'lucide-react';
import moment from 'moment-timezone';
import { forwardRef, useEffect, useRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { HiUpload } from 'react-icons/hi';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/useToast';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: any;
}

const validateFile = (file: File | null) => {
  if (!file) return { status: 'error', message: 'No file selected' };

  // Check file size (5MB limit)
  if (file.size > 5 * 1024 * 1024) {
    return { status: 'error', message: 'File size exceeds 5MB limit' };
  }

  // Check file type
  const validTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf'
  ];
  if (!validTypes.includes(file.type)) {
    return {
      status: 'error',
      message: 'Invalid file type. Please upload an image or PDF'
    };
  }

  return { status: 'success', message: 'File uploaded successfully', file };
};

const upperFirstLetter = (str = '') => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const ErrorMessage = ({ message }: { message: string }) => {
  return <p className="mt-1 text-sm text-red-500">{message}</p>;
};

const EditProfileModal = ({ isOpen, onClose, userData }: EditModalProps) => {
  const { toast } = useToast();
  const [showSSN, setShowSSN] = useState(false);
  const [fileList, setFileList] = useState<File | null>(null);
  const [uploadedDATAURL, setUploadedDATAURL] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    control,
    reset,
    watch,
    trigger,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onSubmit'
  });

  const defaultValues = {
    name:
      upperFirstLetter(userData?.firstName) +
      ' ' +
      upperFirstLetter(userData?.lastName),
    email: userData?.email || '',
    phoneNumber: userData?.phoneNumber || '',
    address:
      (userData?.address1 || '') +
      ',' +
      (userData?.city || '') +
      ',' +
      (userData?.state || '') +
      ',' +
      (userData?.zip || '') +
      ',' +
      'United States of America',
    birthday: userData?.birthday ? new Date(userData?.birthday) : new Date(),
    ssn: userData?.ssn || ''
  };

  const requiredField = [
    'name',
    'email',
    'phoneNumber',
    'address',
    'birthday',
    'ssn'
  ];

  const handleFileInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    const result = await validateFile(file);
    if (result?.status === 'success') {
      setFileList(result?.file);
      toastNotif(result.message, true);
    } else if (result?.status === 'error') {
      toastNotif(result.message, false);
    }
  };

  const toastNotif = (msg: string, success: boolean) => {
    toast({
      title: msg,
      variant: success ? 'default' : 'destructive'
    });
  };

  const onSubmit = () => {
    trigger(requiredField);
    if (!isValid) {
      return;
    }
    toastNotif(`Profile saved.`, true);
    onClose();
  };

  const ExampleCustomInput = forwardRef<
    HTMLButtonElement,
    {
      value: string;
      onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    }
  >(({ value, onClick }, ref) => (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      ref={ref}
      className="w-full justify-between bg-gray-50 text-left font-normal"
    >
      {value ? value : 'Select date'}
      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
    </Button>
  ));

  useEffect(() => {
    if (fileList) {
      setUploadedDATAURL(URL.createObjectURL(fileList));
    } else {
      setUploadedDATAURL('');
    }
  }, [fileList]);

  useEffect(() => {
    if (userData) {
      reset(defaultValues);
    }
  }, [userData, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update your profile</DialogTitle>
        </DialogHeader>

        <div className="mt-4 grid gap-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1 flex justify-center">
              {!uploadedDATAURL ? (
                <Avatar className="h-20 w-20">
                  <AvatarFallback>
                    {userData?.firstName?.charAt(0) || ''}
                    {userData?.lastName?.charAt(0) || ''}
                  </AvatarFallback>
                  <AvatarImage src="/placeholder.svg" alt="Profile" />
                </Avatar>
              ) : (
                <div className="h-20 w-20 overflow-hidden rounded-md">
                  <img
                    src={uploadedDATAURL || '/placeholder.svg'}
                    alt="Profile Photo"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>
            <div className="col-span-3 grid gap-2">
              <div>
                <Label
                  htmlFor="name"
                  className="text-xs font-semibold text-gray-500"
                >
                  NAME
                </Label>
                <Input
                  id="name"
                  className="mt-1 bg-gray-50"
                  placeholder="Name"
                  {...register(`name`, {
                    required: true,
                    minLength: 2,
                    validate: {
                      validName: (value: string) =>
                        /^[A-Za-z-'\s]+$/.test(value)
                    }
                  })}
                />
                {errors?.name?.type === 'minLength' && (
                  <ErrorMessage message={'Minimum of two characters.'} />
                )}
                {errors?.name?.type === 'validName' && (
                  <ErrorMessage message={'Invalid Name.'} />
                )}
                {errors?.name?.type === 'required' && (
                  <ErrorMessage message={'Name is required.'} />
                )}
              </div>
              <div>
                <input
                  accept="image/application/pdf/*"
                  id="uploadFile"
                  name="uploadFile"
                  type="file"
                  multiple={false}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileInput}
                />
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  className="mt-1"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <HiUpload className="mr-2 h-4 w-4" />
                  Change picture
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="email"
                className="text-xs font-semibold text-gray-500"
              >
                EMAIL
              </Label>
              <Input
                id="email"
                className="mt-1 bg-gray-50"
                placeholder="Email"
                {...register(`email`, {
                  required: true,
                  validate: {
                    validEmail: (value: string) =>
                      /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value)
                  }
                })}
              />
              {errors?.email?.type === 'validEmail' && (
                <ErrorMessage message={'Not a valid email.'} />
              )}
              {errors?.email?.type === 'required' && (
                <ErrorMessage message={'Email is required email.'} />
              )}
            </div>
            <div>
              <Label
                htmlFor="phoneNumber"
                className="text-xs font-semibold text-gray-500"
              >
                PHONE
              </Label>
              <Input
                id="phoneNumber"
                className="mt-1 bg-gray-50"
                placeholder="Phone"
                {...register(`phoneNumber`, {
                  required: true,
                  validate: {
                    validatePhone: (value: string) => !value.includes('_')
                  }
                })}
              />
              {errors?.phoneNumber?.type === 'validatePhone' && (
                <ErrorMessage message={'Invalid phone number.'} />
              )}
              {errors?.phoneNumber?.type === 'required' && (
                <ErrorMessage message={'Phone number is required.'} />
              )}
            </div>
          </div>

          <div>
            <Label
              htmlFor="address"
              className="text-xs font-semibold text-gray-500"
            >
              ADDRESS
            </Label>
            <Input
              id="address"
              className="mt-1 bg-gray-50"
              placeholder="Address"
              {...register(`address`, {
                required: true,
                minLength: 5
              })}
            />
            {errors?.address?.type === 'minLength' && (
              <ErrorMessage message={'Invalid address.'} />
            )}
            {errors?.address?.type === 'required' && (
              <ErrorMessage message={'Address is required.'} />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="birthday"
                className="text-xs font-semibold text-gray-500"
              >
                DATE OF BIRTH
              </Label>
              <div className="mt-1">
                <Controller
                  control={control}
                  name={'birthday'}
                  rules={{
                    required: true,
                    validate: {
                      invalidDate: (value: string) => moment(value).isValid()
                    }
                  }}
                  render={({ field }) => (
                    <ReactDatePicker
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      filterDate={(date) => new Date() > date}
                      placeholderText="Select date"
                      customInput={
                        <ExampleCustomInput value="" onClick={() => {}} />
                      }
                      selectsMultiple
                    />
                  )}
                />
              </div>
              {errors?.birthday?.type === 'invalidDate' && (
                <ErrorMessage message={'Not a valid birthday.'} />
              )}
              {errors?.birthday?.type === 'required' && (
                <ErrorMessage message={'Birthday is required.'} />
              )}
            </div>
            <div>
              <Label
                htmlFor="ssn"
                className="text-xs font-semibold text-gray-500"
              >
                SSN
              </Label>
              <div className="mt-1 relative">
                <Input
                  id="ssn"
                  className="bg-gray-50 pr-10"
                  placeholder="SSN"
                  type={showSSN ? 'text' : 'password'}
                  {...register(`ssn`, {
                    required: true,
                    maxLength: 11,
                    validate: {
                      invalidFormat: (value: string) =>
                        /^(?!0{3})(?!6{3})[0-8]\d{2}-(?!0{2})\d{2}-(?!0{4})\d{4}$/.test(
                          value
                        )
                    }
                  })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2"
                  onClick={() => setShowSSN(!showSSN)}
                >
                  {showSSN ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors?.ssn?.type === 'maxLength' && (
                <ErrorMessage message={'Maximum length number is 11'} />
              )}
              {errors?.ssn?.type === 'required' && (
                <ErrorMessage message={'SSN is required.'} />
              )}
              {errors?.ssn?.type === 'invalidFormat' && (
                <ErrorMessage
                  message={'Invalid SSN format, must be 1111-11-1111'}
                />
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={onSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
