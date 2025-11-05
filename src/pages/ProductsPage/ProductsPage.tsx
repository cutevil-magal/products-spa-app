import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../../store';
import { useEffect } from 'react';
import { fetchProducts } from '../../api/productsApi';
import { setProducts } from '../../store/productsSlice';
import { ProductCard } from '../../components/ProductCard';
import style from './ProductsPage.module.css';

export const ProductsPage = () => {
  // Получаем данные из store
  const products = useSelector((state: RootState) => state.products.items);
  const favorites = useSelector((state: RootState) => state.products.favorites);
  
  // Для отправки actions
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProducts = async () => {
      const productsFromApi = await fetchProducts();
      dispatch(setProducts(productsFromApi));
    };
    
    loadProducts();
  }, [dispatch]);

  return (
    <div>
      <h1>Все продукты</h1>
      <div>
        {/* Фильтр "Все/Избранное" */}
        <button>Все</button>
        <button>Избранное</button>
      </div>
      
      <div>
        {products.length === 0 ? (
          <p>Продуктов пока нет</p>
        ) : (
          <div className={style.productsGrid}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <p>Избранных: {favorites.length}</p>
    </div>
  );
};