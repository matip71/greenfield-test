import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import styles from './RootLayout.module.css';

export function RootLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main} id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
