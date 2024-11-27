// import { useTheme } from "@tremor/react"
// import Image from "next/image"

// const Logo = () => {
//   const { theme } = useTheme()

//   const logoPath =
//     theme === "dark" ? "/nike_logo_white.png" : "/nike_logo_black.png"

//   return <Image src={logoPath} alt="Company Logo" width={150} height={50} />
// }

// export default Logo

import Image from "next/image"
import { useEffect, useState } from "react"

const Logo = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const currentTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light"

    setTheme(currentTheme)

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        setTheme(e.matches ? "dark" : "light")
      })
  }, [])

  const logoPath =
    theme === "dark" ? "/nike_logo_white.png" : "/nike_logo_black.png"

  return <Image src={logoPath} alt="Company Logo" width={150} height={50} />
}

export default Logo
