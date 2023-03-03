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
import {useCartContext} from "./../../hooks/useCartContext";
import {IProduct} from "./../../contexts/CartContext";

interface ProductProps {
  product: IProduct;
}

export default function Product({product}: ProductProps) {
  const {isFallback} = useRouter(); // se o fallback for true, ele vai mostrar a mensagem de carregando enquanto gera a pagina estática
  if (isFallback) {
    return <p>Carregando...</p>;
  } // se o fallback for true, ele vai mostrar a mensagem de carregando enquanto gera a pagina estática

  const {addToCart, checkIfItemAlreadyExistsInCart} = useCartContext(); // usando o hook personalizado useCartContext para adicionar o produto no carrinho de compras através da função addToCart

  const itemAlreadyExistsInCart = checkIfItemAlreadyExistsInCart(product); // usando o hook personalizado useCartContext para adicionar o produto no carrinho de compras através da função addToCart

  return (
    <>
      <Head>
        <title>{product.name}</title>
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
            disabled={itemAlreadyExistsInCart}
            onClick={(e) => addToCart(product)}
          >
            {itemAlreadyExistsInCart ? "Produto ja esta no carrinho" : "Comprar"}
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
    fallback: true, // true: se o id nao estiver na lista, ele vai gerar a pagina estática na hora que o usuário acessar
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
        numberPrice: price.unit_amount / 100,
        description: product.description,
        defaultPriceId: price.id,

      },
    }, // vai ser passado para o componente como props
    revalidate: 60 * 60 * 1, // a cada 1 hora vai ser regerada essa pagina estática durante esse intervalo o usuário consome em cache
  };
};
