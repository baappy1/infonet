import { revalidatePath, revalidateTag } from "next/cache";

/**
 * Shared secret for WordPress → Next on-demand revalidation.
 * Prefer REVALIDATE_SECRET (matches common .env naming); REVALIDATION_SECRET kept for backward compatibility.
 */
export function getRevalidateSecret() {
  return process.env.REVALIDATE_SECRET || process.env.REVALIDATION_SECRET || "";
}

export function isValidRevalidateSecret(provided) {
  const expected = getRevalidateSecret();
  if (!expected || typeof provided !== "string") return false;
  return provided === expected;
}

/**
 * Resolve shared secret from query, Bearer token, or header (avoids proxies stripping query strings).
 * @param {import('next/server').NextRequest} req
 * @returns {string | null}
 */
export function extractRevalidateSecretFromRequest(req) {
  const q = req.nextUrl.searchParams.get("secret");
  if (typeof q === "string" && q.trim()) return q.trim();

  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) {
    const t = auth.slice(7).trim();
    if (t) return t;
  }

  const h = req.headers.get("x-revalidate-secret");
  if (typeof h === "string" && h.trim()) return h.trim();

  return null;
}

/**
 * Normalize WordPress `post_type` strings (e.g. case_study → case-study).
 * @param {unknown} raw
 * @returns {string} Lowercase, underscores to hyphens; empty if not a non-empty string.
 */
export function normalizeCmsPostType(raw) {
  if (typeof raw !== "string") return "";
  const t = raw.trim().toLowerCase();
  if (!t) return "";
  return t.replace(/_/g, "-");
}

/**
 * WordPress `page` slugs whose `post_name` does not match the Next.js URL.
 * Webhooks send `postType: "page"` + WP slug; we must revalidate the real app paths and
 * section cache tags, so static routes like `/contact` refresh.
 */
const WP_PAGE_SLUG_REVALIDATION = {
  "contact-us-2": { tags: ["contact"], paths: ["/contact"] },
  "contact-us": { tags: ["contact"], paths: ["/contact"] },
  contact: { tags: ["contact"], paths: ["/contact"] },
  home: { tags: ["home"], paths: ["/"] },
  "front-page": { tags: ["home"], paths: ["/"] },
  about: { tags: ["about"], paths: ["/about"] },
  "about-us": { tags: ["about"], paths: ["/about"] },
};

/**
 * Apply cache tags and paths for a CMS change. Safe to call from Route Handlers only.
 * @param {{ postType?: string, slug?: string }} body
 * @returns {{ normalizedPostType: string, slug: string }}
 */
export function runCmsRevalidation(body = {}) {
  const slugRaw = body?.slug;
  const s = typeof slugRaw === "string" ? slugRaw : "";
  const pt = normalizeCmsPostType(body?.postType);

  switch (pt) {
    case "post":
      revalidateTag("blog", "max");
      revalidateTag("all", "max");
      revalidatePath("/blog", "layout");
      if (s) revalidatePath(`/blog/${s}`, "layout");
      break;
    case "page": {
      revalidateTag("all", "max");
      const slugKey = s.trim().toLowerCase();
      const mapped = slugKey ? WP_PAGE_SLUG_REVALIDATION[slugKey] : null;
      if (mapped) {
        for (const tag of mapped.tags) revalidateTag(tag, "max");
        for (const path of mapped.paths) revalidatePath(path, "layout");
      } else if (s) {
        revalidatePath(`/${s}`, "layout");
      }
      break;
    }
    case "case-study":
      revalidateTag("case-study", "max");
      revalidateTag("all", "max");
      revalidatePath("/case-study", "layout");
      if (s) revalidatePath(`/case-study/${s}`, "layout");
      break;
    case "service":
      revalidateTag("service", "max");
      revalidateTag("all", "max");
      revalidatePath("/service", "layout");
      if (s) revalidatePath(`/service/${s}`, "layout");
      break;
    case "career":
      revalidateTag("career", "max");
      revalidateTag("all", "max");
      revalidatePath("/career", "layout");
      if (s) revalidatePath(`/career/${s}`, "layout");
      break;
    case "industry":
    case "industries":
      revalidateTag("industry", "max");
      revalidateTag("all", "max");
      revalidatePath("/industry", "layout");
      if (s) revalidatePath(`/industry/${s}`, "layout");
      break;
    case "team":
      revalidateTag("team", "max");
      revalidateTag("all", "max");
      revalidatePath("/team", "layout");
      break;
    case "case-study-category":
      revalidateTag("case-study", "max");
      revalidateTag("all", "max");
      if (s) revalidatePath(`/case-study-category/${s}`, "layout");
      revalidatePath("/case-study", "layout");
      break;
    case "nav":
    case "nav-menu-item":
      revalidateTag("nav", "max");
      revalidateTag("all", "max");
      revalidatePath("/", "layout");
      break;
    case "about":
      revalidateTag("about", "max");
      revalidateTag("all", "max");
      revalidatePath("/about", "layout");
      break;
    case "contact":
      revalidateTag("contact", "max");
      revalidateTag("all", "max");
      revalidatePath("/contact", "layout");
      break;
    case "home":
      revalidateTag("home", "max");
      revalidateTag("all", "max");
      revalidatePath("/", "layout");
      break;
    case "author":
      revalidateTag("blog", "max");
      revalidateTag("all", "max");
      revalidatePath("/author", "layout");
      if (s) revalidatePath(`/author/${s}`, "layout");
      revalidatePath("/blog", "layout");
      break;
    default:
      revalidateTag("all", "max");
      revalidatePath("/", "layout");
  }

  return { normalizedPostType: pt || "default", slug: s };
}

