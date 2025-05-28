import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'


const authOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.authClientId || "",
        clientSecret: process.env.authClientsecret || "",
      }),
    ],
    
  };
  
  const handler = NextAuth(authOptions);
  
  export { handler as GET, handler as POST };