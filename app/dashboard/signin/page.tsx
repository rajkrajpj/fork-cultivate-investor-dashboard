import DefaultAuth from '@/components/auth';
import AuthUI from '@/components/auth/AuthUI';

export default function SignIn() {
  return (
    <DefaultAuth>
      <div>
        <AuthUI />
      </div>
    </DefaultAuth>
  );
}
