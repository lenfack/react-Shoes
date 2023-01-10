import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';

const Header = ({ onOpenBasket }) => {
   const {cart} = useContext(AppContext);

   const totalPrice = cart.reduce((sum, obj) => +obj.price + sum, 0);

   return (
      <div>
         <header className="d-flex justify-between align-center p-40">
            <Link to='/'>
               <div className="d-flex align-center">
                  <img
                     width={40}
                     height={40}
                     src="/image/logo.png"
                     alt="logo"
                  />
                  <div>
                     <h3 className="text-uppercase">Shoes</h3>
                     <p className="opacity-3">Магазин Обуви</p>
                  </div>
               </div>
            </Link>
            <ul className="d-flex">
               <li onClick={onOpenBasket} className="mr-30 cu-p">
                  <img
                     width={18}
                     height={17}
                     src="/image/car.svg"
                     alt="Корзина"
                  />
                  <span>{totalPrice} руб.</span>
               </li>
               <li>
                  <Link to="/favorites">
                     <img className="mr-20 cu-p" width={18} height={17} src="/image/love.png" alt="Закладки"
                     />
                  </Link>
               </li>
               <li>
                  <Link to="/orders">
                     <img width={18} height={17} src="/image/profile.svg" alt="Профиль"
                     />
                  </Link>
               </li>
            </ul>
         </header>
      </div>
   );
};

export default Header;
