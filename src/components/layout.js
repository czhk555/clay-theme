import React, { Suspense, lazy } from "react";
import { useLocation } from "@reach/router";

// 使用 React.lazy 来懒加载 Layout 组件
const Layout = lazy(() => import("../components/layout"));

const MainLayout = ({ title, social, children }) => {
  const location = useLocation();
  const [toggleNav, setToggleNav] = React.useState(false);

  const isCurrentPage = (path) => location.pathname.includes(path);

  return (
    <Suspense fallback={<div>Loading Layout...</div>}>
      <Layout title={title} social={social}>
        {children}
      </Layout>
    </Suspense>
  );
};

export default MainLayout;
