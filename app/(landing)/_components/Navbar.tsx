import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { auth, UserButton } from "@clerk/nextjs";

export const Navbar = () => {
    const { userId } = auth();

    return (
        <div className="fixed top-0 w-full h-30 px-4 shadow-sm bg-[#DB8AB1] dark:bg-[#DB0F6A] flex items-center justify-between z-50">
            <Link href="/">
                <div className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        height={100}
                        width={100}
                        className="mr-4" // Espaciado a la derecha del logo
                    />
                    <h2 className="text-white text-2xl md:text-4xl font-extrabold">E-commerce of vehicle accessories</h2>
                </div>
            </Link>

            <div className="flex gap-x-8 ml-auto">
                {!userId && (
                    <>
                        <Button size="lg" variant="customghost" asChild>
                            <Link href="/cliente">
                                Iniciar sesión
                            </Link>
                        </Button>
                        <Button size="lg" variant="customghost" asChild>
                            <Link href="/sign-up">
                                Regístrate gratis
                            </Link>
                        </Button>
                    </>
                )}
                
                <UserButton
                    afterSignOutUrl="/"
                />
                <ModeToggle />
            </div>
        </div>
    );
};
