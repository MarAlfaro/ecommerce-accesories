"use client"

import { Button } from "@/components/ui/button"
import { tbl_products } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Eye, MoreHorizontal, Pencil } from "lucide-react"
import { Badge } from "@/components/ui/badge";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link"
import { cn } from "@/lib/utils"

export const columns: ColumnDef<tbl_products>[] = [
    {
        accessorKey: "nombre",
        header: ({ column }) => {
            return (
                <Button
                    className="bg-white text-dark hover:bg-[#0000ff] hover:text-white"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nombre
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "descripcion",
        header: ({ column }) => {
            return (
                <Button
                    className="bg-white text-dark hover:bg-[#0000ff] hover:text-white"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Descripciòn del Producto
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "precio",
        header: ({ column }) => {
            return (
                <Button
                    className="bg-white text-dark hover:bg-[#0000ff] hover:text-white"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Precio
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("precio") || "0");
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            }).format(price);

            return <div>{formatted}</div>
        }
    },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            const { uuid, nombre } = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href={`/cliente/productos/${uuid}`}>
                            <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                Detalle de Producto
                            </DropdownMenuItem>
                        </Link>
                        <Link href={`/cliente/productos/${uuid}/edit`}>
                            <DropdownMenuItem>
                                <Pencil className="h-4 w-4 mr-2" />
                                Modificar producto
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]