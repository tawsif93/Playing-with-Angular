

// export interface IFilterConfiguration<T> {
// 	title: string;
// 	fields: IFilterInput[] | IFilterSelect<T>[];
// }


// interface IBaseOptions {
// 	label?: string;
// 	placeholder: string;
// 	order?: number;
// 	fieldKey: string;
// 	controlType: FilterControlTypes;
// 	callback: (value: string) => void ;
	
// }

// export interface IFilterInput extends IBaseOptions {
// 	model: string;
// 	key?: FilterControlTypes;
// }

// export interface IFilterSelect<T> extends IBaseOptions {
// 	model: T;
// 	options: T[];
// 	viewKey?: string;
// 	valueKey?: string;
// 	callback: (value: T) => void ;
// }

// export enum FilterControlTypes {
// 	Dropdown = 'select',
// 	Search = 'text-field',
// }


export interface FilterConfig <T> {
	Title: string;
	Filters: (SearchBoxConfig | DropdownConfig<T>)[];
   }
   
   export interface SearchBoxConfig extends BasicConfig <string> {
	FilterType: FilterType.SEARCH_BOX;
   }
   
   export interface DropdownConfig <T> extends BasicConfig <T> {
	FilterType: FilterType.DROP_DOWN;
	Options: T[];
	ViewKey: string;
   }
   
   export interface BasicConfig <T> {
	FilterType: FilterType;
	Model: T;
	Label?: string;
	PlaceHolder?: string;
	callback: (val: T) => void;
   }
   
   export enum FilterType {
	SEARCH_BOX = 'SEARCH_BOX',
	DROP_DOWN = 'DROP_DOWN'
   }