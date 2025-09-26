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
    title: '🤖 Nội Dung Được Tạo Bởi AI',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Tất cả hướng dẫn đều được tạo bởi trí tuệ nhân tạo và được thiết kế 
        dành riêng cho người mới bắt đầu hoàn toàn. Học các khái niệm lập trình được giải thích 
        bằng ngôn ngữ đơn giản, thân thiện với trẻ em và những phép so sánh thú vị!
      </>
    ),
  },
  {
    title: '🧒 Học Theo Phong Cách ELI5',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Mọi thứ đều được "Giải Thích Như Bạn 5 Tuổi" sử dụng đồ chơi, trò chơi và đồ vật hàng ngày. 
        Không có thuật ngữ kỹ thuật phức tạp - chỉ có những lời giải thích đơn giản mà 
        các bạn nhỏ và người mới bắt đầu ở mọi lứa tuổi đều hiểu được!
      </>
    ),
  },
  {
    title: '🚀 Bốn Ngôn Ngữ Tuyệt Vời',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Chọn cuộc phiêu lưu của bạn! Học Python (con rắn thông minh), Java (khối LEGO), 
        C++ (dụng cụ chuyên nghiệp), hoặc Rust (thiết bị an toàn). Mỗi ngôn ngữ đều có 
        những phép so sánh thú vị riêng và lộ trình học tập hoàn chỉnh!
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