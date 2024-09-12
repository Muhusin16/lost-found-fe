import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/styles/app.scss"; // Adjust the path if necessary
import UserNavbar from "@/components/usernavbar/usernavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin section of the app",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inter.className}>
      <UserNavbar />
      <section className="main-section">{children}</section>
    </div>
  );
}
