import Header from "../Header";

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    {children}
  </>
);

export default Layout;
