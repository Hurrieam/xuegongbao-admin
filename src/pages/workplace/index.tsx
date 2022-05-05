import React from 'react';
import Overview from './overview';
import Shortcuts from './shortcuts';
import Announcement from './announcement';
import Carousel from './carousel';
import styles from './style/index.module.less';

const gutter = 16;

function Workplace() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.panel}>
          <Overview />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.panel}>
          <Shortcuts />
        </div>
        <div className={styles.panel} style={{ marginTop: gutter }}>
          <Carousel />
        </div>
        <div className={styles.panel} style={{ marginTop: gutter }}>
          <Announcement />
        </div>
      </div>
    </div>
  );
}

export default Workplace;
