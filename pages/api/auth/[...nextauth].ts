import NextAuth, { NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import { prisma } from "@/prisma/client";
import bcrypt from 'bcrypt'


export const authOptions:NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
      CredentialsProvider({
        type:'credentials',
        credentials: {
          email: { label: 'email', type: 'email' },
          password: { label: 'password', type: 'password' },
        },

        async authorize(credentials){

          const { email,password } = credentials as {email:string; password:string;}
          
          const user = await prisma.user.findUnique({where: {email: email}})

          if(user && bcrypt.compareSync(password, user.password) ){
            return {
              id: user.id,
              name: user.name,
              email: user.email,
            }
          }
          throw new Error("Invalid email or password")
        }
      
      })
    ],
    session: {
      strategy:'jwt'
    },
    callbacks: {
      async jwt({token,user}){
        if(user) token.id = user.id;
        return token;
}, 
     async session ({session,token}){
      if(token) session.user.id = token.id;
      return session;
     }
    }
      
  }
  export default NextAuth(authOptions)