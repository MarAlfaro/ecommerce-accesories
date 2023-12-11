import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

const StadisticsPage = async () => {
    
    const { userId } = auth();
    
    if (!userId) {
        return redirect("/");
    }

    return (
        <div>
            <h1>Estadisticas</h1>
        </div>
    );
}

export default StadisticsPage;