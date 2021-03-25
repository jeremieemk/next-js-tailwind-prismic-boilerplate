import Prismic from "prismic-javascript";
import Head from "next/head";

export default function Home(props) {
  console.log(props);
  return (
    <>
      <Head>
        <title>My new iZem site</title>
      </Head>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center h-screen">
          <h1>Hello, world!</h1>
          <button className="button">Start</button>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const apiEndpoint = "https://izem-site-2021.cdn.prismic.io/api/v2";
  const Client = Prismic.client(apiEndpoint);
  const data = await Client.query(
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
