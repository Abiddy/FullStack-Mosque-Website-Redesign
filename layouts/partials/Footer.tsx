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
    <footer className=" bg-theme-dark">
      <div className="container mt-10 pb-10">
        {/* footer menu */}
        {/* <div className="row">
          {footer.map((col) => {
            return (
              <div className="mb-12 sm:col-6 lg:col-3" key={col.name}>
                {markdownify(col.name, "h2", "h4")}
                <ul className="mt-6">
                  {col?.menu.map((item) => (
                    <li className="mb-1" key={item.text}>
                      <Link href={item.url} rel="">
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <div className="md-12 sm:col-6 lg:col-3">
            <Link href="/" aria-label="Bigspring">
              <Image
                src={config.site.logo}
                width={parseInt(config.site.logo_width)}
                height={parseInt(config.site.logo_height)}
                alt=""
              />
            </Link>
            {markdownify(footer_content, "p", "mt-3 mb-6")}
            <Social source={social} className="social-icons mb-8" />
          </div>
        </div> */}
        {/* copyright */}
        
        <div>
          <div className="flex justify-center">
            <p className="text-black text-lg font-light mb-2">Follow Us</p>
          </div>
          <div className="flex justify-center gap-8 mt-3 mb-8">
            <a
              href="https://www.facebook.com/groups/iitorrance/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4AF37] hover:text-[#c19b20] transition-colors hover:scale-110"
            >
              <FontAwesomeIcon 
                icon={faFacebook as IconProp} 
                size="2x"
              />
            </a>
            <a
              href="https://www.youtube.com/@iitorrance285"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4AF37] hover:text-[#c19b20] transition-colors hover:scale-110"
            >
              <FontAwesomeIcon 
                icon={faYoutube as IconProp} 
                size="2x" 
              />
            </a>
            <a
              href="https://www.instagram.com/masjidiit/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4AF37] hover:text-[#c19b20] transition-colors hover:scale-110"
            >
              <FontAwesomeIcon 
                icon={faInstagram as IconProp} 
                size="2x" 
              />
            </a>
          </div>
          <p className="text-sm text-center"> © 2024, Islamic Center of Torrance, 18103 Prairie Ave, Torrance, CA 90504 | (310) 956-8006 </p>
          <p className="text-center text-gray-900 mt-5 mb-10 text-sm font-light">Made with حُب in Gardena</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
