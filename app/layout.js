import { Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "Resume Builder app powered by AI",
  description:
    "Create a professional resume in seconds with our AI-powered resume builder. Tailor your CV to any job description and stand out to employers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
