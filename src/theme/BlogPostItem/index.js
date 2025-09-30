import BrowserOnly from '@docusaurus/BrowserOnly';
import { useLocation } from '@docusaurus/router';
import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import FacebookComments from '@site/src/components/FacebookComments';
import OriginalBlogPostItem from '@theme-original/BlogPostItem';

/**
 * Wrapper component để thêm Facebook Comments vào cuối mỗi blog post item
 * Comments sẽ xuất hiện ngay sau nội dung bài viết, trước footer
 */
export default function BlogPostItem(props) {
    const location = useLocation();
    const { siteConfig } = useDocusaurusContext();

    // Chỉ hiển thị comments trên trang chi tiết blog post, không phải trang danh sách
    const isDetailPage = location.pathname.includes('/blog/') &&
        !location.pathname.endsWith('/blog') &&
        !location.pathname.endsWith('/blog/');

    // Tạo URL đầy đủ cho Facebook Comments
    const fullUrl = `${siteConfig.url}${siteConfig.baseUrl}${location.pathname}`.replace(/\/+/g, '/');

    return (
        <>
            <OriginalBlogPostItem {...props} />
            {/* Thêm Facebook Comments chỉ trên trang chi tiết blog post */}
            {isDetailPage && (
                <BrowserOnly fallback={<div>Loading comments...</div>}>
                    {() => {
                        // Sử dụng useColorMode hook an toàn trong BrowserOnly
                        const ColorModeAwareFacebookComments = () => {
                            let colorMode = 'light';
                            try {
                                // eslint-disable-next-line react-hooks/rules-of-hooks
                                const { colorMode: currentColorMode } = useColorMode();
                                colorMode = currentColorMode;
                            } catch (error) {
                                // Fallback nếu ColorModeProvider chưa sẵn sàng
                                console.warn('ColorMode not available, using light mode');
                            }

                            return (
                                <div style={{
                                    marginTop: '3rem',
                                    marginBottom: '2rem'
                                }}>
                                    <FacebookComments
                                        url={fullUrl}
                                        numPosts={10}
                                        colorScheme={colorMode === 'dark' ? 'dark' : 'light'}
                                        width="100%"
                                    />
                                </div>
                            );
                        };

                        return <ColorModeAwareFacebookComments />;
                    }}
                </BrowserOnly>
            )}
        </>
    );
}
