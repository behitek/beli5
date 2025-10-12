# Feedback System Documentation

## Overview
Hệ thống góp ý của Beli5 cho phép người dùng chia sẻ ý kiến, đề xuất tính năng và nội dung họ mong muốn. Hệ thống sử dụng Facebook Comments để tạo cộng đồng tương tác.

## Components

### 1. Feedback Page (`/src/pages/feedback.tsx`)
- **URL**: `/feedback`
- **Tính năng**:
  - Hướng dẫn chi tiết cách góp ý hiệu quả
  - Danh mục góp ý phổ biến
  - Tích hợp Facebook Comments
  - Responsive design cho mobile
  - Dark/Light mode support

### 2. Floating Feedback Button (`/src/components/FloatingFeedbackButton/`)
- **Vị trí**: Góc dưới bên phải màn hình
- **Tính năng**:
  - Hiển thị sau khi scroll 300px
  - Tooltip hướng dẫn
  - Pulse animation để thu hút sự chú ý
  - Responsive và accessible
  - Smooth animations với cubic-bezier

### 3. Global Integration (`/src/theme/Root.js`)
- Tích hợp floating button trên toàn site
- Không ảnh hưởng đến performance

## User Experience Flow

1. **Discovery**: Người dùng thấy floating button khi scroll
2. **Navigation**: Click button → chuyển đến `/feedback`
3. **Guidance**: Đọc hướng dẫn góp ý hiệu quả
4. **Interaction**: Góp ý qua Facebook Comments
5. **Community**: Like/reply comments của người khác

## Facebook Comments Integration

### Configuration
- **App ID**: Configured in `docusaurus.config.ts`
- **Locale**: `vi_VN` (Vietnamese)
- **Auto-detection**: Light/Dark mode
- **Mobile optimized**: Responsive design

### Best Practices
- Khuyến khích "like" thay vì duplicate comments
- Hướng dẫn phân loại góp ý theo category
- Moderator response workflow

## Navigation Integration

### Navbar
- Position: Right side
- Label: "💡 Góp Ý"
- Priority: High visibility

### Footer
- Section: "Cộng Đồng & Cập Nhật"
- Enhanced with emoji for recognition

## Styling & Themes

### CSS Classes
- `.feedback-grid`: Category grid layout
- `.feedback-category`: Individual category cards
- `.feedback-gradient-text`: Gradient text effects
- `.feedback-cta-section`: Call-to-action styling

### Theme Support
- Light/Dark mode compatible
- High contrast mode support
- Reduced motion preferences
- Mobile responsive breakpoints

## Performance Considerations

- **Lazy Loading**: BrowserOnly wrapper prevents SSR issues
- **Scroll Optimization**: Throttled scroll listener
- **CSS-in-JS Alternative**: CSS Modules for better performance
- **Bundle Size**: Minimal impact on main bundle

## Analytics & Metrics

### Potential Tracking Points
- Floating button clicks
- Feedback page visits
- Comment engagement rates
- Category preference analysis

## Future Enhancements

### Planned Features
1. **Admin Dashboard**: Comment moderation interface
2. **Voting System**: Upvote/downvote for feature requests
3. **Status Updates**: Development progress tracking
4. **Email Notifications**: Important feedback alerts
5. **Integration**: GitHub Issues sync for technical requests

### Accessibility Improvements
- Keyboard navigation support
- Screen reader optimization
- Focus management
- ARIA labels enhancement

## Maintenance

### Regular Tasks
- Monitor Facebook Comments moderation
- Update category suggestions based on trends
- Review and respond to high-priority feedback
- Performance monitoring

### Content Updates
- Seasonal category adjustments
- Popular request highlights
- Success story sharing
- Community guidelines updates

## Technical Notes

### Dependencies
- `@docusaurus/BrowserOnly`: SSR safety
- `@docusaurus/Link`: Client-side navigation
- Facebook SDK: Comment functionality
- CSS Modules: Styling isolation

### Browser Support
- Modern browsers (ES6+)
- Progressive enhancement
- Fallback for JavaScript disabled
- Mobile browsers optimization

### Security Considerations
- Facebook Comments handles spam filtering
- No direct data collection
- GDPR compliant through Facebook
- Content moderation capabilities