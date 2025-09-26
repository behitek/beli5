import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          🤖 {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/python/intro">
            🐍 Bắt Đầu với Python! 
          </Link>
          <Link
            className="button button--primary button--lg margin-left--md"
            to="/java/intro">
            ☕ Thử Java Thay Thế!
          </Link>
        </div>
        <div className={styles.buttons} style={{marginTop: '1rem'}}>
          <Link
            className="button button--outline button--primary"
            to="/cpp/intro">
            ⚡ C++ Cho Người Học Nâng Cao
          </Link>
          <Link
            className="button button--outline button--primary margin-left--md"
            to="/rust/intro">
            🦀 Rust - An Toàn Trên Hết!
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Hướng Dẫn Lập Trình từ AI!"
      description="Hướng dẫn lập trình được tạo bởi AI, giải thích bằng thuật ngữ đơn giản cho người mới bắt đầu hoàn toàn. Học Python, Java, C++, và Rust với lời giải thích theo phong cách ELI5.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}