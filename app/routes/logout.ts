import { LoaderFunctionArgs } from '@remix-run/node';
import { logOut } from '~/util/auth/sessions';

export const loader = async ({ request }: LoaderFunctionArgs) => {
	// helper function that respects search params by default
	return logOut(request);
};
