import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL;

if (!BACKEND_API_BASE_URL) {
  throw new Error("BACKEND_API_BASE_URL is not set");
}

async function handler(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const search = req.nextUrl.search || "";
  const targetUrl = `${BACKEND_API_BASE_URL}/v1/${path.join("/")}${search}`;

  const cookie = req.headers.get("cookie") ?? "";
  const contentType = req.headers.get("content-type");
  const authHeader = req.headers.get("authorization"); // ← declare it here

  let body: BodyInit | undefined = undefined;

  if (req.method !== "GET" && req.method !== "HEAD") {
    body = await req.text();
  }

  const upstream = await fetch(targetUrl, {
    method: req.method,
    headers: {
      ...(contentType ? { "content-type": contentType } : {}),
      ...(cookie ? { cookie } : {}),
      ...(authHeader ? { authorization: authHeader } : {}),
    },
    body,
    cache: "no-store",
    redirect: "manual",
  });

  const responseText = await upstream.text();

  const response = new NextResponse(responseText, {
    status: upstream.status,
    headers: {
      "content-type": upstream.headers.get("content-type") || "application/json",
    },
  });

  const setCookie = upstream.headers.get("set-cookie");
  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }

  return response;
}

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const DELETE = handler;
export const OPTIONS = handler;