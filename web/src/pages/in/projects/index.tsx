import ProtectedLayout from '@components/layouts/ProtectedLayout';
import ProjectsHome from '@components/projects/ProjectsHome';
import Head from 'next/head';
import React from 'react'

const ProjectsPage = () => {
    return (
        <ProtectedLayout>
            <Head>
                <title>Projects | Smart Annotations Interface</title>
            </Head>
            <ProjectsHome />
        </ProtectedLayout>
    )
}

export default ProjectsPage;
