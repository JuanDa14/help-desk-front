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
		<div className='shadow'>
			<CardHeader>
				<CardTitle>Municipalidad de Pueblo Nuevo</CardTitle>
				<CardDescription>Inicia session con tu nombre de usuario</CardDescription>
			</CardHeader>
			<CardContent>
				<FormLogin />
			</CardContent>
		</div>
	);
};

export default LoginPage;
