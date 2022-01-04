import ProtectedLayout from '@components/layouts/ProtectedLayout';
import DatasetsHome from '@components/datasets/DatasetsHome';
import Head from 'next/head';
import React, { useState } from 'react'
import SideNav from '@components/navigation/SideNav';
import { NavButtonProps } from '@components/navigation/NavButton';
import { AccountCircleRounded, BubbleChartRounded } from '@mui/icons-material';

const DatasetsPage = () => {

    const navlist: NavButtonProps[] = [
        {
            title: "Datasets",
            href: "/in/datasets",
            icon: <BubbleChartRounded fontSize="small" className="mr-2"/>
        }
    ]

    return (
        <ProtectedLayout>
            <Head>
                <title>Datasets | Smart Annotations Interface</title>
            </Head>
            <SideNav 
                navlist={navlist}
            />
            <DatasetsHome />
        </ProtectedLayout>
    )
}

export default DatasetsPage;
