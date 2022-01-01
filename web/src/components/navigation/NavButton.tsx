import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export type NavButtonProps = {
    title: string;
    href: string;
    icon?: any;
}

const NavButton: React.FC<NavButtonProps> = ({
    title,
    href,
    icon,
    ...props
}) => {

    const router = useRouter();

    const active = router.pathname === href;

    return (
        <Link
            href={href}
        >
            <button 
                className={`w-full p-2 my-1 rounded-lg hover:bg-amber-300/30 ${active ? "bg-amber-300/20 font-medium text-amber-500" : "text-gray-500"}`}
            >
                {icon ? icon : ""}
                {title}
            </button>
        </Link>
    )
}

export default NavButton;
