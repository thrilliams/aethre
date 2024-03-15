import { LoaderFunctionArgs, json } from '@remix-run/node';
import { z } from 'zod';
import { SlugPattern } from '~/util/SlugPattern';
import {
	ZodActionReturnType,
	generateSubmitHelper,
	parseSchemaOrError
} from '~/util/actionHelpers';
import { getUserOrError } from '~/util/auth/sessions';
import { prisma } from '~/util/prisma.server';

export const UpsertTagParams = z.object({
	slug: z.string().regex(SlugPattern),
	name: z.string(),
	parentId: z.string().nullable().optional()
});

export type UpsertTagParams = z.infer<typeof UpsertTagParams>;

export const action = async ({
	request
}: LoaderFunctionArgs): Promise<ZodActionReturnType<typeof UpsertTagParams>> => {
	await getUserOrError(request);

	const parsed = await parseSchemaOrError(request, UpsertTagParams);

	await prisma.tag.upsert({
		where: { slug: parsed.slug },
		create: parsed,
		update: parsed
	});

	return json({ success: true });
};

export const submitUpsertTag = generateSubmitHelper<typeof UpsertTagParams>(
	'/projects/manage/tags/upsert'
);
