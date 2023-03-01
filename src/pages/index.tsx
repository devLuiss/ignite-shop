import Head from "next/head";
import {GetStaticProps} from "next";
import Link from "next/link";

import {useKeenSlider} from "keen-slider/react";

import {stripe} from "../lib/stripe";
import {HomeContainer, Product} from "../styles/pages/home";

import "keen-slider/keen-slider.min.css";
import Stripe from "stripe";
import Image from "next/image";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
}

export default function Home({products}: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <>
      <Head>
        <title>Home | igShop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
              </Product>
            </Link>
          );
        })}
      </HomeContainer>
    </>
  );
}

// COMO A PAGINA HOME É ESTÁTICA E NÃO DINÂMICA, NÃO PRECISA DESSA FUNÇÃO  getStaticPaths PARA GERAR AS ROTAS DINÂMICAS DE CADA PRODUTO NA PAGINA HOME (PAGINA ESTÁTICA)
export const getStaticProps: GetStaticProps = async () => {// essa função é executada no servidor node, não no browser
  const response = await stripe.products.list({// listando todos os produtos da stripe (stripe.products.list)
    expand: ["data.default_price"],// expandindo os dados do preço padrão de cada produto
  });//

  const products = response.data.map((product) => {// mapeando os produtos para retornar apenas os dados que eu quero
    const price = product.default_price as Stripe.Price;// pegando o preço padrão de cada produto e convertendo para o tipo Price do stripe

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount! / 100),
    };// retornando apenas os dados que eu quero de cada produto (id, name, imageUrl, price) e formatando o preço para o formato brasileiro 
  });

  return {// retornando os produtos para a pagina home por meio do props (props: {products})
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // a cada 2h vai ser regerada essa pagina estática durante esse intervalo o usuário consome em cache
  };
};
