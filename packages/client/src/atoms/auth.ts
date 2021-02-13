import { atom } from 'recoil';

interface ISigninState {
  isLoading: boolean;
  isSignedIn: boolean;
  attributes: {
    email: string | null;
  };
}

export enum ESignState {
  LOGIN = 'login',
  REGISTER = 'register',
}

export const signTypeState = atom<ESignState>({
  key: 'sign',
  default: ESignState.LOGIN,
});

export const signInState = atom<ISigninState>({
  key: 'login',
  default: {
    isLoading: false,
    isSignedIn: true,
    attributes: {
      email: null,
    },
  },
});
