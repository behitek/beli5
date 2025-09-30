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
    title: '🎯 Lộ Trình Học Tập Rõ Ràng',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Mỗi ngôn ngữ lập trình đều có lộ trình học từ cơ bản đến nâng cao được thiết kế 
        tỉ mỉ. Bắt đầu với <strong>🟢 Cơ Bản Siêu Dễ</strong>, tiến lên <strong>🟡 Trung Bình Thú Vị</strong>, 
        và chinh phục <strong>🔴 Thách Thức Cao</strong> với các dự án thực tế!
      </>
    ),
  },
  {
    title: '🧒 Phương Pháp ELI5 Độc Đáo',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Mọi khái niệm phức tạp đều được "Giải Thích Như Bạn 5 Tuổi" bằng những ví dụ 
        quen thuộc với trẻ em Việt Nam. Python như con rắn thông minh, Java như khối LEGO, 
        C++ như dụng cụ chuyên nghiệp, Rust như thiết bị an toàn siêu hiện đại!
      </>
    ),
  },
  {
    title: '🏆 Dự Án Thực Tế Thú Vị',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Không chỉ học lý thuyết! Xây dựng game đơn giản, tạo website cá nhân, 
        làm chatbot thông minh, và nhiều dự án thực tế khác. Mỗi dự án đều có 
        hướng dẫn từng bước chi tiết và giải thích dễ hiểu cho người mới bắt đầu!
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