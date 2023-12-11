import Image from "next/image";

export const Logo = () => {
    return (
        <Image
            src="/logo.png"
            alt="Logo"
            width={70}
            height={70}
        />
    )
};
