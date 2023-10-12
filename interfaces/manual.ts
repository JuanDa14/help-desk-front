import { Solution } from './solution';

export interface Manual {
	_id: string;
	title: string;
	description: string;
	description_solution: string;
	solution: Solution;
}
