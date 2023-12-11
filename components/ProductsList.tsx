import { tbl_categorias, tbl_products } from "@prisma/client";
import { ProductsCard } from "./ProductsCard";

type ProductoWithCategory = tbl_products & {
    categoria: tbl_categorias | null;
};

interface ProductsListProps {
    items: ProductoWithCategory[];
}

export const ProductsList = ({
    items
}: ProductsListProps) => {
    return (
        <div>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                {items.map((item) => (
                    <ProductsCard
                        key={item.uuid}
                        uuid={item.uuid}
                        name={item.nombre!}
                        imageUrl={item.imagen_url!}
                        price={item.precio!}
                        category={item?.categoria?.nombre!}
                    />
                ))}
            </div>
            {items.length === 0 && (
                <div className="text-center text-sm text-muted-foreground mt-10">
                    No products found
                </div>
            )}
        </div>
    )
}
