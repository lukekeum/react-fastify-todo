import { useState, useEffect } from 'react';
import api from '../../lib/axios';

const useFetchUser = () => {
  const [user, setUser] = useState();

  const fetchUser = async () => {
    try {
      const response = await api.get('/api/auth/me');

      if (!response.data.data) {
        return;
      }

      setUser(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  });

  return user;
};

export default useFetchUser;
