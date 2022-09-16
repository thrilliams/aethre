import React from 'react';
import { LinkHelper } from './linkHelper';

import * as styles from './thumbnail.module.scss';

type ThumbnailProps = {
	data: Queries.AllPagesQuery['allContentfulPage']['nodes'][0];
	[key: string]: any;
};

export const PageThumbnail = ({ data, ...props }: ThumbnailProps) => (
	<LinkHelper
		href={`/${data.slug}`}
		className={props.className ? `${styles.thumbnail} ${props.className}` : styles.thumbnail}
		{...props}
	>
		<h3>{data.title}</h3>
	</LinkHelper>
);
