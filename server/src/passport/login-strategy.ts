import { Strategy as LocalStrategy } from 'passport-local';
import { compare } from 'bcrypt';
import User from '../models/user';

const loginStrategy = new LocalStrategy(
	{
		usernameField: 'username',
		passwordField: 'password',
	},
	async (username, password, done) => {
		username = username.trim();

		const user = await User.findOne({ username });
		if (!user) {
			return done(null, false, { message: 'User not found', status: 404 });
		}

		const match = await compare(password, user.password);
		if (!match) {
			return done(null, false, { message: 'Invalid password', status: 401 });
		}

		done(null, user);
	}
);

export default loginStrategy;
