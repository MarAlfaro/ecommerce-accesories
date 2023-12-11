import Stripe from "stripe";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(
    req: Request,
    { params }: { params: { id_producto: string } }
) {
    try {
        const user = await currentUser();

        if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
            return new NextResponse("No autorizado", { status: 401 });
        }

        const producto = await db.tbl_products.findUnique({
            where: {
                id_producto: parseInt(params.id_producto),
                
            }
        });

        const purchase = await db.tbl_compras.findUnique({
            where: {
                userId_producto_uuid: {
                    userId: user.id,
                    producto_uuid: producto?.uuid!,
                }
            }
        });

        if (purchase) {
            return new NextResponse("Producto adquirido anteriormente", { status: 400 });
        }

        if (!producto) {
            return new NextResponse("No fue encontrado", { status: 404 });
        }

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                quantity: 1,
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: producto.nombre,
                        description: producto.descripcion!,
                    },
                    unit_amount: Math.round(producto.precio! * 100),
                }
            }
        ];

        let stripeCustomer = await db.tbl_stripe_clientes.findUnique({
            where: {
                userId: user.id,
            },
            select: {
                stripeCustomerId: true,
            }
        });

        if (!stripeCustomer) {
            const customer = await stripe.customers.create({
                email: user.emailAddresses[0].emailAddress,
            });

            stripeCustomer = await db.tbl_stripe_clientes.create({
                data: {
                    userId: user.id,
                    stripeCustomerId: customer.id,
                }
            });
        }

        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomer.stripeCustomerId,
            line_items,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/productos/${producto.uuid}?success=1`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/productos/${producto.uuid}?canceled=1`,
            metadata: {
                productoId: producto.id_producto,
                productoUuid: producto.uuid,
                userId: user.id,
            }
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.log("[PRODUCTO_ID_CHECKOUT]", error);
        return new NextResponse("Error Interno", { status: 500 })
    }
}


