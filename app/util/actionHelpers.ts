import { TypedResponse, json } from '@remix-run/node';
import { SubmitFunction } from '@remix-run/react';
import { SafeParseReturnType, z } from 'zod';

export type ZodActionReturnType<T extends z.Schema> = TypedResponse<
	{ success: true } | { success: false; error?: z.ZodError<T> }
>;

export const generateSubmitHelper = <T extends z.Schema>(action: string) => {
	return (submit: SubmitFunction, data: z.input<T>, navigate = false) => {
		// mildly hacky, ensures json-safety
		// submit(JSON.parse(JSON.stringify(data)), {
		// 	method: 'POST',
		// 	encType: 'application/json',
		// 	action,
		// 	navigate
		// });
		return fetch(action, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
	};
};

export const parseSchemaFromRequest = async <S extends z.Schema, O = z.infer<S>>(
	request: Request,
	schema: S
): Promise<SafeParseReturnType<O, O>> => {
	const formData = await request.json();
	return schema.safeParseAsync(formData);
};

export const parseSchemaOrError = async <T extends z.Schema>(request: Request, schema: T) => {
	const result = await parseSchemaFromRequest<T>(request, schema);
	if (!result.success) throw json(result, { status: 400 });
	return result.data;
};
