import {GetServerSideProps} from "next";
import Link from "next/link";
import Stripe from "stripe";
import {stripe} from "../lib/stripe";
import Image from "next/image";

import {ImageContainer, SuccessContainer} from "../styles/pages/success";
import Head from "next/head";

interface SuccessProps {
  costumerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}

export default function Success({costumerName, product}: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | igShop</title>
        <meta name="robots" content="noindex" />{" "}
        {/* ele não permite que a página seja indexada 
        pelo google 
        */}
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada</h1>
        <ImageContainer>
          <Image src={product.imageUrl} width={120} height={110} alt="" />{" "}
          {/** ele pega a imagem do produto */}
        </ImageContainer>
        <p>
          Uhuul <strong>{costumerName}</strong>, sua{" "}
          <strong>{product.name}</strong> já está a caminho da sua casa.{" "}
          {/** ele pega o nome do cliente e o nome do produto */}
        </p>
        <Link href="/">Voltar ao catálogo</Link>{" "}
        {/* ele redireciona para a home */}
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
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

  const costumerName = session.customer_details.name; // ele pega o nome do cliente
  const product = session.line_items.data[0].price.product as Stripe.Product; // ele pega os dados do produto

  return {
    props: {
      costumerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  }; // ele retorna os dados do produto e do cliente por props
};
