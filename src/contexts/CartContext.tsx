import { Children, createContext, ReactNode, useState } from "react";

interface CartContextData{
    cart: CartProps[];
    cartAmount: number

}
interface CartProps{
    id: number,
    title: string,
    description: string,
    price: string,
    cover: string,
    amount: number,
    total: number
}
interface  CartProviderProps{
    children: ReactNode;
}
export const CartContext = createContext({} as CartContextData)

function CartProvider({children}: CartProviderProps){
    const [cart, setCart] = useState<CartProps[]>([]) //lista/array vazio porque começa vazio
    return(
        <CartContext.Provider 
        value={{
            cart, cartAmount: cart.length // tamanho do nosso array
            }}>
            {children}

        </CartContext.Provider>
    )
}
export default CartProvider