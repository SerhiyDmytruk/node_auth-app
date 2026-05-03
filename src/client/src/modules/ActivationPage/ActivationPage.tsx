import { useParams, useNavigate } from 'react-router-dom';
import { client } from '../../utils/client';
import { useEffect, useState } from 'react';

type FormStatus = {
  type: 'error' | 'success';
  message: string;
};

export const ActivationPage = () => {
  const [status, setStatus] = useState<FormStatus | null>(null);
  const { token } = useParams();
  const navigate = useNavigate();
  let timerId;

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        if (!token) {
          setStatus({
            type: 'error',
            message: 'Activation token is missing.',
          });

          timerId = setTimeout(() => navigate('/home'), 1500);
          return;
        }

        const response = await client.get(`/activate/${token}`);

        setStatus({
          type: 'success',
          message: response.message + '. Redirecting to Login ....',
        });

        timerId = setTimeout(() => navigate('/login'), 1500);
      } catch (error) {
        setStatus({
          type: 'error',
          message:
            error instanceof Error
              ? error.message + '. Redirecting to Home ....'
              : 'Request failed',
        });

        timerId = setTimeout(() => navigate('/home'), 1500);
      }
    };

    loadCurrentUser();
    clearTimeout(timerId);
  }, [token, navigate]);

  return (
    <>{status ? <p>{status.message}</p> : 'Activating your account....'}</>
  );
};
