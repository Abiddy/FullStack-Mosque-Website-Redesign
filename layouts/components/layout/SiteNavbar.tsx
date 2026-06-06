import Link from "next/link";
import IITLogo from "../IITLogo";
import NavActions from "../NavActions";

const SiteNavbar = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-30 border-b border-[#e8e8e8] bg-[#fefffc]/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl min-w-0 items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 md:h-[72px]">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-1.5 transition-opacity hover:opacity-90 sm:flex-1 sm:gap-2.5"
        >
          <IITLogo size={28} className="sm:hidden" />
          <IITLogo size={40} className="hidden sm:block" />
          <span className="font-pp text-sm leading-tight text-[#2c2c2c] sm:min-w-0 sm:truncate sm:text-[22px] md:text-[26px]">
            <span className="sm:hidden">IIT</span>
            <span className="hidden sm:inline">Islamic Institute of Torrance</span>
          </span>
        </Link>

        <NavActions />
      </div>
    </header>
  );
};

export default SiteNavbar;
