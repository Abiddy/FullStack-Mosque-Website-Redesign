import type { ReactNode } from "react";
import SiteNavbar from "./SiteNavbar";

type PageShellProps = {
  children: ReactNode;
};

const PageShell = ({ children }: PageShellProps) => {
  return (
    <div className="bg-[#fefffc]">
      <SiteNavbar />
      <div className="pt-16 md:pt-[72px]">{children}</div>
    </div>
  );
};

export default PageShell;
