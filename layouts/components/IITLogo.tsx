import Image from "next/image";
import config from "@config/config.json";

type IITLogoProps = {
  size?: number;
  className?: string;
};

const IITLogo = ({ size = 36, className = "" }: IITLogoProps) => {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-md ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={config.site.logo}
        alt={config.site.logo_text}
        fill
        sizes={`${size}px`}
        className="object-contain"
        priority
      />
    </div>
  );
};

export default IITLogo;
