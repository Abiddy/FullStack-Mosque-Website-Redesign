import React from "react";
import md from "markdown-it";

export default function Modal({ title, body, handleClick, id }: any) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-auto max-w-3xl">
          <div className="relative flex w-full flex-col rounded-lg border border-[color-mix(in_srgb,var(--ink)_12%,transparent)] bg-[var(--sandy-cream)] shadow-lg outline-none focus:outline-none overflow-hidden">
            <div className="flex items-start justify-between rounded-t border-b border-[color-mix(in_srgb,var(--ink)_10%,transparent)] p-5">
              <h3 className="text-3xl font-semibold text-[var(--ink)]">{title}</h3>
              <button
                className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-[var(--ink)] outline-none focus:outline-none hover:text-[var(--terracotta)] transition-colors"
                onClick={handleClick}
              >
                <span className="block h-6 w-6 bg-transparent text-2xl outline-none focus:outline-none">×</span>
              </button>
            </div>
            <div className="relative flex-auto p-6">
              <div
                className="my-4 text-lg leading-relaxed text-stone-600 text-left [&_a]:text-[var(--terracotta)] [&_a]:underline [&_h1]:text-[var(--ink)] [&_h2]:text-[var(--ink)]"
                dangerouslySetInnerHTML={{
                  __html: md({
                    html: true,
                    linkify: true,
                    typographer: true,
                  }).render(body),
                }}
              />
            </div>
            <div className="flex items-center justify-end rounded-b border-t border-[color-mix(in_srgb,var(--ink)_10%,transparent)] p-6">
              <button
                className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-[var(--terracotta)] outline-none transition-all duration-150 ease-linear hover:opacity-80 focus:outline-none"
                type="button"
                onClick={handleClick}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black/25" />
    </>
  );
}
