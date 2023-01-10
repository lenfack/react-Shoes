import { useState, useEffect, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';

import Home from './pagers/Home';
import Favorite from './pagers/Favorite';
import Orders from './pagers/Orders';

export const AppContext = createContext({});

const App = () => {
   const [items, setItems] = useState([]);
   const [cart, setCart] = useState([]);
   const [favorites, setFavorites] = useState([]);
   const [searchValue, setSearchValue] = useState('');
   const [openBasket, setOpenBasket] = useState(false);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      async function fetchData() {
         try {
            const [cartResponse, favoriteResponse, itemsResponse] = await Promise.all([
                  axios.get('https://63933b26ab513e12c507e4ed.mockapi.io/cart'),
                  axios.get('https://63933b26ab513e12c507e4ed.mockapi.io/favorite'),
                  axios.get('https://63933b26ab513e12c507e4ed.mockapi.io/items'),
               ]);

            setIsLoading(false);
            setItems(itemsResponse.data);
            setCart(cartResponse.data);
            setFavorites(favoriteResponse.data);
         } catch (error) {
            alert('Ошибка при запросе');
            console.error(error);
         }
      }

      fetchData();
   }, []);

   const onAddToBasket = async (obj) => {
      try {
         const findCart = cart.find((item) => Number(item.parentId) === Number(obj.id));
         if (findCart) {
         setCart((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
         await axios.delete( `https://63933b26ab513e12c507e4ed.mockapi.io/cart/${findCart.id}`);
         } else {
            setCart((prev) => [...prev, obj]);
            const {data} = await axios.post('https://63933b26ab513e12c507e4ed.mockapi.io/cart', obj);
            setCart((prev) => [...prev.map(item => {
               if (item.parentId === data.parentId) {
                  return {
                     ...item, id: data.id
                  }
               }
               return item;
            })]);
         }
      } catch (error) {
         alert('Ошибка при добавлении в корзину');
         console.error(error);
      }
   };

   const onRemoveItem = async (id) => {
      try {
         axios.delete(`https://63933b26ab513e12c507e4ed.mockapi.io/cart/${id}`);
         setCart((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
      } catch (error) {
         alert('Ошибка при удалении из корзины');
         console.error(error);
      }
   };

   const onAddToFavorite = async (obj) => {
      try {
         if (favorites.find((favObj) => favObj.id === obj.id)) {
            axios.delete(
               `https://63933b26ab513e12c507e4ed.mockapi.io/favorite/${obj.id}`
            );
            setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
         } else {
            const { data } = await axios.post(
               'https://63933b26ab513e12c507e4ed.mockapi.io/favorite',
               obj
            );
            setFavorites((prev) => [...prev, data]);
         }
      } catch (error) {
         alert('Не удалось добавить в фавориты');
         console.error(error);
      }
   };

   const onChangeSearchInput = (event) => {
      setSearchValue(event.target.value);
   };

   const isItemAdded = (id) => {
      return cart.some((obj) => Number(obj.parentId) === Number(id));
   };

   return (
      <AppContext.Provider
         value={{
            cart,
            items,
            favorites,
            isItemAdded,
            onAddToFavorite,
            onAddToBasket,
            setOpenBasket,
            setCart,
         }}
      >
         <div className="wrapper clear">
            {openBasket && (
               <Drawer
                  items={cart}
                  onCloseBasket={() => setOpenBasket(false)}
                  onRemove={onRemoveItem}
               />
            )}

            <Header onOpenBasket={() => setOpenBasket(true)} />

            <Routes>
               <Route
                  path="/"
                  element={
                     <Home
                        cart={cart}
                        items={items}
                        searchValue={searchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToFavorite={onAddToFavorite}
                        onAddToBasket={onAddToBasket}
                        isLoading={isLoading}
                     />
                  }
               />
            </Routes>

            <Routes>
               <Route path="/favorites" element={<Favorite />} />
            </Routes>

            <Routes>
               <Route path="/orders" element={<Orders />} />
            </Routes>
         </div>
      </AppContext.Provider>
   );
};

export default App;
