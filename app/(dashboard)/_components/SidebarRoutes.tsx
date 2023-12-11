"use client";
import { Layout, Compass, ToyBrick, BarChart } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { usePathname } from "next/navigation";
import { FaBox, FaChartLine, FaChartArea, FaChartPie } from 'react-icons/fa';

const guestRoutes = [
    {
        icon: FaChartPie,
        label: "Dashboard",
        href: "/cliente",
    },

    {
        icon: FaBox,
        label: "Navegar",
        href: "/search",
    }
    
];

const AdminRoutes = [
    {
        icon: FaBox,
        label: "Productos",
        href: "/cliente/productos",
    },
    {
        icon: FaChartArea,
        label: "Estadisticas",
        href: "/cliente/stadistics",
    }
];

export const SidebarRoutes = () => {
    const pathname = usePathname();
    const isProductsPage = pathname?.includes("/cliente/productos");
    const routes = isProductsPage ? AdminRoutes : guestRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    )
};

