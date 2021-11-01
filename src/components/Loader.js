import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function SpinLoader() {
  return (
    <Loader
      type="Hearts"
      color="#853f33"
      height={100}
      width={90}
      timeout={3000}
      style={{
        position: 'fixed',
        top: '40%',
        left: '50%',
      }}
    />
  );
}
export default SpinLoader;
