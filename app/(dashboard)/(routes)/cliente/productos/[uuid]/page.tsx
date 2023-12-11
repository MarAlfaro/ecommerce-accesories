import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { CheckSquareIcon, InfoIcon } from "lucide-react";
import { Banner } from "@/components/Banner";
import { Actions } from "./_components/Actions";
import { useState } from "react";
import { formatPrice } from "@/lib/format";
import { ImageForm } from "./_components/ImageForm";
import { AttachmentsForm } from "./_components/AttachmentsForm";

const CourseUuidPage = async ({
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
            adjuntos: true,
        }
    });

    if (!producto) {
        return redirect("/");
    }

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

    const isComplete = requiredFields.every(Boolean);

    return (
        <>
            <div className="md:flex items-start justify-center">
                <div className="xl:w-4/6 lg:w-4/5 w-80 md:block hidden">
                    <ImageForm
                        initialData={producto}
                        id_producto={producto.id_producto}
                    />

                    <AttachmentsForm
                        initialData={producto}
                        id_producto={producto.id_producto}
                        />
                        </div>
                        

                <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
                    {!producto.inventario && (
                        
                            <div className="mt-3">
                                <span className="text-sm text-slate-700 dark:text-white">
                                    Campos completados {completionText}
                                </span>
                            </div>
                        
                    )}

                    <div className="border-b border-gray-200 pb-6">
                        <p className="text-sm leading-none text-gray-600">Detalle del producto: {producto.nombre}</p>
                        <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 mt-2">
                            {producto.nombre}
                        </h1>
                        <p className="text-xl text-[black] font-semibold">
                            {formatPrice((producto.precio !== null) ? producto.precio : 0)}
                        </p>
                        </div>
                    

                    <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                        <p className="text-base leading-4 text-gray-800"><b>Categoría:</b> {producto.categoria?.nombre}</p>
                    
                    </div>
                    <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                        <p className="text-base leading-4 text-gray-800">
                            <b>Descripción:</b> {producto.descripcion}
                        </p>
                </div>
                    <Actions
                        disabled={!isComplete}
                        id_producto={producto.id_producto}
                        uuid={producto.uuid}
                        isAvaliable={producto.inventario}
        
                        />
                </div>
            </div>
        </>
    );
                    }
export default CourseUuidPage;