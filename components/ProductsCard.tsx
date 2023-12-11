import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";

interface ProductsCardProps {
    uuid: string;
    name: string;
    imageUrl: string;
    price: number;
    category: string;
};

export const ProductsCard = ({
    uuid,
    name,
    imageUrl,
    price,
    category
}: ProductsCardProps) => {
    return (
        <Link href={`/productos/${uuid}`}>
            <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full bg-white dark:bg-black">
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    <Image
                        fill
                        className="object-cover"
                        alt={name}
                        src={imageUrl}
                    />
                </div>
                <div className="flex flex-col pt-2">
                    <div className="text-lg md:text-base font-medium group-hover:text-sky-700 dark:group-hover:text-yellow-500 transition line-clamp-2">
                        {name}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {category}
                    </p>
                    <p className="text-md md:text-sm font-medium text-slate-700">
                        {formatPrice(price)}
                    </p>

                </div>
            </div>
        </Link>
    )
}
