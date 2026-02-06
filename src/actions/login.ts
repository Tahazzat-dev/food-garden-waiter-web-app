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

    // Correct way to set cookie in Next.js 14+ Server Actions
    const cookieStore = await cookies() // <-- returns mutable CookieStore in server actions
    cookieStore.set({
        name: 'auth_token',
        value: data.token,
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
    })

    return data.user
}
