/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { Ref, forwardRef, ReactNode } from "react";
// Components
import { DesktopDashboard } from "./desktop";
// Hooks
import { useWindowSize } from "@uidotdev/usehooks"

interface MainDashboardProps {
    props?: ReactNode;
}

export const MainDashboard = forwardRef(({
    ...props
}: MainDashboardProps, _ref: Ref<HTMLDivElement>) => {
    const windows_size = useWindowSize();
    
    function getDisplay() {
        switch(true) {
            // case windows_size?.width && windows_size.width <= 5e2:
            //     return <>Phone</>
            // case windows_size?.width && windows_size.width >= 5e2 && windows_size.width < 12e2:
            //     return <>Small Device</>
            // case windows_size?.width && windows_size.width >= 12e2:
            //     return <DesktopDashboard />
            default:
                return <DesktopDashboard />
        }
    }

    return getDisplay();
});

MainDashboard.displayName = "MainDashboard";