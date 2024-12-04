import { useTheme } from "next-themes"
import Image from "next/image"

const Logo = () => {
  const { resolvedTheme } = useTheme()

  const logoPath =
    resolvedTheme === "dark" ? "/nike_logo_white.png" : "/nike_logo_black.png"

  return <Image src={logoPath} alt="Company Logo" width={80} height={20} />
}

export default Logo
