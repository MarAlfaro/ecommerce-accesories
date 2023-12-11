import { db } from "@/lib/db";
import { Categories } from "./_components/Categories";
import { SearchInput } from "@/components/SearchInput";
import { getProducts } from "@/actions/get-products";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ProductsList } from "@/components/ProductsList";

interface SearchPageProps {
    searchParams: {
        name: string;
        categoryId: string;
    }
};

const SearchPage = async ({
    searchParams
}: SearchPageProps) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }


    const categories = await db.tbl_categorias.findMany({
        orderBy: {
            nombre: "asc"
        }
    });

    const productos = await getProducts({
        userId,
        ...searchParams,
    });

    return (
        <>
            <div className="px-6 pt-6 md:hidden md:mb-0 block">
                <SearchInput />
            </div>
            <div className="p-6 space-y-4">
                <Categories
                    items={categories}
                />
                <ProductsList items={productos} />
            </div>
        </>
    );
}

export default SearchPage;
