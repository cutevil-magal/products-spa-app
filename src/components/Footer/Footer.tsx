import styles from './Footer.module.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.copyright}>
          © {currentYear} MarketPlace. Все права защищены.
        </div>
        <div className={styles.links}>
          <span>Сделано с ❤️ для вас</span>
        </div>
      </div>
    </footer>
  );
};