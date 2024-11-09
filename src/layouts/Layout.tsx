import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { Navbar, Drawer } from '@components'
import { routes } from '@utils/const'
import clsx from 'clsx'
import { useDrawerStore } from '../stores/drawer'

const Layout = () => {
  const { pathname } = useLocation()
  const { open: isDrawerOpen, toggle: toggleDrawer } = useDrawerStore()

  const isLoginPaths = [
    routes.login,
    routes.signUp,
    routes.about,
    routes.root
  ].includes(pathname)

  return (
    <div className="drawer">
      <input type="checkbox" className="drawer-toggle" checked={isDrawerOpen} />
      <div className="drawer-content">
        <Navbar />
        <AnimatePresence>
          <main
            className={clsx({
              ['max-w-4xl mx-auto py-8 md:px-8 px-4']: !isLoginPaths
            })}
          >
            <Outlet />
          </main>
        </AnimatePresence>
      </div>
      <div className="drawer-side z-[2]">
        <div
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={toggleDrawer}
        ></div>
        <Drawer />
      </div>
    </div>
  )
}

export default Layout
