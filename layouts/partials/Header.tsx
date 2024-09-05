import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";
import Modal from "@layouts/components/Modal";
import config from "@config/config.json";

const Header = (announcements: any) => {
  // Calculate the number of announcements
  const numOfAnnouncements = announcements?.announcements?.data?.length || 0;

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
        <a href="#announcements" className="relative">
          <img src="/images/megaphone.png" alt="Megaphone" className="h-7 w-7" />
          {numOfAnnouncements > 0 && (
            <span className="absolute top-[-1px] right-[-3px] block h-4 w-4 bg-red-500 rounded-full text-white text-xs leading-tight text-center">
              {numOfAnnouncements}
            </span>
          )}
        </a>
        <a href="#about">
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
