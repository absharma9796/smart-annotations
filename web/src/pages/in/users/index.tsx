import ProtectedLayout from '@components/layouts/ProtectedLayout';
import { NavButtonProps } from '@components/navigation/NavButton';
import SideNav from '@components/navigation/SideNav';
import { AccountCircleRounded, BubbleChartRounded } from '@mui/icons-material';
import Head from 'next/head';
import React from 'react'

const UsersPage = () => {
    const navlist: NavButtonProps[] = [
        {
            title: "Datasets",
            href: "/in/datasets",
            icon: <BubbleChartRounded fontSize="small" className="mr-2"/>
        },
        {
            title: "Users",
            href: "/in/users",
            icon: <AccountCircleRounded fontSize="small" className="mr-2" />
        }
    ]

    return (
        <ProtectedLayout>
            <Head>
                <title>Users | Smart Annotations Interface</title>
            </Head>
            <SideNav 
                navlist={navlist}
            />
            Users Page
        </ProtectedLayout>
    )
}

export default UsersPage;
