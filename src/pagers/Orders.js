import axios from 'axios';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { AppContext } from '../App';
import Card from '../components/Card'

const Orders = () => {
   const {onAddToBasket, onAddToFavorite} = useContext(AppContext)

   const [orders, setOrders] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      (async() => {
         try {
            const {data} = await axios.get('https://63933b26ab513e12c507e4ed.mockapi.io/Complete');
         //setOrders(data.map(obj => obj.items).flat()) можно так 
            setOrders(data.reduce( (prev, obj) => [...prev, ...obj.items], []));
            setIsLoading(false);
         } catch (error) {
            alert('Ошибка');
            console.error(error);
         }
      })();
   },[]);

   return (
      <div className="content p-40">
         <div className="d-flex align-center justify-between mb-40">
            <h1>Мои заказы</h1>
         </div>

         <div className="d-flex flex-wrap">
            {(isLoading ? [...Array(11)] : orders).map((item, index) => (
                  <Card key={index}
               loading={isLoading}
               {...item}/>
               ))}
         </div>
      </div>
   );
};

export default Orders;
