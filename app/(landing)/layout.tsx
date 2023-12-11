import { Footer } from "./_components/Footer";
import { Navbar } from "./_components/Navbar";
import 'app/globals.css'; // Importa tu hoja de estilos global aquí

const HomeLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full bg-white">
            <Navbar />
            <main className="pt-20 pb-15">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default HomeLayout;
