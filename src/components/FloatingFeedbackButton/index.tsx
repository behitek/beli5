import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

/**
 * Floating Feedback Button - Nút góp ý nổi ở góc dưới bên phải
 * Cho phép người dùng nhanh chóng điều hướng đến trang feedback
 */
export default function FloatingFeedbackButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Hiển thị button sau khi người dùng scroll một chút
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <BrowserOnly>
      {() => (
        <div className={styles.floatingButtonContainer}>
          <Link
            to="/feedback"
            className={`${styles.floatingButton} ${isVisible ? styles.visible : ''}`}
            title="Góp ý & Đề xuất tính năng"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Icon chính */}
            <div className={styles.buttonIcon}>
              💡
            </div>
            
            {/* Tooltip text */}
            <div className={`${styles.tooltip} ${isHovered ? styles.tooltipVisible : ''}`}>
              <span>Góp ý & Đề xuất</span>
              <div className={styles.tooltipArrow}></div>
            </div>
            
            {/* Pulse animation */}
            <div className={styles.pulseRing}></div>
          </Link>
        </div>
      )}
    </BrowserOnly>
  );
}