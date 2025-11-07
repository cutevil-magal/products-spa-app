import { useDispatch, useSelector } from 'react-redux';
import type {Product} from '../../types/product';
import styles from './ProductCard.module.css';
import { toggleFavorite, removeProduct } from '../../store/productsSlice';
import type { RootState } from '../../store';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
   const dispatch = useDispatch();
   const favorites = useSelector((state: RootState) => state.products.favorites);
  const isFavorite = favorites.includes(product.id);

   // Обрезаем длинное описание
  const shortDescription = product.description.length > 200 
    ? `${product.description.substring(0, 200)}...` 
    : product.description;
 
    // Обрабатываем случай когда images пустой
  const imageUrl = product.images[0] || product.thumbnail || 'https://via.placeholder.com/300x200';
  
  // Функция для обработки лайка
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем всплытие, чтобы не сработал клик по карточке
    dispatch(toggleFavorite(product.id));
  };

  // Функция обработки корзины
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // чтобы не сработал клик по карточке
    dispatch(removeProduct(product.id));
  }
  
  return (
    <div className={styles.productCard}>
      <img src={imageUrl} alt={product.title} className={styles.image}/>
      <h3 className={styles.title}>{product.title}</h3>
      <p className={styles.description}>{shortDescription}</p>
      <p className={styles.price}>${product.price}</p>
      <div className={styles.actions}>
        <button 
          onClick={handleLikeClick}
          className={`${styles.likeButton} ${isFavorite ? styles.active : ''}`}
          >
            ❤️
          </button>
        <button
          onClick={handleDeleteClick}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};