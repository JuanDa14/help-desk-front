import { Preview } from '@/components/preview';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Problem, ProblemState } from '@/interfaces/problem';
import { authOptions } from '@/lib/auth-options';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function getProblem(id: string, access_token: string): Promise<Problem> {
	const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/problems/' + id, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
		cache: 'no-cache',
	});
	const problem = await res.json();
	return problem;
}

const Page = async ({ params }: { params: { problemId: string } }) => {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/login');
	}

	const problem = await getProblem(params.problemId, session.accessToken);

	return (
		<div className='p-6 space-y-4'>
			<div>
				<h3 className='text-xl font-bold'>{problem.title}</h3>
			</div>
			<Separator />
			<div className=' space-y-2'>
				<p>
					Registrado por: <span>{problem.user.name}</span>
				</p>
				<p>
					Fecha de registro: <span>{format(new Date(problem.createdAt), 'dd-MM-yyyy')}</span>
				</p>
				<p>
					Tipo de problema:
					<span> {problem.type}</span>
				</p>
				<div className='flex items-center gap-2'>
					<p>Estado: </p>
					<Badge
						className={cn(
							'text-xs',
							problem.state === ProblemState['En proceso'] && 'bg-gray-500',
							problem.state === ProblemState.Pendiente && 'bg-orange-500',
							problem.state === ProblemState.Resuelto && 'bg-emerald-500'
						)}
					>
						{problem.state}
					</Badge>
				</div>
				<div>
					<p>Desc. del problema</p>
					<div className='flex flex-col justify-center items-start border p-2 rounded-sm mt-2'>
						<Preview value={problem.description} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
