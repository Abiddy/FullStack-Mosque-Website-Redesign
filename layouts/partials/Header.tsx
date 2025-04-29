import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";
import Modal from "@layouts/components/Modal";
import config from "@config/config.json";
import { Dock, DockIcon } from "../../components/magicui/dock";
import Image from "next/image";

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

  const navigationItems = [
    {
      href: "#salah",
      icon: "/images/salah.png",
      alt: "salah",
      badge: null
    },
    {
      href: "#announcements",
      icon: "/images/megaphone.png",
      alt: "Megaphone",
      badge: numOfAnnouncements > 0 ? numOfAnnouncements : null
    },
    {
      href: "#about",
      icon: "/images/info2.png",
      alt: "Info",
      badge: null
    },
    {
      href: "#donate",
      icon: "/images/heart2.png",
      alt: "Heart",
      badge: null
    },
    {
      href: "#contactUs",
      icon: "/images/chat.png",
      alt: "Chat",
      badge: null
    }
  ];

  return (
    <header>
      <div className="fixed bottom-0 w-full z-50 flex justify-center pb-4">
        <Dock className="bg-white/90 dark:bg-black/70 border-gray-200 shadow-lg">
          {navigationItems.map((item, index) => (
            <a key={index} href={item.href} className="relative">
              <DockIcon className="hover:bg-gray-100/50 dark:hover:bg-gray-800/50">
                <div className="relative w-6 h-6">
                  <img
                    src={item.icon}
                    alt={item.alt}
                    className="w-full h-full object-contain"
                  />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                      {item.badge}
                    </span>
                  )}
                </div>
              </DockIcon>
            </a>
          ))}
        </Dock>
      </div>

      {showModal && moment(new Date()).isBefore(moment(enddate, "DD-MM-YYYY")) && (
        <Modal title={title} body={content} handleClick={handleClick} />
      )}
    </header>
  );
};

export default Header;
