import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

async function handler(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  // Check for secret to confirm this is a valid request
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const tag = searchParams.get("tag") || "cms";
  const path = searchParams.get("path") || "/";

  try {
    // Clear the specific tag used in tagged fetches
    revalidateTag(tag, "max");

    // Revalidate the path (default to the layout tree from root)
    revalidatePath(path, "layout");

    return NextResponse.json({
      revalidated: true,
      tag,
      path,
      now: Date.now(),
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: err.message },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  return handler(request);
}

export async function GET(request) {
  return handler(request);
}

