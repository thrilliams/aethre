import { SessionIdStorageStrategy, createSessionStorage } from '@remix-run/node';
import { prisma } from '../prisma.server';

// boilerplate for storing sessions with prisma
export const createPrismaSessionStorage = <SessionData, SessionFlashData>({
	cookie
}: {
	cookie: SessionIdStorageStrategy['cookie'];
}) =>
	createSessionStorage<SessionData, SessionFlashData>({
		cookie,

		async createData(data, expires) {
			// create a session in the database, with stringified data and a date if available
			const session = await prisma.session.create({
				data: {
					dataJson: JSON.stringify(data),
					expires
				}
			});

			return session.id;
		},

		async readData(id) {
			// find a session matching the supplied id
			const session = await prisma.session.findFirst({
				where: { id }
			});

			// if the session doesn't exist, return null
			if (session === null) return null;

			// if the session does exist, but is past its expiry, delete it and return null
			// TODO: as a consequence of browsers deleting cookies after they expire, database
			// entries are usually not deleted in this way. we need a cron job or similar to ensure
			// our sessions table doesn't become overly full
			if (session.expires !== null && session.expires.getTime() < Date.now()) {
				await prisma.session.delete({
					where: { id: session.id }
				});

				return null;
			}

			// otherwise, the session is valid so we return its data
			return JSON.parse(session.dataJson);
		},

		async updateData(id, data, expires) {
			// occasionally, prisma will try to update a nonexistent session
			// this is probably not a big deal, so we're being lenient here
			await prisma.session.upsert({
				where: { id },
				update: {
					dataJson: JSON.stringify(data),
					expires
				},
				create: {
					id,
					dataJson: JSON.stringify(data),
					expires
				}
			});
		},

		async deleteData(id) {
			await prisma.session.delete({
				where: { id }
			});
		}
	});
