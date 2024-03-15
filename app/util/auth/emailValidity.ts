// also incomplete but probably fine for this use case
export const emailValidity = (email: string): true | string => {
	const parts = email.split('@');
	if (parts.length !== 2) return 'email must have exactly one @';
	const [name, domain] = parts;
	if (name.length === 0 || domain.length === 0) return 'email must have a name and domain';
	return true;
};
