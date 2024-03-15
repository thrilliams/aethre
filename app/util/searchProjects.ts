import { z } from 'zod';
import { prisma } from './prisma.server';
import { User } from '@prisma/client';

export const SearchProjectOptions = z.object({
	query: z
		.string()
		.transform((string) => (string.length > 0 ? string : undefined))
		.optional(),
	page: z.coerce
		.number()
		.int()
		// i could put a max value here but i don't think i need to
		.min(1)
		.default(1)
		// also zero indexing
		.transform((page) => page - 1),
	perPage: z.coerce.number().int().min(1).max(30).default(10),
	orderBy: z.enum(['title', 'createdAt', 'updatedAt']).default('createdAt'),
	direction: z.enum(['asc', 'desc']).default('desc'),
	tags: z.string().array().default([])
});

export type SearchProjectOptions = z.infer<typeof SearchProjectOptions>;

export const searchProjects = async (
	{ query, page, perPage, orderBy, direction, tags }: SearchProjectOptions,
	user?: User
) => {
	// ts fuckery to pull an interface out of prisma
	type ProjectWhereInput = Exclude<
		Parameters<typeof prisma.project.findMany>[0],
		undefined
	>['where'];

	const predicate: ProjectWhereInput = user
		? { OR: [{ published: true }, { authorId: user.id }] }
		: { published: true };

	// if a query was passed, look for it in either the title, summary, or tags
	if (query !== undefined)
		predicate.OR = [
			{ title: { contains: query, mode: 'insensitive' } },
			{ summary: { contains: query, mode: 'insensitive' } }
		];

	// if tags were passed, require that the project meets each of them
	if (tags.length > 0) predicate.AND = tags.map((slug) => ({ tags: { some: { slug } } }));

	const projects = await prisma.project.findMany({
		where: predicate,
		include: { author: true, tags: true },
		orderBy: { [orderBy]: direction },
		take: perPage,
		skip: page * perPage
	});

	return [projects, predicate] as const;
};
