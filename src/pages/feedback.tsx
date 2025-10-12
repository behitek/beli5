import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import FacebookComments from '@site/src/components/FacebookComments';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import type { ReactNode } from 'react';

const FeedbackPage = (): ReactNode => {
  const { siteConfig } = useDocusaurusContext();
  const currentUrl = `${siteConfig.url}${siteConfig.baseUrl}feedback`;

  return (
    <Layout
      title="Góp Ý & Đề Xuất"
      description="Chia sẻ ý kiến, đề xuất tính năng hoặc nội dung mà bạn mong muốn nhất từ Beli5. Cộng đồng sẽ giúp chúng tôi ưu tiên phát triển những gì bạn cần!"
    >
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            {/* Header Section */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <Heading as="h1" style={{ 
                fontSize: '2.5rem', 
                fontWeight: '800',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1rem'
              }}>
                💡 Góp Ý & Đề Xuất
              </Heading>
              
              <p style={{ 
                fontSize: '1.2rem', 
                color: 'var(--ifm-color-content-secondary)',
                marginBottom: '2rem',
                lineHeight: '1.6'
              }}>
                Giúp chúng tôi làm Beli5 tốt hơn! Chia sẻ ý tưởng, đề xuất tính năng hoặc nội dung bạn muốn thấy.
              </p>
            </div>

            {/* Guidelines Section */}
            <div style={{
              background: 'var(--ifm-color-emphasis-100)',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              border: '1px solid var(--ifm-color-emphasis-200)'
            }}>
              <Heading as="h2" style={{ 
                fontSize: '1.5rem',
                color: 'var(--ifm-color-primary)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                📋 Hướng Dẫn Góp Ý
              </Heading>

              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ 
                  fontSize: '1.2rem',
                  color: 'var(--ifm-heading-color)',
                  marginBottom: '1rem'
                }}>
                  🎯 Chúng tôi mong muốn ý kiến của bạn về:
                </h3>
                <ul style={{ 
                  paddingLeft: '1.5rem',
                  lineHeight: '1.8'
                }}>
                  <li><strong>Nội dung học:</strong> Ngôn ngữ lập trình, chủ đề, bài tập bạn muốn học</li>
                  <li><strong>Tính năng mới:</strong> Công cụ, chức năng sẽ giúp bạn học tốt hơn</li>
                  <li><strong>Cải thiện trải nghiệm:</strong> Giao diện, điều hướng, tốc độ trang</li>
                  <li><strong>Chất lượng nội dung:</strong> Độ dễ hiểu, ví dụ thực tế, giải thích</li>
                </ul>
              </div>

              <div style={{
                background: 'var(--ifm-color-warning-contrast-background)',
                border: '1px solid var(--ifm-color-warning)',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <h4 style={{ 
                  color: 'var(--ifm-color-warning-dark)',
                  marginBottom: '0.5rem',
                  fontSize: '1rem'
                }}>
                  ⚡ Mẹo Hiệu Quả:
                </h4>
                <p style={{ 
                  margin: 0,
                  fontSize: '0.9rem',
                  color: 'var(--ifm-color-warning-dark)'
                }}>
                  <strong>Thích (Like) bình luận</strong> của người khác nếu bạn muốn điều tương tự, 
                  thay vì tạo bình luận trùng lặp. Điều này giúp chúng tôi ưu tiên phát triển tốt hơn!
                </p>
              </div>

              <div style={{
                background: 'var(--ifm-color-info-contrast-background)',
                border: '1px solid var(--ifm-color-info)',
                borderRadius: '8px',
                padding: '1rem'
              }}>
                <h4 style={{ 
                  color: 'var(--ifm-color-info-dark)',
                  marginBottom: '0.5rem',
                  fontSize: '1rem'
                }}>
                  🤝 Cách Chúng Tôi Sử Dụng Góp Ý:
                </h4>
                <ul style={{ 
                  margin: 0,
                  paddingLeft: '1.2rem',
                  fontSize: '0.9rem',
                  color: 'var(--ifm-color-info-dark)',
                  lineHeight: '1.6'
                }}>
                  <li>Góp ý có nhiều "like" sẽ được ưu tiên phát triển</li>
                  <li>Chúng tôi phản hồi trực tiếp trong phần bình luận</li>
                  <li>Cập nhật tiến độ thực hiện các đề xuất</li>
                </ul>
              </div>
            </div>

            {/* Popular Categories */}
            <div style={{
              marginBottom: '2rem'
            }}>
              <Heading as="h2" style={{ 
                fontSize: '1.5rem',
                color: 'var(--ifm-color-primary)',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                🔥 Danh Mục Góp Ý Phổ Biến
              </Heading>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                {[
                  { emoji: '🐍', title: 'Python Advanced', desc: 'Web development, AI/ML, automation' },
                  { emoji: '☕', title: 'Java Enterprise', desc: 'Spring, microservices, clean code' },
                  { emoji: '⚡', title: 'C++ Performance', desc: 'Algorithms, system programming' },
                  { emoji: '🦀', title: 'Rust Safety', desc: 'Memory management, concurrency' },
                  { emoji: '🎮', title: 'Game Development', desc: 'Unity, Unreal, game logic' },
                  { emoji: '🔧', title: 'DevOps & Tools', desc: 'Docker, CI/CD, deployment' }
                ].map((category, index) => (
                  <div key={index} style={{
                    background: 'var(--ifm-color-emphasis-100)',
                    borderRadius: '8px',
                    padding: '1rem',
                    border: '1px solid var(--ifm-color-emphasis-200)',
                    textAlign: 'center',
                    transition: 'transform 0.2s ease',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                      {category.emoji}
                    </div>
                    <h4 style={{ 
                      fontSize: '1rem',
                      marginBottom: '0.5rem',
                      color: 'var(--ifm-heading-color)'
                    }}>
                      {category.title}
                    </h4>
                    <p style={{ 
                      fontSize: '0.8rem',
                      margin: 0,
                      color: 'var(--ifm-color-content-secondary)'
                    }}>
                      {category.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Facebook Comments Integration */}
            <FacebookComments
              url={currentUrl}
              width="100%"
              numPosts={10}
              colorScheme="light"
            />

            {/* Call to Action */}
            <div style={{
              textAlign: 'center',
              marginTop: '3rem',
              padding: '2rem',
              background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              borderRadius: '12px',
              border: '1px solid var(--ifm-color-primary-lighter)'
            }}>
              <Heading as="h3" style={{
                fontSize: '1.3rem',
                marginBottom: '1rem',
                color: 'var(--ifm-color-primary)'
              }}>
                🚀 Cùng Xây Dựng Beli5 Tốt Hơn!
              </Heading>
              <p style={{
                fontSize: '1rem',
                color: 'var(--ifm-color-content-secondary)',
                maxWidth: '600px',
                margin: '0 auto 1.5rem auto',
                lineHeight: '1.6'
              }}>
                Mỗi góp ý của bạn đều có giá trị! Hãy chia sẻ suy nghĩ để giúp chúng tôi 
                tạo ra nội dung và công cụ học tập phù hợp nhất với nhu cầu của bạn.
              </p>
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <a 
                  href="https://github.com/behitek/beli5/issues" 
                  className="button button--primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🐛 Báo Lỗi GitHub
                </a>
                <a 
                  href="https://luyencode.net" 
                  className="button button--secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  💪 Luyện Tập Code
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackPage;