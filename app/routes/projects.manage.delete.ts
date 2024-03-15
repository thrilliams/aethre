import { ActionFunctionArgs, json, redirect } from '@remix-run/node';
import { z } from 'zod';
import {
	ZodActionReturnType,
	generateSubmitHelper,
	parseSchemaOrError
} from '~/util/actionHelpers';
import { getUserOrError } from '~/util/auth/sessions';
import { prisma } from '~/util/prisma.server';

export const DeleteProjectParams = z.object({
	id: z.string().uuid()
});

export type DeleteProjectParams = z.infer<typeof DeleteProjectParams>;

export const action = async ({
	request
}: ActionFunctionArgs): Promise<ZodActionReturnType<typeof DeleteProjectParams>> => {
	const user = await getUserOrError(request);
	const { id } = await parseSchemaOrError(request, DeleteProjectParams);

	try {
		await prisma.project.delete({ where: { id, authorId: user.id } });
	} catch {
		return json({ success: false });
	}

	return redirect('/projects/manage');
};

export const submitDeleteProject =
	generateSubmitHelper<typeof DeleteProjectParams>('/projects/manage/delete');
