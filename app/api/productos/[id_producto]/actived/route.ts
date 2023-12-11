import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
    req: Request,
    { params }: { params: { id_producto: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("No autorizado", { status: 401 });
        }

        const producto = await db.tbl_products.findUnique({
            where: {
                id_producto: parseInt(params.id_producto),
                id_usuario: userId,
            },
        });
        
        if (!producto) {
            return new NextResponse("Not found", { status: 404 });
        }

        if (!producto.nombre || !producto.descripcion || !producto.imagen_url || !producto.id_categoria) {
            return new NextResponse("Faltan campos requeridos", { status: 401 });
        }

        const activedProductos = await db.tbl_products.update({
            where: {
                id_producto: parseInt(params.id_producto),
                id_usuario: userId,
            },
            data: {
             
            }
        });

        return NextResponse.json(activedProductos);
    } catch (error) {
        console.log("[PRODUCTO_ID_ACTIVED]", error);
        return new NextResponse("Error Interno", { status: 500 });
    }
}

