import { GetServerSideProps } from "next";
import Head from "next/head";
import SheikhDashboard from "@layouts/components/SheikhDashboard";
import { listAllQuestions } from "@lib/questions/db";
import { getSheikhSession } from "@lib/sheikh/session";
import type { Question } from "@lib/questions/types";

type Props = {
  questions: Question[];
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  res,
}) => {
  const session = await getSheikhSession(req, res);
  if (!session.isLoggedIn) {
    return {
      redirect: { destination: "/sheikh", permanent: false },
    };
  }

  try {
    const questions = await listAllQuestions();
    return { props: { questions } };
  } catch (error) {
    console.error("[sheikh/dashboard]", error);
    return { props: { questions: [] } };
  }
};

const SheikhDashboardPage = ({ questions }: Props) => {
  return (
    <>
      <Head>
        <title>Sheikh Q&amp;A — IIT</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <SheikhDashboard initialQuestions={questions} />
    </>
  );
};

export default SheikhDashboardPage;
