import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/styles/app.scss"; // Adjust the path if necessary
import UserLayout from "./userlayout";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin section of the app",
};

export default function UserRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.className}>
      <UserLayout>{children}</UserLayout>
    </div>
  );
}
