import {  createContext, ReactNode, useState } from "react";
import { ProductProps } from "../pages/home/Home";

interface CartContextData{
    cart: CartProps[];
    cartAmount: number;
    addItemCart: (newItem: ProductProps) => void;
    removeItemCart: (product: CartProps) => void;
    total: string

}
interface CartProps{
    id: number,
    title: string,
    description: string,
    price: number,
    cover: string,
    amount: number,
    total: number
}
interface  CartProviderProps{
    children: ReactNode;
}
export const CartContext = createContext({} as CartContextData)

function CartProvider({children}: CartProviderProps){
    const [cart, setCart] = useState<CartProps[]>([]) //lista/array vazio porque começa vazios
    const [total, setTotal] = useState("")

    function addItemCart(newItem: ProductProps){
        //adc no carrinho
        //verifica se ja nao existe
        const indexItem = cart.findIndex(item => item.id === newItem.id); // 

        if (indexItem !== -1){
            // se entrou aqui apenas somamos +1 na quantidade e calculamos o total desse carrinho
            let cartList = cart;

            cartList[indexItem].amount = cartList[indexItem].amount + 1;
            cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price;

            setCart(cartList)
            totalResultCart(cartList)
            return
        }
        //adc item na nossa lista
        let data = {
            ...newItem,
            amount: 1,
            total: newItem.price
        }
        setCart(products => [...products , data]);
        totalResultCart([...cart, data])
    }
    function removeItemCart(product: CartProps){
        const indexItem = cart.findIndex(item => item.id === product.id);

        if (cart[indexItem]?.amount > 1){
            let cartList = cart;
            cartList[indexItem].amount = cartList[indexItem].amount - 1;
            cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price

            setCart(cartList)
            totalResultCart(cartList)

            return


            }

            const removeItem = cart.filter(item => item.id !== product.id) //filter vai remover um array, tirando o que cliquei
            setCart(removeItem)
            totalResultCart(removeItem)
        
    }

    function totalResultCart(items: CartProps){
        let myCart = items
        let result = myCart.reduce((acc, obj) => {return acc + obj.total}, 0) //soma o que ja tinha mais o total do proximo e quando acabar vai colocar dentro do result
        const resultFormated = result.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})

        setTotal(resultFormated)

    }

    return(
        <CartContext.Provider 
        value={{
            cart, cartAmount: cart.length, // tamanho do nosso array
            addItemCart,
            removeItemCart,
            total,
            }}>
            {children}

        </CartContext.Provider>
    )
}
export default CartProvider