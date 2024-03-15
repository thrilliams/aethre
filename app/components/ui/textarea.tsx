import * as React from 'react';

import TextareaAutosize from 'react-textarea-autosize';

import { cn } from '~/lib/utils';

const Textarea = React.forwardRef<
	HTMLTextAreaElement,
	React.ComponentProps<typeof TextareaAutosize>
>(
	// defaulting cols to a high value will force the textarea to take up full width
	// (which is desirable)
	({ className, minRows = 2, cols = 1312, ...props }, ref) => {
		return (
			<TextareaAutosize
				className={cn(
					'flex w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background resize-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
					className
				)}
				ref={ref}
				minRows={minRows}
				cols={cols}
				{...props}
			/>
		);
	}
);

Textarea.displayName = 'Textarea';

export { Textarea };
