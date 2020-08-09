import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AccessController() {
  const token = useSelector(store => store.auth.token);
  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.push('/sign-in');
    }
    window.scrollTo(0, 0);
  }, [token, history]);

  return null;
}

export default AccessController;
