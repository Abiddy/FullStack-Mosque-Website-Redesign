import config from "@config/config.json";
import { plainify } from "@lib/utils/textConverter";
import Footer from "@partials/Footer";
import Head from "next/head";
import { useRouter } from "next/router";

export type base = {
  title?: string;
  meta_title?: string;
  description?: string;
  image?: string;
  noindex?: string;
  canonical?: string;
  children?: React.ReactNode;
};

const Base = ({
  title,
  meta_title,
  description,
  image,
  noindex,
  canonical,
  children,
}: base) => {
  const { meta_image, meta_author, meta_description } = config.metadata;
  const { base_url } = config.site;
  const router = useRouter();

  const pageTitle = plainify(
    meta_title ? meta_title : title ? title : config.site.title
  );
  const pageDescription = plainify(
    description ? description : meta_description
  );

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {canonical && <link rel="canonical" href={canonical} itemProp="url" />}
        {noindex && <meta name="robots" content="noindex,nofollow" />}
        <meta name="description" content={pageDescription} />
        <meta name="author" content={meta_author} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${base_url}/${router.asPath.replace("/", "")}`}
        />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta
          property="og:image"
          content={`${base_url}${image ? image : meta_image}`}
        />
        <meta
          name="twitter:image"
          content={`${base_url}${image ? image : meta_image}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="relative min-h-screen bg-[#fefffc]">
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Base;
