import Link from "next/link";

import { cn } from "@/lib/utils";

export const Logo = () => {
    return (
        <Link href="/">
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">

                <p className={cn(
                    "text-lg text-neutral-700 dark:text-white pb-1",
                )}>
                    
                </p>
            </div>
        </Link>
    );
};
