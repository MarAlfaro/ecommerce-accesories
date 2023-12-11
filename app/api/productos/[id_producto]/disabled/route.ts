import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
    req: Request,
    { params }: { params: { id_producto: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("No Autorizado", { status: 401 });
        }

        const producto = await db.tbl_products.findUnique({
            where: {
                id_producto: parseInt(params.id_producto),
                id_usuario: userId,
            },
        });

        if (!producto) {
            return new NextResponse("Publicación de producto no encontrada", { status: 404 });
        }

        const deletedProductos = await db.tbl_products.delete({
            where: {
                id_producto: parseInt(params.id_producto),
            },
        });

        return NextResponse.json(deletedProductos);
    } catch (error) {
        console.log("[PRODUCTO_ID_DELETE]", error);
        return new NextResponse("Error Interno", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { id_producto: string } }
) {
    try {
        const { userId } = auth();
        const { id_producto } = params;
        const values = await req.json();

        if (!userId) {
            return new NextResponse("No autorizado", { status: 401 });
        }

        const producto = await db.tbl_products.update({
            where: {
                id_producto: parseInt(id_producto),
                id_usuario: userId
            },
            data: {
                ...values,
            }
        });

        return NextResponse.json(producto);
    } catch (error) {
        console.log("[DRAW_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}