"use client"
import AuthModal from '@/app/[locale]/(public pages)/(home)/components/AuthModal'
import { SET_EXPAND } from '@/redux/features/actions/actionSlice'
import { User } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function AuthUser() {
    const dispatch = useDispatch()
    return (
        <>
            <button className='text-white'>
                <User onClick={() => dispatch(SET_EXPAND("AUTH_MODAL"))} fill='white' className='h-6 w-6' />
            </button>
            <AuthModal />
        </>
    )
}
