import { height } from '@mui/system';
import React from 'react';
import NavButton, { NavButtonProps } from './NavButton';

type SideNavProps = {
    navlist?: NavButtonProps[]
}

const SideNav: React.FC<SideNavProps> = ({
    navlist=[],
    ...props
}) => {
    return (
        <div 
            className='w-1/4 px-2 py-20'
            style={{
                maxWidth: "15rem",
                height: "calc(100vh - 3.5rem)"
            }}
        >
            <ul className='flex flex-col items-center px-2'>
                {
                    navlist.map(nav => (
                        <NavButton
                            {...nav}
                        />
                    ))
                }
            </ul>
        </div>
    )
}

export default SideNav
