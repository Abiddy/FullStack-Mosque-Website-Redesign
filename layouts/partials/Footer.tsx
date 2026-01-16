import config from "@config/config.json";
import menu from "@config/menu.json";
import { markdownify } from "@lib/utils/textConverter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebook, 
  faYoutube, 
  faInstagram 
} from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
const Footer = () => {
  const { copyright, footer_content } = config.params;
  const { footer } = menu;
  return (
    <footer className="bg-white py-6 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright and Info */}
          <div className="text-center md:text-left order-2 md:order-1">
            <p className="text-[11px] uppercase tracking-wider text-gray-900 font-bold">
              © 2024, Islamic Institute of Torrance
            </p>
            <p className="text-[10px] text-gray-500 mt-1">
              18103 Prairie Ave, Torrance, CA 90504 | (310) 956-8006
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-6 order-1 md:order-2">
            <a
              href="https://www.facebook.com/groups/iitorrance/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-500 transition-colors"
            >
              <FontAwesomeIcon icon={faFacebook as IconProp} size="lg" />
            </a>
            <a
              href="https://www.youtube.com/@iitorrance285"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-500 transition-colors"
            >
              <FontAwesomeIcon icon={faYoutube as IconProp} size="lg" />
            </a>
            <a
              href="https://www.instagram.com/masjidiit/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-500 transition-colors"
            >
              <FontAwesomeIcon icon={faInstagram as IconProp} size="lg" />
            </a>
          </div>

          {/* Made with... */}
          <div className="text-center md:text-right order-3">
            <p className="text-[10px] text-gray-400 font-light italic">
              Made with حُب in Gardena
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
