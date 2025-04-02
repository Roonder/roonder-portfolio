"use client"
import { Ref, forwardRef, ReactNode } from "react";
// Components
import { DesktopLayout } from "@/components/layouts/DesktopLayout";
import { ModernLaptopModel } from "@/components/3d-models/modern-laptop";
import { PresentationText } from "@/components/elements/desktop/text";

interface DesktopDashboardProps {
    props?: ReactNode;
}

export const DesktopDashboard = forwardRef(({
    ...props
}: DesktopDashboardProps, ref: Ref<HTMLDivElement>) => {

    return (
        <DesktopLayout>
            <main 
                ref={ref} 
                className="px-4 py-10 h-[85.4dvh] grid grid-cols-2 items-start place-content-start gap-6 w-full relative overflow-hidden z-10"
                {...props} 
            >
                <PresentationText className="" />
                <ModernLaptopModel className="" />
            </main>
        </DesktopLayout>
    );
});

DesktopDashboard.displayName = "DesktopDashboard";