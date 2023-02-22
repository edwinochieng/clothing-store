import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head />
      <body
        className={`max-w-[1920px] w-full px-3 md:px-12 lg:px-16 ${inter.className}`}
      >
        <Navbar />
        <div>{children}</div>
      </body>
    </html>
  );
}
