import {createContext, useState} from "react"; // aqui eu importei o createContext e o useState para criar o contexto e o provider para o carrinho de compras

export interface IProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  numberPrice: number;
  description: string;
  defaultPriceId: string;
} // aqui eu criei a interface para o produto e exportei para que eu possa usar em outros componentes da aplicação

interface CartContextData {
  cartItems: IProduct[];
  addToCart: (product: IProduct) => void;
  checkIfItemAlreadyExistsInCart: (product: IProduct) => boolean;
  removeFromCart: (id: string) => void;
  cartTotal: number;
} // aqui esta a tipagem do contexto com os dados que eu quero compartilhar entre os componentes

interface CartContextProviderProps {
  children: React.ReactNode;
} // aqui eu criei a interface para o provider e exportei para que eu possa usar em outros componentes da aplicação

export const CartContext = createContext({} as CartContextData); // aqui eu criei o contexto e exportei para que eu possa usar em outros componentes da aplicação

export function CartContextProvider({children}: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState([] as IProduct[]);

  const cartTotal = cartItems.reduce((total, product) => {
    return total + product.numberPrice;
  }, 0); // aqui eu criei a função para calcular o total do carrinho de compras e exportei para que eu possa usar em outros componentes da aplicação

  function addToCart(product: IProduct) {
    setCartItems((state) => [...state, product]);
  } // aqui eu criei a função para adicionar o produto no carrinho de compras e exportei para que eu possa usar em outros componentes da aplicação

  function removeFromCart(id: string) {
    setCartItems((state) => state.filter((product) => product.id !== id));
  } // aqui eu criei a função para remover o produto do carrinho de compras e exportei para que eu possa usar em outros componentes da aplicação

  function checkIfItemAlreadyExistsInCart(product: IProduct) {
    return cartItems.some((item) => item.id === product.id);
  } // aqui eu criei a função para verificar se o produto já existe no carrinho de compras e exportei para que eu possa usar em outros componentes da aplicação
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        checkIfItemAlreadyExistsInCart,
        removeFromCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
} // aqui esta a função que cria o provider e exportei para que eu possa usar em outros componentes da aplicação

// o código acima cria o contexto e o provider para o carrinho de compras e exporta para que eu possa usar em outros componentes da aplicação

//o contexto e o provider são criados para que eu possa usar o carrinho de compras em qualquer lugar da aplicação

// contexts serve para compartilhar dados entre componentes
