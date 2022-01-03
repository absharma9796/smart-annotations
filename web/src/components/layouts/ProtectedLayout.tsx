import { Header } from '@components/header';
import AppLogo from '@reusable/icons/logo';
import React, { useEffect } from 'react';
import { changeAppLoadingState__action, __APP_STATES } from '@redux/actions';
import { useReduxDispatch, useReduxSelector } from '@redux/hooks';
import { Typography } from '@mui/material';
import { getLoggedInUserDetails__api } from 'src/pages/api/users/me';
import logger from '@utils/logger';
import { setUser__action } from '@redux/actions/user.action';
import { useRouter } from 'next/router';
import BodyLayout from './BodyLayout';
import axios from 'axios';

const ProtectedLayout: React.FC = ({
    children,
    ...props
}) => {
    
    const appState = useReduxSelector((state) => state.appState.appLoadingState);

    const dispatch = useReduxDispatch();
    const router = useRouter();

    useEffect(() => {
        //TODO: call user api
        (async function loadProfile() {
            if(appState === __APP_STATES.LOADED) return;
            const { success, data: userDetails } = await getLoggedInUserDetails__api();
            if(success && userDetails?.id) {
                dispatch(setUser__action(userDetails));
                setTimeout(() => dispatch(changeAppLoadingState__action("LOADED")), 2000);
                return;
            } else {
                router.push('/');
            }
        })();
        return () => {};
    }, []);


    if(appState === __APP_STATES.LOADING) {
        return(
            <div className="flex flex-col items-center justify-center h-screen w-screen overflow-hidden bg-gray-800">
                <div className="flex animate-bounce">
                    <AppLogo size={150}/>
                </div>
                <Typography
                        className='text-center text-gray-600 selection:bg-amber-300 selection:text-amber-900'
                        variant='h4'
                    >
                        Loading...
                </Typography>
            </div>
        )
    }

    return (
        <div className='h-screen w-screen'>
            <Header />
            <BodyLayout>
                {children}
            </BodyLayout>
        </div>
    )
}

export default ProtectedLayout;
