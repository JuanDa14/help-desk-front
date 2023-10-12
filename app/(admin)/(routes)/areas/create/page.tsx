import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { FormArea } from '../_components/form-area';

const CreateAreaPage = async () => {
	return (
		<div className='p-6 space-y-3'>
			<div className='flex justify-between items-center gap-x-2'>
				<h3 className='text-lg font-medium'>Formulario de Area</h3>
				<Button>
					<Link href='/users'>Atras</Link>
				</Button>
			</div>
			<Separator />
			<div>
				<FormArea initialData={null} />
			</div>
		</div>
	);
};

export default CreateAreaPage;
