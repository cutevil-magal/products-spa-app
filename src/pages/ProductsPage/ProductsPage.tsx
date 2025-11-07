import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../../store';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../../api/productsApi';
import { setProducts } from '../../store/productsSlice';
import { ProductCard } from '../../components/ProductCard';
import style from './ProductsPage.module.css';

export const ProductsPage = () => {
  // Получаем данные из store
  const products = useSelector((state: RootState) => state.products.items);
  const favorites = useSelector((state: RootState) => state.products.favorites);
  
  // переменные для фильтров
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');
  const filteredProducts = filter === 'favorites' 
  ? products.filter(product => favorites.includes(product.id))
  : products;

  // Для отправки actions
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProducts = async () => {
      const productsFromApi = await fetchProducts();
      dispatch(setProducts(productsFromApi));
    };
    
    loadProducts();
  }, [dispatch]);

  const handleAllClick = (e: React.MouseEvent) => {
    setFilter('all');
  };

  const handleFavoritesClick = (e: React.MouseEvent) => {
    setFilter('favorites');
  };

  return (
    <div>
      <h1>Ассортимент</h1>
      <div>
        {/* Фильтр "Все/Избранное" */}
        <button onClick={handleAllClick}>Все</button>
        <button onClick={handleFavoritesClick}>Избранное</button>
      </div>
      
      <div>
        {products.length === 0 || filteredProducts.length === 0 ? (
          <p>Продуктов пока нет</p>
        ) : (
          <div className={style.productsGrid}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      <p>Всего продуктов: {filteredProducts.length}</p>
    </div>
  );
};