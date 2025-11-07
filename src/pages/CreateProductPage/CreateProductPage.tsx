import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../store/productsSlice';
import type { NewProduct } from '../../types/product';
import styles from './CreateProductPage.module.css';

export const CreateProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Состояние формы
  const [formData, setFormData] = useState<NewProduct>({
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: '',
    images: []
  });

  // Состояние ошибок валидации
  const [errors, setErrors] = useState<Partial<NewProduct>>({});

  // Функция для обработки изменений в полях ввода
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'discountPercentage' || name === 'rating' || name === 'stock' 
        ? Number(value) 
        : value
    }));
  };

  // Функция валидации
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Название обязательно';
    if (!formData.description.trim()) newErrors.description = 'Описание обязательно';
    if (formData.price <= 0) newErrors.price = 'Цена должна быть больше 0';
    if (formData.stock < 0) newErrors.stock = 'Количество не может быть отрицательным';
    if (formData.rating < 0 || formData.rating > 5) newErrors.rating = 'Рейтинг должен быть от 0 до 5';
    if (!formData.brand.trim()) newErrors.brand = 'Бренд обязателен';
    if (!formData.category.trim()) newErrors.category = 'Категория обязательна';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Функция отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Создаем полный продукт с ID
      const newProduct = {
        ...formData,
        id: Date.now() // Простой способ генерации ID
      };
      
      dispatch(addProduct(newProduct));
      navigate('/products');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Создать новый продукт</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Название *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={errors.title ? styles.error : ''}
          />
          {errors.title && <span className={styles.errorText}>{errors.title}</span>}
        </div>

        <div className={styles.formGroup}>
          <label>Описание *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className={errors.description ? styles.error : ''}
          />
          {errors.description && <span className={styles.errorText}>{errors.description}</span>}
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Цена *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className={errors.price ? styles.error : ''}
            />
            {errors.price && <span className={styles.errorText}>{errors.price}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Скидка %</label>
            <input
              type="number"
              name="discountPercentage"
              value={formData.discountPercentage}
              onChange={handleInputChange}
              min="0"
              max="100"
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Рейтинг</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              min="0"
              max="5"
              step="0.1"
              className={errors.rating ? styles.error : ''}
            />
            {errors.rating && <span className={styles.errorText}>{errors.rating}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Количество *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              className={errors.stock ? styles.error : ''}
            />
            {errors.stock && <span className={styles.errorText}>{errors.stock}</span>}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Бренд *</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              className={errors.brand ? styles.error : ''}
            />
            {errors.brand && <span className={styles.errorText}>{errors.brand}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>Категория *</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={errors.category ? styles.error : ''}
            />
            {errors.category && <span className={styles.errorText}>{errors.category}</span>}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>URL изображения</label>
          <input
            type="text"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="button" onClick={() => navigate('/products')}>
            Отмена
          </button>
          <button type="submit" className={styles.submitButton}>
            Создать продукт
          </button>
        </div>
      </form>
    </div>
  );
};