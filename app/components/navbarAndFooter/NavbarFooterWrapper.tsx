import { useContext } from 'react';
import { Authentication } from '~/util/auth/authenticationContext';
import { anyMatches } from '../../util/anyMatches';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

interface NavbarFooterWrapperProps {
	children?: React.ReactNode;
}

export function NavbarFooterWrapper({ children }: NavbarFooterWrapperProps) {
	const user = useContext(Authentication);

	const showNavbar = !anyMatches('hideNavbar');
	const showFooter = !anyMatches('hideFooter');

	return (
		<div className="grid grid-rows-[max-content_auto_max-content] min-h-[100svh]">
			{showNavbar && <Navbar user={user} />}
			{children}
			{showFooter && <Footer />}
		</div>
	);
}
