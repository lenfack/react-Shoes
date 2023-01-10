import { useState, useContext } from 'react';
import { AppContext } from '../App';
import axios from 'axios';

import Info from './info';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({ onCloseBasket, onRemove, items = [], opened }) => {
   const { cart, setCart } = useContext(AppContext);
   const [complete, setComplete] = useState(false);
   const totalPrice = cart.reduce((sum, obj) => +obj.price + sum, 0);

   const onClickComplete = async () => {
      try {
         await axios.post(
            'https://63933b26ab513e12c507e4ed.mockapi.io/Complete',
            { items: cart }
         );
         setComplete(true);
         setCart([]);

         for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            await axios.delete(
               `https://63933b26ab513e12c507e4ed.mockapi.io/cart/${item.id}`
            );
            await delay(1000);
         }
      } catch (error) {
         alert('Ошибка при создании заказа');
      }
   };

   return (
      <div className='overlay'>
         <div className="drawer">
            <div className="etems">
               <h2 className="d-flex justify-between">
                  Корзина
                  <img
                     onClick={onCloseBasket}
                     className="btn_remove"
                     height={20}
                     width={20}
                     src="/image/close.png"
                     alt="close"
                  />
               </h2>
               {!complete ? (
                  <div className="d-flex flex-column flex">
                     <div className="items">
                        {items.map((obj) => (
                           <div
                              key={obj.id}
                              className="cart_item d-flex align-center"
                           >
                              <img
                                 className="mr-20"
                                 height={70}
                                 width={70}
                                 src={obj.image}
                                 alt="Sneakers"
                              />
                              <div className="mr-20">
                                 <p className="mb-5">{obj.title}</p>
                                 <b>{obj.price} руб.</b>
                              </div>
                              <img
                                 onClick={() => onRemove(obj.id)}
                                 className="btn_remove"
                                 height={20}
                                 width={20}
                                 src="/image/close.png"
                                 alt="remove"
                              />
                           </div>
                        ))}
                     </div>
                  </div>
               ) : (
                  <Info />
               )}
            </div>
            <div className="cart_total_block">
               <ul>
                  <li>
                     <span>Итого:</span>
                     <div></div>
                     <b>{totalPrice} руб.</b>
                  </li>
                  {totalPrice > 0 ? (
                     <li>
                        <span>Налог 5%:</span>
                        <div></div>
                        <b>{Math.round((totalPrice / 100) * 5)} руб.</b>
                     </li>
                  ) : null}
               </ul>
               <button onClick={onClickComplete}>Оформить заказ</button>
            </div>
         </div>
      </div>
   );
};

export default Drawer;
