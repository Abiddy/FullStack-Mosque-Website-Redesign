import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import IITLogo from "@layouts/components/IITLogo";

const Footer = () => {
  return (
    <footer className="border-t border-[#e8e8e8] bg-[#fefffc]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <div className="mb-3 flex items-center justify-center gap-2.5 md:justify-start">
              <IITLogo size={36} />
              <p className="font-pp text-lg text-[#2c2c2c]">
                Islamic Institute of Torrance
              </p>
            </div>
            <p className="mt-2 text-sm text-[#646464]">
              18103 Prairie Ave, Torrance, CA 90504 · (310) 956-8006
            </p>
            <p className="mt-1 text-xs text-[#b4b8b4]">
              © {new Date().getFullYear()} IIT. Made with حُب in Gardena
            </p>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://www.facebook.com/groups/iitorrance/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#b4b8b4] transition-colors hover:text-[#2c2c2c]"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebook as IconProp} size="lg" />
            </a>
            <a
              href="https://www.youtube.com/@iitorrance285"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#b4b8b4] transition-colors hover:text-[#2c2c2c]"
              aria-label="YouTube"
            >
              <FontAwesomeIcon icon={faYoutube as IconProp} size="lg" />
            </a>
            <a
              href="https://www.instagram.com/masjidiit/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#b4b8b4] transition-colors hover:text-[#2c2c2c]"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram as IconProp} size="lg" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-[#646464]">
            <Link href="#announcements" className="hover:text-[#2c2c2c]">
              Events
            </Link>
            <Link href="#activities" className="hover:text-[#2c2c2c]">
              Activities
            </Link>
            <Link href="#ask-a-question" className="hover:text-[#2c2c2c]">
              Ask a Question
            </Link>
            <Link href="#donate" className="hover:text-[#2c2c2c]">
              Donate
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
