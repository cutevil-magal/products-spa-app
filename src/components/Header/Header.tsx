import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo} onClick={() => navigate('/products')}>
          🛍️ MarketPlace
        </div>
        
        <nav className={styles.nav}>
          <button 
            className={styles.navButton}
            onClick={() => navigate('/products')}
          >
            Главная
          </button>
          
          <button 
            className={styles.navButton}
            onClick={() => navigate('/create-product')}
          >
            Создать товар
          </button>
        </nav>
      </div>
    </header>
  );
};