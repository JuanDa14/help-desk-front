import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { User } from '@/interfaces/user';

declare module 'next-auth' {
	interface Session {
		user: User;
		accessToken: string;
		refreshToken: string;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		user: User;
		accessToken: string;
		refreshToken: string;
	}
}

export const authOptions: NextAuthOptions = {
	session: { strategy: 'jwt' },
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'Credentials',
			type: 'credentials',
			credentials: {
				username: {},
				password: {},
			},
			async authorize(credentials) {
				if (!credentials?.username || !credentials?.password) return null;

				const payload = {
					username: credentials.username,
					password: credentials.password,
				};

				const res = await fetch(`${process.env.API_URL}/auth/login`, {
					method: 'POST',
					body: JSON.stringify(payload),
					headers: { 'Content-Type': 'application/json' },
				});

				const user = await res.json();

				if (!res.ok) throw new Error(user.message);

				if (res.ok && user) {
					return user;
				}

				return null;
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		jwt: async ({ token, user, trigger, session }) => {
			if (trigger === 'update' && session) {
				return {
					...token,
					user: {
						...session.user,
					},
				};
			}
			if (user) {
				return {
					...token,
					...user,
				};
			}

			return token;
		},
		session: async ({ session, token }) => {
			session.accessToken = token.accessToken;
			session.refreshToken = token.refreshToken;
			session.user = {
				_id: token.user._id,
				name: token.user.name,
				role: {
					_id: token.user.role._id,
					name: token.user.role.name,
					description: token.user.role.description,
				},
				area: token.user.area,
				username: token.user.username,
				imageURL: token.user.imageURL,
				state: token.user.state,
				address: token.user.address,
			};

			return session;
		},
	},
	pages: { signIn: '/login', error: '/login' },
};
