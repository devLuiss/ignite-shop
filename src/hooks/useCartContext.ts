import {useContext} from "react";
import {CartContext} from "../contexts/CartContext";

export function useCartContext() {
  return useContext(CartContext);
}
// aqui estamos exportando o contexto para ser usado em qualquer lugar do projeto como um hook
