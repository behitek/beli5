import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useEffect } from 'react';

/**
 * Component Facebook Comments để tích hợp bình luận Facebook vào trang web
 * Hỗ trợ tự động load Facebook SDK và khởi tạo comments
 */
export default function FacebookComments({
    url,
    width = '100%',
    numPosts = 5,
    colorScheme = 'light'
}) {
    const { siteConfig } = useDocusaurusContext();
    const facebookAppId = siteConfig.customFields?.facebookAppId;

    useEffect(() => {
        // Debug: log thông tin
        console.log('FacebookComments: URL =', url);
        console.log('FacebookComments: App ID =', facebookAppId);

        // Kiểm tra nếu Facebook SDK đã được tải
        if (window.FB && window.FB.XFBML) {
            console.log('FacebookComments: Parsing existing FB SDK');
            window.FB.XFBML.parse();
        } else {
            // Tải Facebook SDK nếu chưa có
            console.log('FacebookComments: Loading FB SDK');
            loadFacebookSDK();
        }
    }, [url, facebookAppId]);

    const loadFacebookSDK = () => {
        // Kiểm tra nếu script đã tồn tại để tránh load nhiều lần
        if (document.getElementById('facebook-jssdk')) {
            return;
        }

        // Thêm Facebook SDK script vào DOM
        const script = document.createElement('script');
        script.id = 'facebook-jssdk';
        script.src = `https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v18.0&appId=${facebookAppId}`;
        script.async = true;
        script.defer = true;
        script.crossOrigin = 'anonymous';

        script.onload = () => {
            // Khởi tạo Facebook SDK sau khi tải xong
            if (window.FB) {
                window.FB.init({
                    appId: facebookAppId,
                    cookie: true,
                    xfbml: true,
                    version: 'v18.0'
                });
                console.log('FacebookComments: FB SDK initialized');
            }
        };

        // Thêm fb-root div nếu chưa có
        if (!document.getElementById('fb-root')) {
            const fbRoot = document.createElement('div');
            fbRoot.id = 'fb-root';
            document.body.appendChild(fbRoot);
        }

        document.head.appendChild(script);
    };

    return (
        <BrowserOnly>
            {() => (
                <div style={{
                    marginTop: '2rem',
                    padding: '1rem 0',
                    borderTop: '1px solid var(--ifm-color-emphasis-200)'
                }}>
                    <h3 style={{
                        marginBottom: '1rem',
                        color: 'var(--ifm-heading-color)',
                        fontSize: '1.25rem',
                        fontWeight: '600'
                    }}>
                        💬 Thảo luận và đóng góp ý kiến
                    </h3>
                    <p style={{
                        color: 'var(--ifm-color-content-secondary)',
                        fontSize: '0.9rem',
                        marginBottom: '1rem'
                    }}>
                        Chia sẻ suy nghĩ của bạn hoặc đặt câu hỏi về nội dung này.
                        Cộng đồng Beli5 luôn sẵn sàng giúp đỡ! 🤝
                    </p>
                    <div
                        className="fb-comments"
                        data-href={url}
                        data-width={width}
                        data-numposts={numPosts}
                        data-colorscheme={colorScheme}
                        data-lazy="true"
                        data-order-by="social"
                    ></div>
                </div>
            )}
        </BrowserOnly>
    );
}
