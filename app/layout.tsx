import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import "./globals.css";

import Navbar from './components/navbar/Navbar';
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from './components/modals/LoginModal';
import RentModal from "./components/modals/RentModal";

import ToasterProvider from './providers/ToasterProvider';
import { getCurrentUser } from "./actions/getCurrentUser";


const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser}/>
        {children}
      </body>
    </html>
  );
}
