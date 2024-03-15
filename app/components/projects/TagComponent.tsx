import { Tag } from '@prisma/client';
import { Badge } from '../ui/badge';
import { Link } from '@remix-run/react';
import { X } from 'lucide-react';
import classNames from 'classnames';

interface TagComponentProps extends React.ComponentProps<typeof Badge> {
	tag: Tag;
	link?: boolean;
	onRemove?: () => any;
}

export function TagComponent({
	tag,
	link = false,
	onRemove,
	variant = 'outline',
	className,
	onClick,
	...props
}: TagComponentProps) {
	const badge = (
		<Badge
			variant={variant}
			className={classNames((link || onRemove) && 'cursor-pointer', className)}
			onClick={(event) => {
				// this syntax is ugly but it's funny that this is possible
				onRemove?.();
				onClick?.(event);
			}}
			{...props}
		>
			{onRemove !== undefined && <X size="0.8rem" className="mr-1" />}
			{tag.name}
		</Badge>
	);

	return link ? <Link to={`/projects?tags=${tag.slug}`}>{badge}</Link> : badge;
}
