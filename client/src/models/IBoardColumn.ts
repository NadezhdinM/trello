export interface IBoardCard {
}

export interface IBoardColumn {
	nameColumn: string;
	order: number;
	_id: string;
	cards: IBoardCard[];
	length: number;
}