'use client'; // This ensures it's a client component
import UserNavbar from "@/components/usernavbar/usernavbar";
import withUserAuth from "../(auth)/withUserAuth";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <UserNavbar />
            <section className="main-section">{children}</section>
        </div>
    );
};

export default withUserAuth(UserLayout);
