declare global {
    interface Window {
      Telegram: {
        WebApp: {
          ready(): void;
          expand(): void;
          close(): void;
          MainButton: {
            text: string;
            color: string;
            textColor: string;
            isVisible: boolean;
            isActive: boolean;
            show(): void;
            hide(): void;
            enable(): void;
            disable(): void;
            setText(text: string): void;
            onClick(callback: () => void): void;
            offClick(callback: () => void): void;
          };
          BackButton: {
            isVisible: boolean;
            show(): void;
            hide(): void;
            onClick(callback: () => void): void;
            offClick(callback: () => void): void;
          };
          HapticFeedback: {
            impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void;
            notificationOccurred(type: 'error' | 'success' | 'warning'): void;
            selectionChanged(): void;
          };
          initData: string;
          initDataUnsafe: {
            user?: {
              id: number;
              is_bot: boolean;
              first_name: string;
              last_name?: string;
              username?: string;
              language_code?: string;
              is_premium?: boolean;
              photo_url?: string;
            };
          };
          colorScheme: 'light' | 'dark';
          themeParams: {
            bg_color: string;
            text_color: string;
            hint_color: string;
            link_color: string;
            button_color: string;
            button_text_color: string;
          };
        };
      };
    }
  }
  
  export const tg = typeof window !== 'undefined' ? window.Telegram?.WebApp : null;
  
  export const initTelegram = () => {
    if (tg) {
      tg.ready();
      tg.expand();
    }
  };
  
  export const getCurrentUser = (): User | null => {
    if (!tg?.initDataUnsafe?.user) return null;
    
    const telegramUser = tg.initDataUnsafe.user;
    return {
      id: telegramUser.id.toString(),
      name: `${telegramUser.first_name} ${telegramUser.last_name || ''}`.trim(),
      username: telegramUser.username,
      avatar: telegramUser.photo_url,
      isAdmin: false // В реальном приложении это будет определяться из базы данных
    };
  };
  
  export const hapticFeedback = {
    light: () => tg?.HapticFeedback.impactOccurred('light'),
    medium: () => tg?.HapticFeedback.impactOccurred('medium'),
    heavy: () => tg?.HapticFeedback.impactOccurred('heavy'),
    success: () => tg?.HapticFeedback.notificationOccurred('success'),
    error: () => tg?.HapticFeedback.notificationOccurred('error'),
    warning: () => tg?.HapticFeedback.notificationOccurred('warning'),
    selection: () => tg?.HapticFeedback.selectionChanged(),
  };
