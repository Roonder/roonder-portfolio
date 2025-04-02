/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ref, forwardRef, ReactNode } from "react";
// Components
import { Aurora } from "@/components/background/Aurora";
import { DesktopNavbar } from "@/components/navbar/desktop";
import { DesktopScoutBar } from "../general/desktop/ScoutBar";

interface DesktopLayoutProps {
    children: ReactNode;
}

export const DesktopLayout = forwardRef(({
    children
}: DesktopLayoutProps, ref: Ref<HTMLDivElement>) => {
    return (
        <>
            <DesktopNavbar />
                {children}
            <DesktopScoutBar />
        </>
    );
});

DesktopLayout.displayName = "DesktopLayout";