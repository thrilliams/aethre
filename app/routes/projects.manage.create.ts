import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { getUserOrError } from '~/util/auth/sessions';
import { prisma } from '~/util/prisma.server';

export const loader = async ({ request }: LoaderFunctionArgs) => {
	// ensure the user is authenticated
	const user = await getUserOrError(request);

	// make a blank project
	const project = await prisma.project.create({
		data: {
			title: '',

			authorId: user.id,

			content: '',
			summary: ''
		}
	});

	// go to the edit screen
	return redirect(`/projects/manage/${project.id}`);
};
