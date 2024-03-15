import { UIMatch, useMatches } from '@remix-run/react';

// this is not as well-typed as i would like but i honestly cannot be bothered
export const anyMatches = (property: any) => {
	const matches = useMatches() as UIMatch<unknown, any>[];
	return matches.some((match) => match.handle?.[property]);
};
