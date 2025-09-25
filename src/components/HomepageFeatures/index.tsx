import Heading from '@theme/Heading';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '🤖 AI-Generated Content',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        All tutorials are created by artificial intelligence and designed specifically 
        for complete beginners. Learn programming concepts explained in simple, 
        kid-friendly language with fun analogies!
      </>
    ),
  },
  {
    title: '🧒 ELI5 Style Learning',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Everything is "Explained Like You're 5" using toys, games, and everyday objects. 
        No confusing technical jargon - just simple explanations that make sense to 
        young learners and beginners of all ages!
      </>
    ),
  },
  {
    title: '🚀 Four Amazing Languages',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Choose your adventure! Learn Python (smart pet snake), Java (LEGO blocks), 
        C++ (power tools), or Rust (safety gear). Each has its own fun analogies 
        and complete learning path!
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}