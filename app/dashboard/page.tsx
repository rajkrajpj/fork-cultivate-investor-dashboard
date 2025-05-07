import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const isLoggedIn = true;

  if (!isLoggedIn) {
    return redirect('/dashboard/signin');
  } else {
    redirect('/dashboard/main');
  }
}
