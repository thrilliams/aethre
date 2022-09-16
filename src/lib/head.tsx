import React from 'react';

export const head = (title?: string, description?: string) => (
	<>
		<title>{title && title !== 'The Aethre' ? `${title} | ` : ''}The Aethre</title>
		<meta
			name="description"
			content={description || 'The Aethre: a portfolio for, of, and by Soren Williams.'}
		/>
		{/* Rolling energy icon by Lorc under CC BY 3.0 */}
		{/* https://game-icons.net/1x1/lorc/rolling-energy.html */}
		<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
		<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
		<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
		<link rel="manifest" href="/site.webmanifest" />
		<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f72585" />
		<link rel="shortcut icon" href="/favicon.ico" />
		<meta name="msapplication-TileColor" content="#603cba" />
		<meta name="msapplication-config" content="/browserconfig.xml" />
		<meta name="theme-color" content="#ffffff" />
	</>
);
