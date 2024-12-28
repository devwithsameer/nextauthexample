import connectToDatabase from "@/lib/mongodb"
import User from "@/models/User";
import CredentialProviders from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";

export const authOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialProviders({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: 'email' },
                password: { label: "Password", type: 'password' },
            },
            async authorize(credentials) {
                //Check if email and password available
                if (!credentials.email || !credentials.password) {
                    throw new Error("Please enter an email and password")
                }

                await connectToDatabase();

                const user = await User.findOne({ email: credentials.email });

                //If user not found
                if (!user) {
                    throw new Error("User not found with provided email")
                }

                //Match password
                const passwordMatch = await bcrypt.compare(credentials.password, user.password);

                //If password not match
                if (!passwordMatch) {
                    throw new Error("Incorrect password")
                }

                return user

            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id
            }
            return session;
        }
    },
    pages: {
        signIn: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }