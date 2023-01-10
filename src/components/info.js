import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../App';

const Info = () => {
   const {setOpenBasket} = useContext(AppContext);

   return (
      <div className='info cartEmpty d-flex align-center justify-center flex-column flex'>
         <img className='mb-20' width={120} src='/image/image framed.png' alt='Empty' />
         <h2>Заказ оформлен</h2>
         <p className='opacity-6'>Ваш заказ скоро будет передан курьерской доставке</p>
         <button onClick={() => setOpenBasket(false)} className='greenButton'>
            Вернуться назад
         </button>
      </div>
   );
};

export default Info;

