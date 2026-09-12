import { useEffect } from 'react';

/**
 * Custom hook to lock body scrolling when a modal or overlay is active.
 * - Prevents background page from scrolling when mouse or touch events occur.
 * - Compensates for scrollbar disappearance to avoid horizontal layout shift.
 * - Uses reference counting so nested/stacked modals safely preserve the lock.
 */
let lockCount = 0;
let originalOverflow = '';
let originalPaddingRight = '';

export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    if (lockCount === 0) {
      originalOverflow = document.body.style.overflow;
      originalPaddingRight = document.body.style.paddingRight;

      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';

      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }
    lockCount++;

    return () => {
      lockCount--;
      if (lockCount <= 0) {
        lockCount = 0;
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      }
    };
  }, [isLocked]);
}
