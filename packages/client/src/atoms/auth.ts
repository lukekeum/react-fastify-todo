import { atom } from 'recoil';

interface ISigninState {
  isLoading: boolean;
  isSignedIn: boolean;
  attributes: {
    email: string | null;
  };
}

export const signInState = atom<ISigninState>({
  key: 'login',
  default: {
    isLoading: false,
    isSignedIn: false,
    attributes: {
      email: null,
    },
  },
});
