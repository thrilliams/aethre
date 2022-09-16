import React from 'react';
import { FaEnvelopeSquare, FaGithubSquare } from 'react-icons/fa';
import { LinkHelper } from './linkHelper';

import * as styles from './footer.module.scss';

export const Footer = () => (
	<footer className={styles.footer}>
		<div>
			<LinkHelper href="mailto:soren@aethre.co">
				<FaEnvelopeSquare size={40} />
			</LinkHelper>
			<LinkHelper href="https://github.com/thrilliams">
				<FaGithubSquare size={40} />
			</LinkHelper>
		</div>
	</footer>
);
