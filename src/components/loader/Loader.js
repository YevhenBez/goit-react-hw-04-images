import { InfinitySpin } from 'react-loader-spinner';
import css from './css/loader.module.css';

const Loader = () => {
  return (
    <div className={css.spinner}>
      <InfinitySpin width="200" color="#4fa94d" />
    </div>
  );
};

export default Loader;
