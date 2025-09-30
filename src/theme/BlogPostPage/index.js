import BrowserOnly from '@docusaurus/BrowserOnly';
import { useLocation } from '@docusaurus/router';
import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import FacebookComments from '@site/src/components/FacebookComments';
import OriginalBlogPostPage from '@theme-original/BlogPostPage';

/**
 * Wrapper component để thêm Facebook Comments vào cuối mỗi blog post
 * Tự động detect theme mode và truyền URL đầy đủ cho Facebook Comments
 */
export default function BlogPostPage(props) {
    const location = useLocation();
    const { siteConfig } = useDocusaurusContext();

    // Tạo URL đầy đủ cho Facebook Comments
    const fullUrl = `${siteConfig.url}${siteConfig.baseUrl}${location.pathname}`.replace(/\/+/g, '/');

    return (
        <>
            <OriginalBlogPostPage {...props} />
            {/* Thêm Facebook Comments vào cuối mỗi blog post */}
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
                                maxWidth: '800px',
                                margin: '2rem auto 0 auto',
                                padding: '0 1rem'
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
        </>
    );
}
