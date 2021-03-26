import Prismic from "prismic-javascript";
import Head from "next/head";
import { motion } from "framer-motion";

export default function Home(props) {
  console.log(props);
  return (
    <>
      <Head>
        <link
          rel="preload"
          as="font"
          href="/fonts/bentonsansregular.otf"
          type="font/otf"
          crossorigin="anonymous"
        ></link>
        <title>My new site</title>
      </Head>
      <motion.div
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        initial={{ opacity: 0 }}
        className="flex justify-center items-center h-screen"
      >
        <div className="flex flex-col justify-center items-center">
          <h1 className="m-2">Hello, world!</h1>
          <button className="button m-2">Start</button>
        </div>
      </motion.div>
    </>
  );
}

export async function getStaticProps() {
  // add your Prismic project
  const apiEndpoint = "https://izem-site-2021.cdn.prismic.io/api/v2";
  const Client = Prismic.client(apiEndpoint);
  const data = await Client.query(
    // specify the data you're querying
    Prismic.Predicates.at("document.type", "blog-post")
  );
  const blogPosts = data.results;
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { blogPosts }, // will be passed to the page component as props
  };
}
