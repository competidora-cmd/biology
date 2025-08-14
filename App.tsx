import { useState, useEffect } from 'react';
import { MainMenu } from './components/MainMenu';
import { SubjectsPage } from './components/SubjectsPage';
import { FlashcardsPage } from './components/FlashcardsPage';
import { ProfilePage } from './components/ProfilePage';
import { AdminPage } from './components/AdminPage';
import { initTelegram, tg } from './utils/telegram';

type Page = 'menu' | 'subjects' | 'flashcards' | 'profile' | 'admin' | 'topics';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('menu');

  useEffect(() => {
    initTelegram();
    
    // Устанавливаем темную тему
    if (tg) {
      document.body.className = 'dark';
    }

    // Настройка кнопки "Назад" в Telegram
    const handleBackButton = () => {
      if (currentPage !== 'menu') {
        setCurrentPage('menu');
      } else {
        tg?.close();
      }
    };

    if (tg?.BackButton) {
      tg.BackButton.show();
      tg.BackButton.onClick(handleBackButton);
    }

    return () => {
      if (tg?.BackButton) {
        tg.BackButton.offClick(handleBackButton);
      }
    };
  }, [currentPage]);

  const handleNavigate = (path: string) => {
    const pageMap: Record<string, Page> = {
      '/subjects': 'subjects',
      '/flashcards': 'flashcards',
      '/profile': 'profile',
      '/admin': 'admin',
      '/topics': 'topics'
    };

    setCurrentPage(pageMap[path] || 'menu');
  };

  const handleBack = () => {
    setCurrentPage('menu');
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      {currentPage === 'menu' && (
        <MainMenu onNavigate={handleNavigate} />
      )}
      
      {currentPage === 'subjects' && (
        <SubjectsPage onNavigate={handleNavigate} onBack={handleBack} />
      )}
      
      {currentPage === 'flashcards' && (
        <FlashcardsPage onBack={handleBack} />
      )}
      
      {currentPage === 'profile' && (
        <ProfilePage onBack={handleBack} />
      )}
      
      {currentPage === 'admin' && (
        <AdminPage onBack={handleBack} />
      )}

      {currentPage === 'topics' && (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-xl font-medium mb-2">Прогресс по темам</h2>
            <p className="text-muted-foreground">Эта страница находится в разработке</p>
            <button 
              onClick={handleBack}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              Вернуться в меню
            </button>
          </div>
        </div>
      )}
    </div>
  );
}