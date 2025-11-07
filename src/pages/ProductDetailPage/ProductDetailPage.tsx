import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { RootState } from "../../store";
import styles from './ProductDetailPage.module.css';
import { useState } from 'react';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.products.items);
  const product = products.find(p => p.id === Number(id));
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className={styles.container}>
        <h2>Продукт не найден</h2>
        <button className={styles.backButton} onClick={() => navigate('/products')}>
          Назад к списку
        </button>
      </div>
    );
  }

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate('/products')}>
        ← Назад к списку
      </button>

      <div className={styles.productGrid}>
        {/* Левая колонка - изображения */}
        <div className={styles.imageSection}>
          <img 
            src={product.images[selectedImage] || product.thumbnail} 
            alt={product.title}
          />
        </div>

        {/* Правая колонка - информация */}
        <div className={styles.infoSection}>
          {product.tags && product.tags.length > 0 && (
            <div className={styles.tags}>
              {product.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
          
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          
          <div className={styles.price}>
            {product.discountPercentage > 0 && (
              <span className={styles.originalPrice}>${product.price}</span>
            )}
            <span>${discountedPrice.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <span className={styles.discount}> -{product.discountPercentage}%</span>
            )}
          </div>

          <div className={styles.rating}>
            Рейтинг: {product.rating} ⭐ ({product.reviews?.length || 0} отзывов)
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <strong>Бренд:</strong> {product.brand}
            </div>
            <div className={styles.detailItem}>
              <strong>Категория:</strong> {product.category}
            </div>
            <div className={styles.detailItem}>
              <strong>В наличии:</strong> {product.stock} шт.
            </div>
            <div className={styles.detailItem}>
              <strong>Артикул:</strong> {product.sku}
            </div>
            {product.weight && (
              <div className={styles.detailItem}>
                <strong>Вес:</strong> {product.weight} г
              </div>
            )}
            {product.dimensions && (
              <div className={styles.detailItem}>
                <strong>Размеры:</strong> {product.dimensions.width}×{product.dimensions.height}×{product.dimensions.depth} см
              </div>
            )}
          </div>

          
        </div>
      </div>

      {/* Отзывы */}
      {product.reviews && product.reviews.length > 0 && (
        <div className={styles.reviews}>
          <h2>Отзывы ({product.reviews.length})</h2>
          <div className={styles.reviewsList}>
            {product.reviews.map((review, index) => (
              <div key={index} className={styles.review}>
                <div className={styles.reviewRating}>
                  Рейтинг: {'⭐'.repeat(review.rating)}
                </div>
                <p>{review.comment}</p>
                <small>— {review.reviewerName}</small>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};