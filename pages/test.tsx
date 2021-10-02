import Account from 'components/account';
import Auth from 'components/login';
import { useAppSelector } from 'redux/store';

export default function Home() {
  const session = useAppSelector((state) => state.auth.session);

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth />
      ) : (
        <Account/>
      )}
    </div>
  );
}