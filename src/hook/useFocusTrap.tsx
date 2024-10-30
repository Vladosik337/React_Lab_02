import { useEffect, useRef } from 'react';

const useFocusTrap = (isActive: boolean) => {
  const trapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const focusableElements = trapRef.current?.querySelectorAll(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) { // Shift + Tab
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else { // Tab
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    // Додаємо обробник події на клавіатурі
    trapRef.current?.addEventListener('keydown', handleKeyDown);

    // Фокус на першому елементі при активації
    if (firstElement) {
      firstElement.focus();
    }

    // Очищення обробника події при відключенні
    return () => {
      trapRef.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive]);

  return trapRef;
};

export default useFocusTrap;
