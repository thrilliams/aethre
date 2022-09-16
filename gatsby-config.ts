import { GatsbyConfig } from 'gatsby';
import { config as dotenv } from 'dotenv';

dotenv({ path: `.env.${process.env.NODE_ENV}` });

const config: GatsbyConfig = {
	siteMetadata: {
		title: `aethre`,
		siteUrl: `https://the.aethre.co`
	},
	trailingSlash: 'never',
	graphqlTypegen: true,
	plugins: [
		{
			resolve: 'gatsby-source-contentful',
			options: {
				spaceId: process.env.CONTENTFUL_SPACE_ID,
				accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
			}
		},
		'gatsby-plugin-image',
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		'gatsby-plugin-sass'
	]
};

export default config;
