import { writable } from 'svelte/store';

const buildStore = () => {
  const { subscribe, set } = writable(undefined as gapi.auth2.BasicProfile | undefined);

  return {
    subscribe,
    setCurrentUser: (user: gapi.auth2.BasicProfile | undefined) => set(user),
  };
};

export const auth = buildStore();
