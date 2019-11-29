import React, { memo } from 'react';

import './Header.scss';

const Header = () => (
	<header className="Header">
		<span className="Header__title">F1 Champions by Year</span>
	</header>
);

export default memo(Header);
