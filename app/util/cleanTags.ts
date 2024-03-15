import { prisma } from './prisma.server';

// deletes all tags that are not present on any project
// called after every tag update
export const cleanTags = async () =>
	prisma.tag.deleteMany({
		// where projects none selects tags that have no relations
		where: { projects: { none: {} } }
	});
