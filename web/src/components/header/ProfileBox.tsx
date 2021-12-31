import { User } from '@dataTypes/user.type';
import { Avatar, Button } from '@mui/material';
import React from 'react';

type ProfileBoxProps = {
    user: User
}

const ProfileBox: React.FC<ProfileBoxProps> = ({user}) => {

    const userInitials = user?.name?.split(' ')?.map((name) => name[0])?.join('');

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        window.location.href = '/';
    }

    return (
        <div className='bg-amber-50 p-4 rounded-lg shadow-lg'>
            <div className="flex items-center">
                <Avatar
                    className="bg-amber-200 text-amber-900"
                    sx={{ width: 64, height: 64 }}
                >
                    {userInitials}
                </Avatar>
                <div>
                    <div className="ml-4 whitespace-nowrap text-lg font-medium">
                        {user?.name}
                    </div>
                    <div className="ml-4 text-gray-600">
                        {user?.email}
                    </div>
                    <div className="ml-4 text-gray-600">
                        Role: <b className='mx-2'>{user?.role}</b>
                    </div>
                </div>
            </div>
            <div className="flex justify-center my-2">
                <Button
                    className="mt-2 bg-red-500 hover:bg-red-600 text-white capitalize"
                    variant="contained"
                    onClick={handleLogout}
                >
                    Sign Out
                </Button>
            </div>
        </div>
    )
}

export default ProfileBox;
