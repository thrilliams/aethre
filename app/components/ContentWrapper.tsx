import { VariantProps, cva } from 'class-variance-authority';
import classNames from 'classnames';

const wrapperVariants = cva('mx-auto space-y-4', {
	variants: {
		variant: {
			page: 'mt-8 mb-16',
			centerVertical: ''
		},
		size: {
			page: 'max-w-xl',
			sm: 'max-w-60'
		}
	},
	defaultVariants: {
		variant: 'page',
		size: 'page'
	}
});

interface ContentWrapperProps extends VariantProps<typeof wrapperVariants> {
	children: React.ReactNode;
	className?: string;
}

export function ContentWrapper({ children, className, variant, size }: ContentWrapperProps) {
	return (
		<div className={classNames('w-full px-4', variant === 'centerVertical' && 'my-auto')}>
			<div className={classNames(wrapperVariants({ variant, size }), className)}>
				{children}
			</div>
		</div>
	);
}
