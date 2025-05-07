'use client';

import PasswordSignIn from '@/components/auth-ui/PasswordSignIn';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function AuthUI() {
  return (
    // <div className="my-auto mb-auto mt-8 flex flex-col md:max-w-full lg:max-w-[420px]">
    //   <p className="text-[32px] font-bold text-zinc-950 dark:text-white">
    //     Sign In
    //   </p>
    //   <p className="mb-2.5 mt-2.5 font-normal text-zinc-950 dark:text-zinc-400">
    //     Enter your email and password to sign in!
    //   </p>

    //   <PasswordSignIn />
    // </div>
    <div className="my-auto mb-auto mt-8 flex flex-col md:max-w-full lg:max-w-[420px]">
      <Card className="border-emerald-100 dark:border-emerald-900 shadow-sm">
        <CardHeader className="pb-2">
          <h1 className="text-[28px] font-bold text-zinc-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-sm font-normal text-zinc-600 dark:text-zinc-400">
            Enter your credentials to access your investment portfolio
          </p>
        </CardHeader>

        <CardContent>
          <PasswordSignIn />

          {/* <div className="mt-6 text-center">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              New to Cultivate?{' '}
              <a
                href="#"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Request investor access
              </a>
            </p>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
