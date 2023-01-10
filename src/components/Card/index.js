import { useState, useContext } from 'react';
import ContentLoader from 'react-content-loader';
import { AppContext } from '../../App';

import './Card.scss';

const Сard = ({
   id,
   title,
   price,
   image,
   onFavorite,
   onPlus,
   favorited = false,
   loading = false,
}) => {
   const { isItemAdded } = useContext(AppContext);
   const [isFavorite, setIsFavorite] = useState(favorited);
   const obj = { id, parentId: id, title, price, image }

   const onClickPlus = () => {
      onPlus(obj);
   };

   const onClickFavorite = () => {
      onFavorite(obj);
      setIsFavorite(!isFavorite);
   };

   return (
      <div className={isItemAdded(id) ? 'card chek' : 'card'}>
         {loading ? (
            <ContentLoader
               speed={2}
               width={160}
               height={215}
               viewBox="0 0 160 215"
               backgroundColor="#bab5b5"
               foregroundColor="#707070"
            >
               <rect x="12" y="0" rx="10" ry="10" width="133" height="112" />
               <rect x="0" y="131" rx="2" ry="2" width="158" height="17" />
               <rect x="1" y="153" rx="2" ry="2" width="102" height="17" />
               <rect x="2" y="188" rx="2" ry="2" width="77" height="25" />
               <rect x="119" y="184" rx="4" ry="4" width="34" height="29" />
            </ContentLoader>
         ) : (
            <>
               {onFavorite && <div className="favorite" onClick={onClickFavorite}>
                  <img
                     height={20}
                     width={20}
                     src={
                        isFavorite
                           ? '/image/heart-liked.png'
                           : '/image/heart.png'
                     }
                     alt="heart"
                  />
               </div>}
               <img className="img_card" src={image} alt="Sneakers" />
               <h5>{title}</h5>
               <div className="d-flex justify-between align-center">
                  <div className="d-flex flex-column">
                     <span>Цена:</span>
                     <b>{price} руб.</b>
                  </div>
                  {onPlus && (
                     <img className="plus" height={15} width={15} src={ isItemAdded(id) ? '/image/check.png' : '/image/plus.png' } alt="plus" onClick={onClickPlus}
                     />
                  )}
               </div>
            </>
         )}
      </div>
   );
};

export default Сard;
