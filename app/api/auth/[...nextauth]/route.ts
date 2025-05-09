import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'admin' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: any, req) {
        console.log('credentials', credentials.email);

        const adminEmail = 'tbxadmin@tbx.com';
        const adminPass = 'tbxadmin123!';
        // Add logic here to look up the user from the credentials supplied
        const user = { id: '1', name: 'Admin', email: adminEmail };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  session: {
    maxAge: 60 * 60 * 3
  },
  pages: {
    signIn: '/dashboard/signin' // Custom sign-in page
  }
});

export { handler as GET, handler as POST };
