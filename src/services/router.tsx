import { RootComponent } from "../components/root";
import { HomeComponent } from "../components/home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BlogComponent from "../components/blog";
import BlogSlugComponent from "../components/blog.slug";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootComponent />,
    children: [
      {
        path: "/",
        element: <HomeComponent />,
      },
      {
        path: "/blog",
        element: <BlogComponent />,
      },
      {
        path: "/blog/:slug",
        element: <BlogSlugComponent />,
      },
    ],
  },
]);

const RouterComponent = () => {
  return <RouterProvider router={router} />;
};

export default RouterComponent;
