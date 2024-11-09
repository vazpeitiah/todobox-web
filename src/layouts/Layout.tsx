import { Outlet, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

import { Navbar } from "@components"
import { routes } from "@utils/const"
import clsx from "clsx"

const Layout = () => {
  const { pathname } = useLocation()

  const isLoginPaths = [routes.login, routes.signUp, routes.about].includes(
    pathname
  )

  return (
    <>
      <Navbar />
      <AnimatePresence>
        <main
          className={clsx({
            ["max-w-4xl mx-auto py-8 md:px-8 px-4"]: !isLoginPaths
          })}
        >
          <Outlet />
        </main>
      </AnimatePresence>
    </>
  )
}

export default Layout
