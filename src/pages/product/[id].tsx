import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "./../../styles/pages/product";
import {stripe} from "./../../lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import {GetStaticPaths, GetStaticProps} from "next";
import {useRouter} from "next/router";
import axios from "axios";
import {useState} from "react";
import Head from "next/head";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  };
}

export default function Product({product}: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
      });

      const {checkoutUrl} = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      alert(err.message);
    }
  }

  const {isFallback} = useRouter();

  if (isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <Head>
        <title>{product.name} | igShop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>
          <button
            disabled={isCreatingCheckoutSession}
            onClick={handleBuyProduct}
          >
            Comprar
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

// para usar o staticprops numa pagina que os valores sao dinamicos, tem que usar o getStaticPaths para gerar as paginas estaticas com os valores dinamicos
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {params: {id: "prod_JZ2Z2Z2Z2Z2Z2Z"}}, // geralmente coloca aqui os id dos posts ou produtos mais acessados para carregarem mais rápidos
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<any, {id: string}> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    }, // will be passed to the page component as props
    revalidate: 60 * 60 * 1, // 1 hours
  };
};
