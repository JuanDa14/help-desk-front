'use client';

import { useSession } from 'next-auth/react';

interface ProtectedComponentProps {
	areas:
		| Array<'CONTROL PATRIMONIAL' | 'TECNOLOGÍA DE LA INFORMACIÓN'>
		| ('CONTROL PATRIMONIAL' | 'TECNOLOGÍA DE LA INFORMACIÓN');
	children: React.ReactNode;
}

export const ProtectedAreaComponent = ({ areas, children }: ProtectedComponentProps) => {
	const { data: session } = useSession();

	if (!session?.user?.area.name) {
		return null;
	}

	if (typeof areas === 'string') {
		if (session?.user?.area.name !== areas) {
			return null;
		}
	}

	if (Array.isArray(areas)) {
		if (!areas.includes(session?.user?.area.name as any)) {
			return null;
		}
	}

	return <>{children}</>;
};
