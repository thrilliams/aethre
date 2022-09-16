import React from 'react';
import { LinkHelper } from './linkHelper';

import * as styles from './thumbnail.module.scss';

type ThumbnailProps = {
	data: Queries.AllTagsQuery['allContentfulTag']['nodes'][0];
	[key: string]: any;
};

export const TagThumbnail = ({ data, ...props }: ThumbnailProps) => (
	<LinkHelper
		href={`/tags/${data.slug}`}
		className={props.className ? `${styles.thumbnail} ${props.className}` : styles.thumbnail}
		{...props}
	>
		<h3>{data.name}</h3>
		<p>{data.description}</p>
	</LinkHelper>
);
