export { default } from 'next-auth/middleware';

export const config = {
	matcher: [
		'/',
		'/areas/:path*',
		'/manuals/:path*',
		'/problems/:path*',
		'/roles/:path*',
		'/solutions/:path*',
		'/users/:path*',
	],
};
