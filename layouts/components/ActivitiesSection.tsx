import { Wrench } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import activities from "./activities.json";
import TextFade from "./ui/TextFade";

function activityPreview(item: {
  content?: string;
  readmore?: string;
}) {
  const c = (item.content || "").trim();
  if (c) return c;
  const r = (item.readmore || "").trim();
  if (r.length <= 140) return r;
  return `${r.slice(0, 137).trim()}…`;
}

const Modal = ({
  title,
  body,
  onClose,
}: {
  title: string;
  body: string;
  onClose: () => void;
}) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
    onClick={onClose}
  >
    <div
      className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border-2 border-[#dee2de] bg-[#fefffc] p-8"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="font-pp mb-4 text-2xl text-[#2c2c2c]">{title}</h2>
      <p className="mb-8 text-sm leading-relaxed text-[#444141]">{body}</p>
      <button
        type="button"
        onClick={onClose}
        className="w-full rounded-full bg-black py-3 text-sm font-medium text-white hover:bg-[#2c2c2c]"
      >
        Close
      </button>
    </div>
  </div>
);

const ActivitiesSection = () => {
  const [modal, setModal] = useState<{ title: string; body: string } | null>(
    null
  );

  return (
    <section id="activities" className="fm-section px-6 py-14 md:py-20 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <TextFade className="mb-12 md:mb-16">
          <h2 className="font-pp max-w-[900px] text-[32px] leading-[0.95] text-[#2c2c2c] md:text-[50px] lg:max-w-[700px]">
            Programs that serve our community
          </h2>
          <p className="mt-5 max-w-[620px] text-base text-[#444141] lg:max-w-[520px] md:text-lg">
            Quran learning, youth gatherings, halaqahs, and weekend events —
            open to everyone.
          </p>
        </TextFade>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((item, i) => (
            <article
              key={i}
              className="fm-card flex min-h-[280px] flex-col rounded-2xl p-6"
            >
              <h3 className="font-pp mb-3 text-xl leading-tight text-[#2c2c2c]">
                {item.name}
              </h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-[#444141]">
                {activityPreview(item)}
              </p>
              <div className="flex items-end justify-between">
                <button
                  type="button"
                  onClick={() =>
                    setModal({ title: item.name, body: item.readmore })
                  }
                  className="text-sm font-medium text-[#646464] transition-colors hover:text-[#2c2c2c]"
                >
                  Read more →
                </button>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef1ed]">
                  {item.icon ? (
                    <div className="relative h-5 w-5">
                      <Image
                        src={item.icon}
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <Wrench className="h-4 w-4 text-[#646464]" strokeWidth={1.5} />
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {modal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Modal
            title={modal.title}
            body={modal.body}
            onClose={() => setModal(null)}
          />
        </motion.div>
      )}
    </section>
  );
};

export default ActivitiesSection;
