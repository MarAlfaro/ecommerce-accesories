"use client"

import { Button } from "@/components/ui/button"
import { tbl_compras } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"


export const columns: ColumnDef<tbl_compras>[] = [
    {
        accessorKey: "producto.nombre",
        header: ({ column }) => {
            return (
                <Button
                    className="bg-white text-dark hover:bg-[#0000ff] hover:text-white"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nombre del producto
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "producto.precio",
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
            const price = parseFloat(row.getValue("producto_precio") || "0");
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            }).format(price);

            return <div>{formatted}</div>
        }
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    className="bg-white text-dark hover:bg-[#0000ff] hover:text-white"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Fecha de la compra
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        
        }
    
]