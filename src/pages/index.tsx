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
            🐍 Start with Python! 
          </Link>
          <Link
            className="button button--primary button--lg margin-left--md"
            to="/java/intro">
            ☕ Try Java Instead!
          </Link>
        </div>
        <div className={styles.buttons} style={{marginTop: '1rem'}}>
          <Link
            className="button button--outline button--primary"
            to="/cpp/intro">
            ⚡ C++ for Advanced Learners
          </Link>
          <Link
            className="button button--outline button--primary margin-left--md"
            to="/rust/intro">
            🦀 Rust for Safety First!
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
      title="Welcome to AI Programming Tutorials!"
      description="AI-generated programming tutorials explained in simple terms for complete beginners. Learn Python, Java, C++, and Rust with ELI5 style explanations.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}