import { Ref, forwardRef, useRef, useState, ReactNode } from "react";
import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
import Image from "next/image";
// Components
import { motion } from "motion/react";
// Utils
import { Navigation, Navigation_Type } from "@/lib/utils/navigation";
import { generateId } from "@/lib/utils";

interface DesktopNavbarProps {
    props?: ReactNode;
}

type Position = {
    width: number;
    height: number;
    left: number;
    opacity: number;
}

export const DesktopNavbar = forwardRef(({
    ...props
}: DesktopNavbarProps, ref: Ref<HTMLDivElement>) => {
    // const pathname = usePathname();

    const [position, setPosition] = useState<Position>({
        width: 0,
        height: 0,
        left: 0,
        opacity: 0
    });

    return (
        <div ref={ref} {...props} className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
                <Link href={"/"}>
                    <Image src={"/assets/roonder-logo.svg"} width={65} height={65} alt="Roonder Logo" />
                </Link>
                <p className="font-medium">Español</p>
            </div>
            <nav
                ref={ref} 
                className="flex items-center gap-6 relative w-fit"
                onMouseLeave={() => setPosition((pv) => ({
                    ...pv,
                    opacity: 0
                }))}
                {...props} 
            >
                {Navigation.map((nav) => {
                    return (
                        <NavbarLink
                            nav={nav}
                            setPosition={setPosition}
                            key={generateId()}
                        >
                            {nav.title}
                        </NavbarLink>
                    )
                })}

                <NavbarClick position={position} />
            </nav>
        </div>
    );
});

DesktopNavbar.displayName = "DesktopNavbar";

const NavbarLink = ({
    nav,
    setPosition,
    children
}: {
    nav: Navigation_Type;
    setPosition: (value: Position) => void;
    children: ReactNode
}) => {
    const innerRef = useRef<HTMLAnchorElement>(null);

    return (
        <Link 
            href={nav.href} 
            className={`
                text-roonder-gunmetal font-medium relative z-10 block cursor-pointer
            `}
            ref={innerRef}
            onMouseEnter={() => {
                if(!innerRef.current) return;

                const { width } = innerRef.current.getBoundingClientRect();

                setPosition({
                    height: 2.5,
                    left: innerRef.current.offsetLeft,
                    opacity: 1,
                    width
                })
            }}
        >
            {children}
        </Link>
    )
}

const NavbarClick = ({
    position
} : {
    position: Position
}) => {
    return (
        <motion.div 
            animate={position}
            className="bg-roonder-gunmetal rounded-full absolute -bottom-0.5"
        ></motion.div>
    )
}