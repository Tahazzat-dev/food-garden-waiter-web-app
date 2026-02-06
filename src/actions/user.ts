'use server'

import { cookies } from "next/headers"

export async function profileInfo() {
    // read token from cookie
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    const res = await fetch(`${process.env.API_URL}/api/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
    })

    const data = await res.json()
    if (!res.ok) {
        throw new Error(data.message || "Couldn't get profile information")
    }
    return { profile: data.profile, token }
}
