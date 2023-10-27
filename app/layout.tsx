import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { RootProvider } from './provider';
import { Suspense } from 'react';
import Loading from './loading';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Municipalidad de Pueblo Nuevo',
	description: 'Municipalidad de Pueblo Nuevo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Suspense fallback={<Loading />}>
					<RootProvider>{children}</RootProvider>
				</Suspense>
			</body>
		</html>
	);
}
