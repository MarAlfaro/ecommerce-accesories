"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { tbl_categorias, tbl_products} from "@prisma/client";
import Link from "next/link";
import { Combobox } from "@/components/ui/combobox";

interface ProductFormProps {
    initialData?: tbl_products & { categoria: tbl_categorias | null};
    id_producto: number;
    optionsCategories: { label: string, value: number }[];
    isEdit: boolean;
};

const formSchema = z.object({
    nombre: z.string().min(1, {
        message: "El nombre es requerido",
    }),
    precio: z.coerce.number().positive().min(0.00, {
        message: "El precio es requerido",
    }),
    descripcion: z.string().min(5, {
        message: "La descripcion es requerida",
    }),
    id_categoria: z.number().nullable(),

});

export const ProductForm = ({
    initialData,
    id_producto,
    optionsCategories,
    isEdit,
}: ProductFormProps) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: initialData?.nombre || undefined,
            precio: initialData?.precio || undefined,
            descripcion: initialData?.descripcion || undefined,
            id_categoria: initialData?.id_categoria || undefined,
        
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if(!isEdit) {
                const response = await axios.post("/api/productos", values);
                router.push(`/cliente/productos/${response.data.uuid}`);
                toast.success("Publicacion del producto creado correctamente!!!");
            }else {
                const response = await axios.patch(`/api/productos/${id_producto}`, values);
                toast.success("producto actualizado exitosamente!!");
                router.push(`/cliente/productos/${response.data.uuid}`);
            }
        } catch (error) {
            toast.error("Ha ocurrido un error");
        }
    }

    return (
        <div className="space-y-2">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
                <div className="space-y-6">
    
                    <FormField
                        control={form.control}
                        name="nombre"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre del producto</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isSubmitting}
                                        placeholder="Ejemplo: 'Casco ...'"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
    
                    <FormField
                        control={form.control}
                        name="descripcion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descripción</FormLabel>
                                <FormControl>
                                    <Textarea
                                        disabled={isSubmitting}
                                        placeholder="Ejemplo: Casco de protección de la cabeza ..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
    
                    <FormField
                        control={form.control}
                        name="precio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Precio</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        disabled={isSubmitting}
                                        placeholder="Ejemplo: $99.99"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
    
                    <FormField
                        control={form.control}
                        name="id_categoria"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Categoría</FormLabel>
                                <FormControl>
                                    <Combobox options={optionsCategories} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
    
                </div>
    
                <div className="flex items-center gap-x-2">
                    <Link href="/cliente/productos">
                        <Button type="button" variant="destructive">
                            Cancelar
                        </Button>
                    </Link>
                    <Button type="submit" variant="success" disabled={!isValid || isSubmitting}>
                        Aceptar
                    </Button>
                </div>
            </form>
        </Form>
    </div>
    )
}