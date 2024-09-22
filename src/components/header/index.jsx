import { NavLink } from 'react-router-dom'

import './header.scss'
const Header
 = () => {
	return (
		<div id='header'>
			<div className="header">
				<div className="header__log">
				</div>
				<div className="header__nav">
					<NavLink to='/'> Home </NavLink>
					<NavLink to='/about'> About </NavLink>
					<NavLink to='/contact'> Contact </NavLink>
					<NavLink to='/services'> Services </NavLink>
				</div>
			</div>
			
		</div>
	);
};

export default Header
;