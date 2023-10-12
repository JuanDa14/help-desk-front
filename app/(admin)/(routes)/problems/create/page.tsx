import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FormProblem } from '../_components/form-problem';

const CreateProblemPage = async () => {
	return (
		<div className='p-6 space-y-3'>
			<div className='flex justify-between items-center gap-x-2'>
				<h3 className='text-lg font-medium'>Formulario de Problema</h3>
				<Button>
					<Link href='/problems'>Atras</Link>
				</Button>
			</div>
			<Separator />
			<div>
				<FormProblem initialData={null} />
			</div>
		</div>
	);
};

export default CreateProblemPage;
