import { Role } from '@/interfaces/role';
import { Area } from './area';

export interface User {
	_id: string;
	name: string;
	role: Role;
	username: string;
	imageURL: string;
	state: boolean;
	address: string;
	password?: string;
	area: Area;
}
