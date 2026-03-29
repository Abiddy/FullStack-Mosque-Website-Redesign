import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faYoutube, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const Footer = () => {
  return (
    <footer className="relative">
      <div className="bg-[var(--sand-footer)] py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left order-2 md:order-1">
              <p className="text-[11px] uppercase tracking-wider text-[var(--ink)] font-bold">
                © 2024, Islamic Institute of Torrance
              </p>
              <p className="text-[10px] text-stone-600 mt-1">
                18103 Prairie Ave, Torrance, CA 90504 | (310) 956-8006
              </p>
            </div>

            <div className="flex items-center gap-6 order-1 md:order-2">
              <a
                href="https://www.facebook.com/groups/iitorrance/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-[var(--terracotta)] transition-colors"
              >
                <FontAwesomeIcon icon={faFacebook as IconProp} size="lg" />
              </a>
              <a
                href="https://www.youtube.com/@iitorrance285"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-[var(--terracotta)] transition-colors"
              >
                <FontAwesomeIcon icon={faYoutube as IconProp} size="lg" />
              </a>
              <a
                href="https://www.instagram.com/masjidiit/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-[var(--terracotta)] transition-colors"
              >
                <FontAwesomeIcon icon={faInstagram as IconProp} size="lg" />
              </a>
            </div>

            <div className="text-center md:text-right order-3">
              <p className="text-[10px] text-stone-500 font-light italic">Made with حُب in Gardena</p>
            </div>
          </div>
        </div>
      </div>
      <div className="pattern-h-strip" aria-hidden />
    </footer>
  );
};

export default Footer;
