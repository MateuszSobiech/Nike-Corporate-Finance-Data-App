/** @type {import('next').NextConfig} */

const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/income-statement/executive-summary",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
