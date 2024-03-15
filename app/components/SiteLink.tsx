import { Link } from '@remix-run/react';
import classNames from 'classnames';
import { RiExternalLinkLine } from 'react-icons/ri';

// for use with remark component replacement; accepts anchor tag props (ignores most) and uses
// either another anchor tag or a Link component, depending on whether the link is internal or not
export function SiteLink(
	props: React.DetailedHTMLProps<
		React.AnchorHTMLAttributes<HTMLAnchorElement>,
		HTMLAnchorElement
	> & { disabled?: boolean; fancy?: boolean }
) {
	const href = props.href;
	if (href === undefined) throw new Error('Links must have href attributes');

	// hacky check to see if the link is external or not
	const external = href.startsWith('http');

	const classes = classNames(
		'transition-all',
		props.fancy
			? 'px-2 outline outline-1 -outline-offset-2 hover:outline-offset-4'
			: 'underline underline-offset-2',
		props.disabled ? 'pointer-events-none decoration-dotted' : 'hover:underline-offset-4',
		// without whitespace-nowrap, the icon sometimes wraps itself in body text
		// .sitelink is a utility class that bumps the external link icon when the link is hovered
		external && 'whitespace-nowrap',
		external && !props.fancy && 'sitelink',
		props.className
	);

	const inner = (
		<>
			{props.children}
			{external && !props.fancy && (
				<RiExternalLinkLine
					size={12}
					className={classNames('inline mb-1 transition-all ml-0.5')}
				/>
			)}
		</>
	);

	if (external)
		return (
			<a href={href} className={classes} target="_blank">
				{inner}
			</a>
		);

	return (
		<Link to={href} className={classes} prefetch="intent">
			{inner}
		</Link>
	);
}
