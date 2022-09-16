import React from 'react';
import { LinkHelper } from './linkHelper';
import { reformatDate } from '../lib/date';

import * as styles from './thumbnail.module.scss';

type ThumbnailProps = {
	data: Queries.ProjectsAndTagQuery['allContentfulProject']['nodes'][0];
	[key: string]: any;
};

export const ProjectThumbnail = ({ data, ...props }: ThumbnailProps) => (
	<LinkHelper
		href={`/projects/${data.slug}`}
		className={props.className ? `${styles.thumbnail} ${props.className}` : styles.thumbnail}
		{...props}
	>
		<h3>{data.title}</h3>
		<p>{reformatDate(data.date!)}</p>
		<i>{data.summary?.summary}</i>
	</LinkHelper>
);
