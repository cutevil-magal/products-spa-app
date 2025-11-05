import type {Product} from '../../types/product';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  // Обрезаем длинное описание
  const shortDescription = product.description.length > 100 
    ? `${product.description.substring(0, 100)}...` 
    : product.description;
  // Обрабатываем случай когда images пустой
  const imageUrl = product.images[0] || product.thumbnail || 'https://via.placeholder.com/300x200';
  //  const imageUrl = product.images[0] || product.thumbnail || '/placeholder-image.jpg';
  return (
    <div className={styles.productCard}>
      <img src={imageUrl} alt={product.title} className={styles.image}/>
      <h3 className={styles.title}>{product.title}</h3>
      <p className={styles.description}>{shortDescription}</p>
      <p className={styles.price}>${product.price}</p>
      <div className={styles.actions}>
        <button>❤️</button>
        <button>🗑️</button>
      </div>
    </div>
  );
};