// Auth Imports
import { IRoute } from '@/types/types';
import { HiOutlineHome } from 'react-icons/hi2';

export const routes: IRoute[] = [
  {
    name: 'Investor Dashboard',
    path: '/dashboard/main',
    icon: <HiOutlineHome className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
    collapse: false
  }

  // {
  //   name: 'Abandons',
  //   path: '/dashboard/abandons',
  //   icon: <HiOutlineUser className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />,
  //   collapse: true,
  //   disabled: false
  // },
  // {
  //   name: 'All Applicants',
  //   path: '/dashboard/all',
  //   icon: (
  //     <HiOutlineUsers className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
  //   ),
  //   collapse: true,
  //   disabled: false
  // },
  // {
  //   name: 'Funds Not Received',
  //   path: '/dashboard/funds-not-received',
  //   icon: (
  //     <HiOutlineUsers className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
  //   ),
  //   collapse: true,
  //   disabled: false
  // },
  // {
  //   name: 'Funds Received',
  //   path: '/dashboard/funds-received',
  //   icon: (
  //     <HiOutlineUsers className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
  //   ),
  //   collapse: true,
  //   disabled: false
  // },
  // {
  //   name: 'Voided or Refunded',
  //   path: '/dashboard/voided-refunded',
  //   icon: (
  //     <HiOutlineUsers className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
  //   ),
  //   collapse: true,
  //   disabled: false
  // },
  // {
  //   name: 'Invested',
  //   path: '/dashboard/invested',
  //   icon: (
  //     <HiOutlineUsers className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
  //   ),
  //   collapse: true,
  //   disabled: false
  // }
  // {
  //   name: 'Subscription',
  //   path: '/dashboard/subscription',
  //   icon: (
  //     <HiOutlineCreditCard className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
  //   ),
  //   collapse: false,
  //   disabled: true
  // },
  // {
  //   name: 'Landing Page',
  //   path: '/home',
  //   icon: (
  //     <HiOutlineDocumentText className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
  //   ),
  //   collapse: false,
  //   disabled: true
  // },
  // {
  //   name: 'Pricing Page',
  //   path: '/pricing',
  //   icon: (
  //     <HiOutlineCurrencyDollar className="-mt-[7px] h-4 w-4 stroke-2 text-inherit" />
  //   ),
  //   collapse: false,
  //   disabled: true
  // }
];
