// given a password string, hashes it with SHA-512 using SubtleCrypto
export const hashPassword = async (password: string) => {
	// get the string bytes
	const encoder = new TextEncoder();
	const passwordBytes = encoder.encode(password);
	// hash them
	const hashedBytes = await crypto.subtle.digest('SHA-256', passwordBytes);
	// turn the hashed bytes back into a string
	// (they usually aren't valid utf-8 characters but this is easier to store than an ArrayBuffer)
	const decoder = new TextDecoder();
	return decoder.decode(hashedBytes);
};
