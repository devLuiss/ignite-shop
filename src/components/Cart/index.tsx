import * as Dialog from "@radix-ui/react-dialog";
import {X} from "phosphor-react";
import {CartButton} from "../CartButton";
import {
  CartClose,
  CartContent,
  CartFinalization,
  CartProductDetails,
  CartProductImage,
  CartProducts,
  FinalizationDetails,
} from "./styles";
import Image from "next/image";
import {useCartContext} from "@/src/hooks/useCartContext";
import {useState} from "react";
import axios from "axios";

export function Cart() {
  const {cartItems, removeFromCart, cartTotal} = useCartContext();
  const cartQuantity = cartItems.length;
  const formattedCartTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cartTotal);

  function handleRemoveFromCart(id: string) {
    removeFromCart(id);
  }

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post("/api/checkout", {
        products: cartItems,
      });

      const {checkoutUrl} = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      alert("Falha ao redirecionar ao checkout!");
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton />
      </Dialog.Trigger>

      <Dialog.Portal>
        <CartContent>
          <CartClose>
            <X size={24} />
          </CartClose>
          <h2> sacola de compras </h2>

          <section>
            {cartQuantity <= 0 && (
              <p> Não há produtos no seu carrinho de compras </p>
            )}

            {cartItems.map((cartItem) => (
              <CartProducts key={cartItem.id}>
                <CartProductImage>
                  <Image
                    width={100}
                    height={93}
                    alt=""
                    src={cartItem.imageUrl}
                  />
                </CartProductImage>
                <CartProductDetails>
                  <h3>{cartItem.name}</h3>
                  <strong>{cartItem.price}</strong>
                  <button onClick={() => handleRemoveFromCart(cartItem.id)}>
                    {" "}
                    Remover{" "}
                  </button>
                </CartProductDetails>
              </CartProducts>
            ))}
          </section>
          <CartFinalization>
            <FinalizationDetails>
              <div>
                <span> Quantidade </span>
                <p>
                  {cartQuantity}
                  {cartQuantity > 1 ? " itens" : " item"}
                </p>
              </div>
              <div>
                <span> Total </span>
                <p>{formattedCartTotal}</p>
              </div>
            </FinalizationDetails>
            <button
              disabled={cartQuantity <= 0 || isCreatingCheckoutSession}
              onClick={handleCheckout}
            >
              {" "}
              Finalizar compra{" "}
            </button>
          </CartFinalization>
        </CartContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
