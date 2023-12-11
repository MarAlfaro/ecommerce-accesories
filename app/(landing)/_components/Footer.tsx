import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

export const Footer = () => {
    return (
        <div className="fixed bottom-0 w-full p-4  bg-[#DB8AB1] dark:bg-[#DB0F6A]">
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <Logo />
                <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                    <Button size="sm" variant="ghost">
                        Politica de privacidad
                    </Button>
                    <Button size="sm" variant="ghost">
                        Terminos de servicio
                    </Button>
                </div>
            </div>
        </div>
    );
};
