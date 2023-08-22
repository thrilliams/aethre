import { BLOCKS, INLINES, Text } from '@contentful/rich-text-types';
import {
	ContentfulRichTextGatsbyReference,
	renderRichText,
	RenderRichTextData
} from 'gatsby-source-contentful/rich-text';
import React from 'react';
import { DescriptiveImage } from './descriptiveImage';
import { LinkHelper } from './linkHelper';
import { PageThumbnail } from './pageThumbnail';
import { ProjectThumbnail } from './projectThumbnail';
import { TagThumbnail } from './tagThumbnail';

export type Content = RenderRichTextData<ContentfulRichTextGatsbyReference>;

interface Props {
	data: Content;
}

export const RichText = ({ data }: Props) => (
	<>
		{renderRichText(data, {
			renderNode: {
				[INLINES.HYPERLINK]: ({ data }, children) => {
					if (data.uri.startsWith('[button]')) {
						return (
							<PageThumbnail
								data={{ slug: data.uri.slice(9), title: children?.toString()! }}
							/>
						);
					}
					return <LinkHelper href={data.uri}>{children}</LinkHelper>;
				},
				[BLOCKS.EMBEDDED_ASSET]: ({ data }) => (
					<DescriptiveImage
						image={data.target.gatsbyImageData}
						alt={data.target.title}
						description={data.target.description}
					></DescriptiveImage>
				),
				[INLINES.EMBEDDED_ENTRY]: ({ data }) => {
					switch (data.target.__typename) {
						case 'ContentfulTag':
							return (
								<LinkHelper href={`/tags/${data.target.slug}`}>
									{data.target.name}
								</LinkHelper>
							);
						case 'ContentfulProject':
							return (
								<LinkHelper href={`/projects/${data.target.slug}`}>
									{data.target.title}
								</LinkHelper>
							);
						case 'ContentfulPage':
							return (
								<LinkHelper href={`/${data.target.slug}`}>
									{data.target.title}
								</LinkHelper>
							);
					}
				},
				[BLOCKS.EMBEDDED_ENTRY]: ({ data }) => {
					switch (data.target.__typename) {
						case 'ContentfulTag':
							return <TagThumbnail data={data.target} />;
						case 'ContentfulProject':
							return <ProjectThumbnail data={data.target} />;
						case 'ContentfulPage':
							return <PageThumbnail data={data.target} />;
					}
				},
				[INLINES.ENTRY_HYPERLINK]: ({ data, content }) => {
					switch (data.target.__typename) {
						case 'ContentfulTag':
							return (
								<LinkHelper href={`/tags/${data.target.slug}`}>
									{content.map((element) => (element as Text).value).join()}
								</LinkHelper>
							);
						case 'ContentfulProject':
							return (
								<LinkHelper href={`/projects/${data.target.slug}`}>
									{content.map((element) => (element as Text).value).join()}
								</LinkHelper>
							);
						case 'ContentfulPage':
							return (
								<LinkHelper href={`/${data.target.slug}`}>
									{content.map((element) => (element as Text).value).join()}
								</LinkHelper>
							);
					}
				}
			}
		})}
	</>
);
