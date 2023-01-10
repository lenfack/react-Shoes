
import Card from '../components/Card';


const Home = ({
   items,
   searchValue,
   onChangeSearchInput,
   onAddToFavorite,
   onAddToBasket,
   isLoading,
}) => {
   const renderItems = () => {
      const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()));
      return (isLoading ? [...Array(11)] : filtredItems).map((item, index) => (
            <Card
               key={index}
               onFavorite={(obj) => onAddToFavorite(obj)}
               onPlus={(obj) => onAddToBasket(obj)}
               loading={isLoading}
               {...item}
            />
         ));
   };

   return (
      <div className="content p-40">
         <div className="d-flex align-center justify-between mb-40">
            <h1>
               {searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}
            </h1>
            <div className="search_blok d-flex">
               <img src="/image/Search.svg" alt="Search" />
               <input
                  onChange={onChangeSearchInput}
                  value={searchValue}
                  placeholder="Поиск ..."
               />
            </div>
         </div>

         <div className="d-flex flex-wrap">{renderItems()}</div>
      </div>
   );
};

export default Home;
