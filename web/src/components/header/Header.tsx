import { Avatar, Button, Typography } from '@mui/material';
import { useReduxSelector } from '@redux/hooks';
import AppLogo from '@reusable/icons/logo';
import { useOutsideClick } from '@utils/useOutsideClick';
import React, { useRef, useState } from 'react';
import ProfileBox from './ProfileBox';
import { useRouter } from 'next/router';

export const Header = () => {

    const router = useRouter();

    const user = useReduxSelector((state) => state.userState.user);
    const userInitials = user?.name?.split(' ')?.map((name) => name[0])?.join('');

    const [profileBoxIsOpen, setprofileBoxIsOpen] = useState(false);

    const profileBoxRef = useRef(null);

    useOutsideClick(profileBoxRef, () => setprofileBoxIsOpen(false));

    return (
        <div className='flex justify-center items-center w-full h-14 bg-gray-800 z-40'>
            <div className="flex items-center justify-between w-full h-full max-w-6xl px-10">
                <div className="logo flex items-center">
                    <Button
                        onClick={() => router.push('/in/projects')}
                    >
                        <AppLogo size={40}/>
                        <span
                            className='font-bold text-white text-xl'
                        >
                            <abbr title="Smart Annotations Interface">S. A. I.</abbr>
                        </span>
                    </Button>
                </div>
                <div className="flex">
                    <div className="profile-icon relative">
                        <Button
                            onClick={() => setprofileBoxIsOpen(prev => !prev)}
                            className='p-0'
                        >
                            <Avatar
                                className="bg-amber-200 text-gray-700"
                            >
                                {userInitials}
                            </Avatar>
                        </Button>
                        {
                            !!profileBoxIsOpen && 
                            (
                                <div 
                                    ref={profileBoxRef}
                                    className="z-50 absolute -bottom-1 right-0 transform translate-y-full"
                                >
                                    <ProfileBox 
                                        user={user}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}