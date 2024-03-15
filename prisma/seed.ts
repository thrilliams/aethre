import { PrismaClient, SourceType } from '@prisma/client';
import { hashPassword } from '../app/util/auth/hashPassword';

const prisma = new PrismaClient();

async function main() {
	const user = await prisma.user.create({
		data: {
			email: 'juniper@aethre.co',
			name: 'juniper',

			auth: {
				// this is not my actual password
				create: { passwordHash: await hashPassword('just testing') }
			}
		}
	});

	console.log('seeding succeeded');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => await prisma.$disconnect());
