import { tbl_categorias, tbl_products } from "@prisma/client";

import { db } from "@/lib/db";

type ProductoWithCategory = tbl_products & {
    categoria: tbl_categorias | null;
};

type getProducts = {
    userId: string;
    name?: string;
    category?: string;
};

export const getProducts = async ({
    userId,
    name,
    category
}: getProducts): Promise<ProductoWithCategory[]> => {
    try {
        const categoria = await db.tbl_categorias.findFirst({
            where: {
                uuid: category,
            },
        });

        const productos = await db.tbl_products.findMany({
            where: {
                nombre: {
                    contains: name,
                },
                id_categoria: category ? categoria?.id_categoria : undefined,
            },
            include: {
                categoria: true,
            },
            orderBy: {
                createdAt: "desc",
            }
        });


        const ProductsList: ProductoWithCategory[] = await Promise.all(
            productos.map(async producto => {
                return {
                    ...producto
                }
            })
        );
        return ProductsList;

    } catch (error) {
        console.log("[GET_PRODUCTOS]", error);
        return [];
    }
}
