"use client"
import { Ref, forwardRef, ReactNode } from "react";
// Components
import { ScoutBar } from "scoutbar";
// Utils
import { Navigation } from "@/lib/utils/navigation";

interface DesktopScoutBarProps {
    props?: ReactNode;
}

export const DesktopScoutBar = forwardRef(({
    ...props
// eslint-disable-next-line @typescript-eslint/no-unused-vars
}: DesktopScoutBarProps, _ref: Ref<HTMLDivElement>) => {
    return (
        <ScoutBar 
            tutorial
            centered
            placeholder={"¡Busca a dónde quieres navegar!"}
            barWidth="50dvw"
            theme="light"
            brandColor="#293142"
            // backdrop="rgba(41, 49, 66, 0.10)"
            actions={({ createScoutAction }) => Navigation.map((nav) => 
                createScoutAction({
                    label: nav.title,
                    description: "Test",
                    href: nav.href
                })
            )}
            snackBar={{
                background: "#fff",
                color: "#293142",
                position: "top",
            }}
            {...props}
        />        
    );
});

DesktopScoutBar.displayName = "DesktopScoutBar";