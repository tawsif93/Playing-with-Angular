export interface FilterConfig<T> {
	Title: string;
	Default?: DefaultSearchBoxConfig;
	Filters: (SearchBoxConfig | DropdownConfig<T>)[];
}

export interface DefaultSearchBoxConfig extends SearchBoxConfig {
	Width?: string;
}

export interface SearchBoxConfig extends BasicConfig<string> {
	FilterType: FilterType.SEARCH_BOX;
}

export interface DropdownConfig<T> extends BasicConfig<T> {
	FilterType: FilterType.DROP_DOWN;
	Options: T[];
	ViewKey: string;
}

export interface BasicConfig<T> {
	FilterType: FilterType;
	Model: T;
	Label?: string;
	PlaceHolder?: string;
	Order?: number;
	callback: (val: T) => void;
}

export enum FilterType {
	SEARCH_BOX = 'SEARCH_BOX',
	DROP_DOWN = 'DROP_DOWN',
}
