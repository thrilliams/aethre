// flagIndex here is the 0-index position of the bit to store a flag in
// flagNumber is a number with the various flag states squished into it

export const getFlag = (flagNumber: number, flagIndex: number) => {
	const flagBits = 1 << flagIndex;
	return (flagNumber & flagBits) === flagBits;
};

export const setFlag = (flagNumber: number, flagIndex: number, state: boolean) => {
	const flagBits = 1 << flagIndex;
	// set the bit in the position of the flag to 0
	const flagRemoved = flagNumber & ~flagIndex;
	// if the flag should be set to 0, return the flag number
	if (!state) return flagRemoved;
	// otherwise, set it to 1 before returning
	return flagRemoved & flagBits;
};
