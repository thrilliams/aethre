import { SourceType } from '@prisma/client';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { z } from 'zod';
import { SlugPattern } from '~/util/SlugPattern';
import {
	ZodActionReturnType,
	generateSubmitHelper,
	parseSchemaOrError
} from '~/util/actionHelpers';
import { getUserOrError } from '~/util/auth/sessions';
import { prisma } from '~/util/prisma.server';

export const UpdateProjectParams = z.object({
	id: z.string().uuid(),

	// String  @db.VarChar(64)
	title: z.string().max(64).optional(),
	// String? @unique @db.VarChar(64)
	slug: z.string().max(64).regex(SlugPattern).nullable().optional(),

	// DateTime @default(now())
	createdAt: z.coerce.date().optional(),
	// DateTime @default(now())
	updatedAt: z.coerce.date().optional(),

	// Tag[]
	tags: z.string().array().optional(),

	// published Boolean @default(false)
	published: z.boolean().optional(),

	// content String
	content: z.string().optional(),

	// summary String @db.Char(256)
	summary: z.string().max(256).optional(),

	// sourceUrl String?
	sourceUrl: z.string().url().nullable().optional(),
	// sourceType SourceType @default(NONE)
	sourceType: z.enum(Object.values(SourceType) as [SourceType, ...SourceType[]]).optional(),

	// splash String? @db.Char(64)
	splash: z.string().max(64).nullable().optional()
});

export type UpdateProjectParams = z.infer<typeof UpdateProjectParams>;

export const action = async ({
	request
}: ActionFunctionArgs): Promise<ZodActionReturnType<typeof UpdateProjectParams>> => {
	// ensure authentication
	const user = await getUserOrError(request);

	// await new Promise<void>((res) => setTimeout(() => res(), 1000));

	const { id, tags, ...parsed } = await parseSchemaOrError(request, UpdateProjectParams);

	try {
		await prisma.project.update({
			where: { id, authorId: user.id },
			data: {
				...parsed,
				tags: {
					connect: tags?.map((tag) => ({ slug: tag }))
				}
			}
		});
	} catch {
		return json({ success: false });
	}

	return json({ success: true });
};

export const submitUpdateProject =
	generateSubmitHelper<typeof UpdateProjectParams>('/projects/manage/update');
