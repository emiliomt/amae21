/** @type {import('next').NextConfig} */
export default {
  output: "export",          // sitio 100% estático (Vercel o Cloudflare Pages)
  trailingSlash: true,
  images: { unoptimized: true },
};
