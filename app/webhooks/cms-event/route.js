import { NextResponse } from "next/server";
import {
  extractRevalidateSecretFromRequest,
  isValidRevalidateSecret,
  runCmsRevalidation,
} from "@/lib/revalidate-cms";

export async function POST(req) {
  const provided = extractRevalidateSecretFromRequest(req);
  if (!isValidRevalidateSecret(provided)) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  try {
    const result = runCmsRevalidation(body);
    return NextResponse.json({
      revalidated: true,
      ...result,
      now: Date.now(),
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: err?.message || String(err) },
      { status: 500 },
    );
  }
}

export async function GET(req) {
  // Allow GET for quick manual tests (same secret handling).
  const provided = extractRevalidateSecretFromRequest(req);
  if (!isValidRevalidateSecret(provided)) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const postType = req.nextUrl.searchParams.get("postType") || "default";
  const slug = req.nextUrl.searchParams.get("slug") || "";
  try {
    const result = runCmsRevalidation({ postType, slug });
    return NextResponse.json({
      revalidated: true,
      ...result,
      now: Date.now(),
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: err?.message || String(err) },
      { status: 500 },
    );
  }
}

