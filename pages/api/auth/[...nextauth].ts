import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import { prisma } from "@/app/libs/prismadb";

 
export const authOptions: AuthOptions = ({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),

    CredentialsProvider({

      name:"credentials",
      credentials: {
        email: { label: "email", type:"text" },
        password: { label: "password", type: "password" },
      },
      
      async authorize(credentials) {
        if(!credentials?.email || !credentials.password) {
          throw new Error ("No hay credenciales para validar")
        }
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // console.log({authconfig:{ email, password }});
        // buscar email en la base de datos
        const user = await prisma.user.findUnique({
          where: { email: email.toLocaleLowerCase() },
        });

        if (!user) {
          throw new Error("No existe el usuario ");
          
        }

        // comparar password

        if (!user.password || !bcryptjs.compareSync(password, user.password)) {
          throw new Error("Credenciales invalidas");
          
        }
        // retornar el usuario sin el password

        const { password: _, ...rest } = user;


        return rest;
      },
    }),
    
  ],
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export default NextAuth(authOptions);

