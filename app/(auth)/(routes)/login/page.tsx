import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormLogin } from './_components/form-login';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
	const session = await getServerSession(authOptions);

	if (session?.user) {
		redirect('/');
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Municipalidad de Pueblo Nuevo</CardTitle>
			</CardHeader>
			<CardContent>
				<FormLogin />
			</CardContent>
		</Card>
	);
};

export default LoginPage;
