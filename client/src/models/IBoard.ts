import { IBoardColumn } from "./IBoardColumn";

export interface IBoard {
	access: string;
	bg: string;
	chief: string;
	columns: IBoardColumn[];
	name: string;
	_id: string;
	length: number;
}