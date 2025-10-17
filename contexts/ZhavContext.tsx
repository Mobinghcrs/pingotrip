import React, { createContext, useState, ReactNode, FC } from 'react';
import { ZhavContextType, ZhavProduct } from '../types';

export const ZhavContext = createContext<ZhavContextType | undefined>(undefined);

export const ZhavProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<ZhavProduct[]>([]);

    const addToCart = (product: ZhavProduct) => {
        // Prevent adding duplicates
        setCart(prevCart => {
            if (prevCart.find(item => item.id === product.id)) {
                return prevCart;
            }
            return [...prevCart, product];
        });
    };

    const removeFromCart = (productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <ZhavContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </ZhavContext.Provider>
    );
};
