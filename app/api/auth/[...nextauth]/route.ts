import NextAuth from "next-auth";
import { authOptions } from "./options";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// Add this if you need static params
export async function generateStaticParams() {
  return [];
}
