import { NavbarRoutes } from "@/components/NavbarRoutes";
import MobileSidebar from "./MobileSidebar";

export const Navbar = () => { 
    return (
        <div className="p-4 h-full flex items-center bg-[#DB8AB1] dark:bg-[#DB0F6A] shadow-sm">
            <h1>E-commerce of vehicle accessories</h1>
    <MobileSidebar />
    <NavbarRoutes />
</div>

    ); 
}

export default Navbar;
