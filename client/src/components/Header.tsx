import { Dispatch, MouseEvent, SetStateAction } from 'react';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';
import User from '@structures/user';
import Logo from '@assets/img/logo.svg';
import DefaultProfile from '@assets/img/default_profile.svg';
import CreatePostIcon from '@assets/img/create_post_icon.svg';
import '@scss/Header.scss';

interface Props {
	setLoaded: Dispatch<SetStateAction<boolean>>;
	user: User | null;
}

const Header: React.FC<Props> = ({ user, setLoaded }) => {
	const logOut = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
		const btn = e.currentTarget;
		btn.disabled = true;

		axios
			.post('/auth/logout')
			.then(() => {
				localStorage.removeItem('logged_in');
				window.location.reload();
			})
			.catch(err => {
				console.error(err);
				btn.disabled = false;
			});
	};

	const profilePicProps = {
		className: 'mx-2 rounded-circle',
		width: 40,
		height: 40,
	};

	return (
		<Navbar expand="sm" bg="secondary">
			<Navbar.Brand as={Link} to="/">
				<img src={Logo} alt="Logo" height={35} /> Vsetko
			</Navbar.Brand>

			<Navbar.Toggle />
			<Navbar.Collapse className="justify-content-end">
				{user ? (
					<>
						<Button
							className="post-btn d-flex align-items-center justify-content-middle mx-2"
							variant="secondary"
							as={Link}
							to="/post">
							<img height="20" src={CreatePostIcon} alt="Create Post" />
						</Button>
						<Link to={`/user/${user.id}`} className="header-profile">
							{user.username}
							<LazyImage
								src="/api/users/@me/picture"
								{...profilePicProps}
								fallback={
									<img
										src={DefaultProfile}
										alt="Profile"
										{...profilePicProps}
									/>
								}
							/>
						</Link>
						<Button variant="outline-danger" onClick={logOut}>
							Cerrar Sesión
						</Button>
					</>
				) : (
					<ButtonGroup>
						<Button as={Link} to="/login" variant="secondary">
							Acceder
						</Button>
						<Button as={Link} to="/register" variant="secondary">
							Registrarte
						</Button>
					</ButtonGroup>
				)}
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Header;
