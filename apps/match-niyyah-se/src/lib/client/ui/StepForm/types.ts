/**
 * Field type options
 */
export type FieldType = 'select' | 'radio';

/**
 * Option for a select field
 */
export interface SelectOption {
	value: string | number;
	label: string;
}

/**
 * Grouped options for a select field
 */
export interface SelectGroup {
	label: string;
	options: SelectOption[];
}

/**
 * Option for a radio group
 */
export interface RadioOption {
	value: string | number | boolean;
	label: string;
}

/**
 * Configuration for a single step field
 */
export interface StepFieldConfig<K extends string> {
	id: K;
	question: string;
	description?: string;
	required?: boolean;
	validate?: (value: unknown) => boolean | string;

	// Field-specific configuration
	fieldType: FieldType;

	// For select fields
	selectOptions?: SelectOption[] | SelectGroup[];
	placeholder?: string;

	// For radio fields
	radioOptions?: RadioOption[];
}

/**
 * Callbacks for the StepForm component
 */
export interface StepFormCallbacks<T extends Record<string, unknown>> {
	onSubmit: (data: T) => void | Promise<void>;
	onStepChange?: (currentStep: number) => void;
	onValueChange?: (key: keyof T, value: T[keyof T]) => void;
}
