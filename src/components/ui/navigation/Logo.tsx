// import { useTheme } from "@tremor/react"
// import Image from "next/image"

// const Logo = () => {
//   const { theme } = useTheme()

//   const logoPath =
//     theme === "dark" ? "/nike_logo_white.png" : "/nike_logo_black.png"

//   return <Image src={logoPath} alt="Company Logo" width={60} height={10} />
// }

// export default Logo

import Image from "next/image"
import { useEffect, useState } from "react"

const Logo = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const determineTheme = () => {
      const currentTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
      setTheme(currentTheme)
    }

    determineTheme()

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const themeChangeListener = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light")
    }
    mediaQuery.addEventListener("change", themeChangeListener)

    return () => {
      mediaQuery.removeEventListener("change", themeChangeListener)
    }
  }, [])

  const logoPath =
    theme === "light" ? "/nike_logo_black.png" : "/nike_logo_white.png"

  return <Image src={logoPath} alt="Company Logo" width={60} height={10} />
}

export default Logo
