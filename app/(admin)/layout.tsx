
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/styles/app.scss"; // Adjust the path if necessar
import AdminLayout from "./adminlayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin section of the app",
};

const AdminRootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className={inter.className}>
      <AdminLayout>{children}</AdminLayout>
    </div>
  );
}

export default AdminRootLayout;