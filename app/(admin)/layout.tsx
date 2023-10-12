import React from 'react';
import { Navbar } from './_components/navbar';
import { Sidebar } from './_components/sidebar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';
import { Problem, ProblemState } from '@/interfaces/problem';

async function getNotifications(access_token: string): Promise<Problem[]> {
	const res = await fetch(
		process.env.NEXT_PUBLIC_API_URL + '/problems/state/' + ProblemState.Pendiente,
		{
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
			cache: 'no-cache',
		}
	);
	const problems = await res.json();
	return problems;
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		redirect('/login');
	}

	const notifications = await getNotifications(session.accessToken);

	return (
		<div className='w-full min-h-screen mx-auto'>
			<Navbar notifications={notifications} />
			<div className='hidden md:flex mt-16 w-48 flex-col fixed inset-y-0'>
				<Sidebar />
			</div>
			<main className='md:pl-56 pt-16 h-full'>{children}</main>
		</div>
	);
};

export default RootLayout;
