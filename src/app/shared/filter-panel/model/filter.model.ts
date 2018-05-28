

export interface IFilterConfiguration {
	title: string;
	fields: IBaseOptions[];
}


interface IBaseOptions {
	label: string;
	placeholder?: string;
	order?: number;
	controlType: FilterControlTypes;
	callback: (value) => void ;
}

export interface IFilterInput extends IBaseOptions {
	key?: string;
}

export interface IFilterSelect extends IBaseOptions {
	options: any[];
	viewKey?: string;
	valueKey?: string;
}

export enum FilterControlTypes {
	Dropdown = 'select',
	Search = 'text-field',
}
