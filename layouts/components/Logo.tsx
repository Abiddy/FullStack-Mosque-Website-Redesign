import config from "@config/config.json";
import Link from "next/link";
import IITLogo from "./IITLogo";

const Logo = () => {
  const { base_url, logo_text } = config.site;

  return (
    <Link
      href={base_url}
      className="flex items-center gap-2 py-1"
      aria-label={logo_text}
    >
      <IITLogo size={36} />
      <span className="font-pp text-lg text-[#2c2c2c]">{logo_text}</span>
    </Link>
  );
};

export default Logo;
