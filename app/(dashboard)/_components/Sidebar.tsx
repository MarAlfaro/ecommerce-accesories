import { Logo } from "./Logo";
import { SidebarRoutes } from "./SidebarRoutes";

const Sidebar = () => {
    return (
        <div className="h-full border-b  flex flex-col overflow-y-auto bg-[#DB8AB1] dark:bg-[#DB0F6A] shadow-sm">
            <div className="p-6 flex items-center justify-center">
                <Logo />
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoutes />
            </div>
        </div>
    );
}

export default Sidebar;
