import { createBrowserRouter } from 'react-router-dom'

import Layout from '@layouts/Layout'
import {
  HomePage,
  NotFoundPage,
  TasksPage,
  TaskForm,
  LoginPage,
  SignUpPage,
  ProfilePage,
  AboutPage
} from '@pages'
import { routes } from '@utils/const'
import PrivateRoute from '@components/privateRoute/PrivateRoute'

const router = createBrowserRouter([
  {
    path: routes.root,
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: routes.root,
        element: <PrivateRoute />,
        children: [
          {
            path: routes.root,
            element: <HomePage />
          },
          {
            path: routes.tasks.root,
            element: <TasksPage />
          },
          {
            path: routes.tasks.new,
            element: <TaskForm />
          },
          {
            path: routes.profile,
            element: <ProfilePage />
          }
        ]
      },
      {
        path: routes.about,
        element: <AboutPage />
      },
      {
        path: routes.login,
        element: <LoginPage />
      },
      {
        path: routes.signUp,
        element: <SignUpPage />
      }
    ]
  }
])

export default router
