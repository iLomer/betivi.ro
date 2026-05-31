import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_PREFIXES = ["/profile", "/tracker", "/venues/new", "/review/new"];
const COOKIE_NAME = "sb-kwairprbgktvxfsicdvb-auth-token";

interface JwtPayload {
  sub: string;
  email?: string;
  exp: number;
}

function parseSessionCookie(raw: string): { userId: string; email: string } | null {
  try {
    const json = raw.startsWith("base64-")
      ? Buffer.from(raw.slice(7), "base64").toString("utf8")
      : decodeURIComponent(raw);

    const session = JSON.parse(json) as {
      access_token?: string;
      user?: { id?: string; email?: string };
    };

    // Prefer the user object which is already decoded
    if (session.user?.id) {
      return { userId: session.user.id, email: session.user.email ?? "" };
    }

    // Fall back to parsing the JWT access token
    const token = session.access_token;
    if (!token) return null;

    const payloadB64 = token.split(".")[1];
    const payload = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf8")
    ) as JwtPayload;

    if (payload.exp * 1000 < Date.now()) return null;

    return { userId: payload.sub, email: payload.email ?? "" };
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const cookieValue = request.cookies.get(COOKIE_NAME)?.value;
  const parsed = cookieValue ? parseSessionCookie(cookieValue) : null;

  const requestHeaders = new Headers(request.headers);
  if (parsed) {
    requestHeaders.set("x-user-id", parsed.userId);
    requestHeaders.set("x-user-email", parsed.email);
  }

  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));

  if (!parsed && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
