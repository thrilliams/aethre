import React from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import * as styles from './descriptiveImage.module.scss';

interface DescriptiveImageProps {
	image: IGatsbyImageData;
	alt: string;
	description?: string;
}

export const DescriptiveImage = ({ image, alt, description }: DescriptiveImageProps) => (
	<div className={styles.descriptiveImageContainer}>
		<GatsbyImage image={image} alt={alt}></GatsbyImage>
		{description ? <span>{description}</span> : null}
	</div>
);
