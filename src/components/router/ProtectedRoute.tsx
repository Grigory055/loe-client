import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';

type ProtectedRoutePropsType = {
    isLogin1: boolean;
    level1: number;
    redirecteTo: string;
}

export default function ProtectedRoute({ isLogin1, level1, redirecteTo }: ProtectedRoutePropsType) {

    const { isLogin, level } = useAppSelector((store) => store.persistedReducer.isLogin);
    console.log('login', isLogin)
    console.log('level', level)

    if(!level) {
        return <Navigate to={redirecteTo} replace />
    }

    if(!isLogin1) {
        return <Navigate to={redirecteTo} replace />
    }
  return <Outlet />
}
