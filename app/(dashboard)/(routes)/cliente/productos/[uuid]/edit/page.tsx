import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ProductForm } from "../../../_components/ProductForm";

const EditPage = async ({
    params
}: {
    params: { uuid: string }
}) => {

    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const producto = await db.tbl_products.findFirst({
        where: {
            uuid: params.uuid,
            id_usuario: userId
        },
        include: {
            categoria: true,
    
        },
    });

    if (!producto) {
        return redirect("/");
    }

    console.log(producto);

    const categorias = await db.tbl_categorias.findMany({
        orderBy: {
            nombre: "asc"
        }
    });

   

    const requiredFields = [
        producto.nombre,
        producto.descripcion,
        producto.imagen_url,
        producto.precio,
        producto.id_categoria,
      
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;

    return (
        <div className="mx-auto shadow px-6 py-7 rounded overflow-hidden">
            <h2 className="text-2xl uppercase font-medium mb-1">Editar Producto</h2>

            <span className="text-sm text-slate-700 dark:text-white">
                Campos completados {completionText}
            </span>

            <ProductForm
                initialData={producto}
                id_producto={producto.id_producto}
                optionsCategories={categorias.map(categoria => ({
                    label: categoria.nombre,
                    value: categoria.id_categoria
                }))}
        
                isEdit={true}
            />
        </div>
    );
}

export default EditPage;