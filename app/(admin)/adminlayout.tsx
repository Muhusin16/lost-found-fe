'use client';
import Navbar from "@/components/adminnavbar/adminnavbar";
import withAdminAuth from "../(auth)/withAdminAuth";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <section className="main-section">{children}</section>
        </div>
    );
};

export default withAdminAuth(AdminLayout);
