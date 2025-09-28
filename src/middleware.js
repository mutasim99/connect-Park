import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server";



export const middleware = async (req) => {
    const token = await getToken({
        req,
        secureCookie: process.env.NODE_ENV === 'production' ? true : false
    });
    const { pathname } = req.nextUrl;
    const isUserRoute = req.nextUrl.pathname.startsWith('/dashboard');

    if (!token && isUserRoute) {
        const callbackUrl = encodeURIComponent(req.nextUrl.pathname)
        return NextResponse.redirect(new URL(`/api/auth/signin?callbackUrl=${callbackUrl}`, req.url))
    }

    const employeeRouts = ['/dashboard/overview', '/dashboard/addVehicle', '/dashboard/admin-dashboard']
    const userRoutes = ['/dashboard/my-profile']

    if (employeeRouts.some(route => pathname.startsWith(route)) && token.role !== 'employee') {
        const response = NextResponse.redirect(new URL('/login', req.url));

        response.cookies.set('next-auth.session-token', "", { maxAge: 0 })
        response.cookies.set('__Secure-next-auth.session-token', "", { maxAge: 0 })
        return response;
    }


    return NextResponse.next()
}