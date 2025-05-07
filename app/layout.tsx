import '@/styles/globals.css';
import { getServerSession } from 'next-auth';
import { PropsWithChildren } from 'react';
import { TanStackQueryProvider } from './query-client-provider';
import { NextAuthSessionProvider } from './session-provider';
import { ThemeProvider } from './theme-provider';

export const dynamic = 'force-dynamic';

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children
}: PropsWithChildren) {
  const session = await getServerSession(); // Fetch the session on the server side

  return (
    <html lang="en">
      <head>
        <title>Cultivate Investor Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <!--  Social tags   --> */}
        <meta
          name="keywords"
          content="Add here your main keywords and separate them with a comma"
        />
        <meta name="description" content="Add here your website description" />
      </head>
      <body id={'root'} className="loading bg-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextAuthSessionProvider session={session}>
            <TanStackQueryProvider>
              <main id="skip">{children}</main>
            </TanStackQueryProvider>
          </NextAuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
