import BrowserOnly from '@docusaurus/BrowserOnly';
import { useLocation } from '@docusaurus/router';
import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import FacebookComments from '@site/src/components/FacebookComments';
import OriginalDocItemLayout from '@theme-original/DocItem/Layout';

/**
 * Wrapper để thêm Facebook Comments vào cuối mỗi trang docs
 * Chỉ hiển thị comments trên các trang tutorial, không hiển thị trên trang intro
 */
export default function DocItemLayout(props) {
    const location = useLocation();
    const { siteConfig } = useDocusaurusContext();

    // Tạo URL đầy đủ cho Facebook Comments
    const fullUrl = `${siteConfig.url}${siteConfig.baseUrl}${location.pathname}`.replace(/\/+/g, '/');

    // Kiểm tra xem có nên hiển thị comments hay không
    // Chỉ không hiển thị trên trang intro chính và trang home
    const shouldShowComments = location.pathname !== '/intro' &&
        location.pathname !== '/beli5/intro' &&
        location.pathname !== '/' &&
        location.pathname !== '/beli5/';

    return (
        <>
            <OriginalDocItemLayout {...props} />
            {/* Thêm Facebook Comments vào cuối mỗi trang docs (trừ intro) */}
            {shouldShowComments && (
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
                                    marginTop: '2rem',
                                    padding: '0',
                                    width: '100%'
                                }}>
                                    <FacebookComments
                                        url={fullUrl}
                                        numPosts={5}
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
