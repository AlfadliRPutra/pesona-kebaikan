export const authConfig = {
	pages: {
		signIn: "/auth/login",
		signOut: "/auth/login",
	},
	callbacks: {
		authorized({
			auth,
			request: { nextUrl },
		}: {
			auth: any;
			request: { nextUrl: any };
		}) {
			const isLoggedIn = !!auth?.user;
			// const isOnAdmin = nextUrl.pathname.startsWith("/admin");

			// if (isOnAdmin) {
			//   if (isLoggedIn) return true;
			//   return false; // Redirect unauthenticated users to login page
			// }

			return true;
		},
		jwt({ token, user }: any) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		session({ session, token }: any) {
			if (session.user) {
				session.user.id = token.id as string;
			}
			return session;
		},
	},
	providers: [], // Configured in auth.ts
};
