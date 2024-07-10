import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";
import Modal from "@layouts/components/Modal";
import config from "@config/config.json";

const Header = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);

  const handleClick = (id: string | number) => {
    setShowModal(false);
  };

  const { title, content, enddate } = config.announcement;
  const { enable, label, link } = config.nav_button;

  return (
    <header className="">
<nav className="navbar fixed top-0 w-full shadow-md p-7 flex items-center justify-between justify-center bg-white z-50">
          
          <a href="#salah">
           <img src="/images/salah.png" alt="salah" className="h-7 w-7" />
          </a>
          <a href="#announcements">
          <img src="/images/megaphone.png" alt="Megaphone" className="h-7 w-7" />
          </a>
          <a  href="#about">
          <img src="/images/info2.png" alt="Info" className="h-6 w-6" />
          </a>
          <a href="#donate">
          <img src="/images/heart2.png" alt="Heart" className="h-6 w-6" />
          </a>
          <a href="#contactUs">
          <img src="/images/chat.png" alt="Chat" className="h-6 w-6" />
          </a>
       
        {enable && (
          <div className="fixed bottom-5 right-5 z-50">
            <Link className="btn btn-primary z-0 py-[20px] border border-white" href={link} rel="">
              {label}
            </Link>
          </div>
        )}
      </nav>
      {showModal && moment(new Date()).isBefore(moment(enddate, "DD-MM-YYYY")) && (
        <Modal title={title} body={content} handleClick={handleClick} />
      )}
    </header>
  );
};

export default Header;
