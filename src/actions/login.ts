'use server'

import { cookies } from 'next/headers'

export async function loginUser(email: string, password: string) {
    const res = await fetch(`${process.env.API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || 'Login failed')
    }

    // Important: do NOT use `await` here
    const cookieStore = await cookies() // mutable CookieStore in server actions

    cookieStore.set('auth_token', data.token, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
    })

    return data.user
}


export async function logoutUser() {
    const cookieStore = await cookies();
    cookieStore.delete('auth_token');
}
