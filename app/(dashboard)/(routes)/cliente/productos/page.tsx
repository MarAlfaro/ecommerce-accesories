import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { Store } from "lucide-react";

const ProductosPage = async () => {

    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const productos = await db.tbl_products.findMany({
        where: {
            id_usuario: userId
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            categoria: true
        }
    });

    if (!productos) {
        return redirect("/");
    }

    return (
        <>
            <div className="mx-auto shadow px-6 py-7 rounded overflow-hidden">
                <div className="flex items-center space-x-3 capitalize">
                    <Store />
                    <h2 className="text-2xl uppercase font-medium mb-1">
                        Mis productos
                    </h2>
                </div>
                <DataTable columns={columns} data={productos} />
            </div>
        </>
    );
}

export default ProductosPage;
