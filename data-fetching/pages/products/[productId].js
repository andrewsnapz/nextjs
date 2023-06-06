import fs from "fs/promises";
import path from "path";

import { Fragment } from "react";

export default function ProductDetailPage({ loadedProduct }) {
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

// getStaticProps will not work with dynamic content
// we will have multiple pages with different ids...
export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.productId;
  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const pathWithParams = ids.map((id) => ({ params: { productId: id } }));
  /*
  {
    params: {productId: id}
  }
  */

  return {
    paths: pathWithParams,
    // fallback: false,
    fallback: true,
    // fallback: "blocking",
  };
}
