import {GetServerSideProps} from "next";
import Link from "next/link";
import Stripe from "stripe";
import {stripe} from "../lib/stripe";
import Image from "next/image";

import {
  ImageContainer,
  ImagesContainer,
  SuccessContainer,
} from "../styles/pages/success";
import Head from "next/head";

interface SuccessProps {
  costumerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
  productsImages: string[];
}

export default function Success({
  costumerName,
  product,
  productsImages,
}: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <ImagesContainer>
          {productsImages.map((image, i) => ( // aqui eu criei um map para percorrer as imagens dos produtos comprados e retornar para a página success
            <ImageContainer key={i}>
              <Image src={image} width={120} height={110} alt="" />
            </ImageContainer>
          ))}
        </ImagesContainer>

        <h1>Compra efetuada!</h1>

        <p>
          Uhuul <strong>{costumerName}</strong>, sua compra de{" "}
          {productsImages.length} camisetas já está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async ({query}) => { // aqui eu criei a função getServerSideProps para pegar os dados da sessão do stripe e retornar para a página success
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } // se não tiver o session_id na query, ele redireciona para a home

  const sessionId = String(query.session_id); // se tiver o session_id na query, ele pega o id da sessão

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    // ele pega a sessão do stripe
    expand: ["line_items", "line_items.data.price.product"], // ele pega os dados do produto
  }); //

  const customerName = session.customer_details.name; // aqui ele pega o nome do cliente na sessão do stripe e retorna para a página success
  const productsImages = session.line_items.data.map((item) => {
    const product = item.price.product as Stripe.Product;
    return product.images[0];
  }); // aqui ele pega o nome do cliente e as imagens dos produtos comprados na sessão do stripe e retorna para a página success

  return {
    props: {
      customerName,
      productsImages,
    },
  };// aqui ele retorna os dados do cliente e das imagens dos produtos
};
