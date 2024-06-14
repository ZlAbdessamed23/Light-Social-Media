import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const staticAssets: string[] = ['/static', '/_next', '/favicon.ico', '/assets'];
const publicRoutes = ["/", "/register", "/login"];
const secret = 'kasjwkasj123'; // Replace with a strong, unique secret

function verifyToken(token: string | undefined): object | null { // Explicit return type
  if (!token) {
    return null; // Handle missing token case
  }

  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    return decoded as Object;
  } catch (err) {
    console.log(err);
    return null; // Handle invalid or expired token
  }
}

export default async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const path = url.pathname;

  // Allow access to static assets and API routes
  if (staticAssets.some(assetPath => path.startsWith(assetPath)) || path.startsWith('/api')) {
    return NextResponse.next();
  }

  // Check if public route or request with a possibly valid token
  if (publicRoutes.includes(path) || request.cookies.get('token')) {
    return NextResponse.next();
  }

  try {
    const token = request.cookies.get('token')?.value;
    const decoded = verifyToken(token);

    if (!decoded) {
      // Redirect to login on invalid or missing token
      console.log("erroooooooooooooor");
      return NextResponse.redirect(new URL('/login', url));
    }

    // Valid token, continue processing authenticated requests (optional)
    return NextResponse.next();
  } catch (err) {
    console.error('Error verifying token:', err);
    // Handle unexpected errors appropriately (e.g., redirect to error page)
    return NextResponse.redirect(new URL('/error', url));
  }
}
