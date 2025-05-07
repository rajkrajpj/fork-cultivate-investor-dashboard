'use client';

import Footer from '@/components/footer/FooterAdmin';
import Navbar from '@/components/navbar/NavbarAdmin';
import { routes } from '@/components/routes';
import Sidebar from '@/components/sidebar/Sidebar';
import { Toaster } from '@/components/ui/toaster';
import { OpenContext } from '@/contexts/layout';
import { getActiveRoute } from '@/utils/navigation';
import { useSession } from 'next-auth/react';
import { redirect, usePathname } from 'next/navigation';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = (props: Props) => {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const { data: session, status } = useSession();
  console.log('session', session, status);
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    redirect('/dashboard/signin');
  }

  return (
    <OpenContext.Provider value={{ open, setOpen }}>
      <div className="dark:bg-background-900 flex h-full w-full bg-white">
        <Toaster />
        <Sidebar routes={routes} setOpen={setOpen} open={open} />
        <div className="h-full w-full dark:bg-zinc-950">
          <main
            className={`mx-2.5 flex-none transition-all dark:bg-zinc-950 md:pr-2 xl:ml-[328px]`}
          >
            <div className="mx-auto min-h-screen p-2 !pt-[90px] md:p-2 md:!pt-[118px]">
              {props.children}
            </div>
            <Navbar brandText={getActiveRoute(routes, pathname)} />
            <div className="p-3">
              <Footer />
            </div>
          </main>
        </div>
      </div>
    </OpenContext.Provider>
  );
};

export default DashboardLayout;
