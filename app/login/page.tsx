import AccountLoginPage from '@/app/account/login/page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer & Trade Sign In – European Heritage',
  description: 'Sign in to your European Heritage account or register for trade and retail privileges.',
};

export default function LoginPage() {
  return <AccountLoginPage />;
}
