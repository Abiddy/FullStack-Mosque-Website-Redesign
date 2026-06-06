import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonWithIconProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

const ButtonWithIcon = ({ href, children, className }: ButtonWithIconProps) => {
  return (
    <Button
      asChild
      className={cn(
        "relative h-9 rounded-full p-1 ps-3 pe-10 font-pp text-xs font-medium transition-all duration-500 hover:ps-10 hover:pe-3",
        "group w-fit cursor-pointer overflow-hidden",
        "sm:h-11 sm:ps-5 sm:pe-12 sm:text-sm sm:hover:ps-12 sm:hover:pe-5",
        className
      )}
    >
      <Link href={href}>
        <span className="relative z-10 whitespace-nowrap transition-all duration-500">
          {children}
        </span>
        <div className="absolute right-1 flex h-7 w-7 items-center justify-center rounded-full bg-background text-foreground transition-all duration-500 group-hover:right-[calc(100%-32px)] group-hover:rotate-45 sm:h-8 sm:w-8 sm:group-hover:right-[calc(100%-36px)]">
          <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} />
        </div>
      </Link>
    </Button>
  );
};

export default ButtonWithIcon;
