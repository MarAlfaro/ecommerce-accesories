"use client";

import axios from "axios";
import { CheckSquareIcon, Edit, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import Link from "next/link";

interface ActionsProps {
    disabled: boolean;
    id_producto: number;
    uuid: string;
    isAvaliable: boolean;
};

export const Actions = ({
    disabled,
    id_producto,
    uuid,
    isAvaliable
}: ActionsProps) => {
    const router = useRouter();
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            if (!isAvaliable) {
                await axios.patch(`/api/productos/${id_producto}/actived`);
                toast.success("El producto ya no esta disponible para venta");
            } else {
                await axios.patch(`/api/productos/${id_producto}/disabled`);
                toast.success("El producto se encuentra disponible para la venta");
                confetti.onOpen();
            }

            router.refresh();

        } catch {
            toast.error("Sucedió un error al actualizar el producto");

        } finally {
            setIsLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true);

            await axios.delete(`/api/productos/${id_producto}`);

            toast.success("producto eliminado");
            router.refresh();
            router.push(`/cliente/productos`);
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="mb-3">
                <Button
                    onClick={onClick}
                    disabled={disabled}
                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg text-sm font-semibold flex items-center justify-center text-white bg-gradient-to-r from-blue-600 to-blue-500 w-full py-2 hover:bg-blue-700 hover:opacity-80 transition duration-300 ease-in-out"
                     style={{ borderRadius: "0.5rem" }}
                    >
                    <CheckSquareIcon className="mr-2" />
                    {isAvaliable ? "Desactivar este producto para la venta" : "Activar este producto para la venta"}
                </Button>
            </div>

            <div className="mb-3">
                <Link href={`/cliente/productos/${uuid}/edit`}>
                    <Button
                        disabled={isLoading}
                        className="focus:outline-none focus:ring-2 rounded-md h-10 focus:ring-offset-2 focus:ring-gray-800 text-sm font-semibold flex items-center justify-center text-white bg-gray-800 w-full py-2 hover:bg-gray-700 hover:opacity-90 transition duration-300 ease-in-out"
                    >
                        <Edit className="mr-2" />
                        Editar datos del producto
                    </Button>
                </Link>
            </div>

            <div className="mb-3">
                <ConfirmModal onConfirm={onDelete}>
                    <Button 
                        className="focus:outline-none focus:ring-2 rounded-md h-10 focus:ring-offset-2 focus:ring-gray-800 text-sm font-semibold flex items-center justify-center text-white bg-red-600 w-full py-2 hover:bg-red-700 hover:opacity-90 transition duration-300 ease-in-out"
                        disabled={isLoading}
                        variant={"destructive"}>
                        <Trash className="mr-2" />
                        Borrar Producto
                    </Button>
                </ConfirmModal>
            </div>
        </>
    )
}