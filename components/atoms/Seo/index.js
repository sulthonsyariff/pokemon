import Head from "next/head";

export default function SEO({ title, description, image }) {
  const metaData = [
    {
      name: "description",
      content: description,
    },
    {
      name: "og:title",
      content: `Pokédex - ${title}`,
    },
    {
      name: "og:description",
      content: description,
    },
    {
      name: "og:type",
      content: "website",
    },
    {
      name: "og:url",
      content: "https://bobobox-sulthonsyariff.vercel.app",
    },
    {
      name: "og:image",
      content: image,
    },
  ];

  return (
    <Head>
      <title>Pokédex | {title}</title>
      {metaData.map(({ name, content }) => (
        <meta key={name} name={name} content={content} />
      ))}
    </Head>
  );
}
