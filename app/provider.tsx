'use client';

import { ToastProvider } from '@/components/providers/toast-provider';
import { SessionProvider } from 'next-auth/react';

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<SessionProvider>
			{children}
			<ToastProvider />
		</SessionProvider>
	);
};
