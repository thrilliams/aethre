import { FieldValues, UseFormReturn } from 'react-hook-form';

// creates an object containing each of the modified fields from a hook form
export const generateDirtyValues = <
	TFieldValues extends FieldValues = FieldValues,
	TContext = any,
	TTransformedValues extends FieldValues = TFieldValues
>(
	form: UseFormReturn<TFieldValues, TContext, TTransformedValues>
) => {
	const values = {};
	const formValues = form.getValues();

	for (const [key, modified] of Object.entries(form.formState.dirtyFields)) {
		if (!modified) continue;
		Object.assign(values, { [key]: formValues[key] });
	}

	return values;
};
