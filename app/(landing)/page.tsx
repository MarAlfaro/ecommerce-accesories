"use client"
import MyCarousel from './_components/Carousel';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className={cn("flex items-center justify-center flex-col")}>
        <div className="flex items-center justify-center p-10">
          <p
            className={cn(
              "text-4xl md:text-7xl text-center text-primary-700 dark:text-black mb-8 font-bold", // Agregué "font-bold"
            )}
          >
            ¡Lo mejor en accesorios de calidad al mejor precio!
          </p>
        </div>

        <h1 className="text-4xl md:text-7xl text-center text-primary-700 dark:text-black mb-8">
          <MyCarousel />
        </h1>
      </div>
    </div>
  );
};

export default HomePage;

