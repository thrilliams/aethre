// this is not great, but it's probably good enough for the scale of this project
export const passwordValidity = (password: string): true | string => {
	if (password.length < 12) return 'password is less than 12 characters';
	return true;
};
