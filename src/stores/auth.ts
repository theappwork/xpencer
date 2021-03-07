import { writable } from 'svelte/store';

const buildStore = () => {
  const { subscribe, set } = writable(null as gapi.auth2.BasicProfile | null);

  return {
    subscribe,
    setCurrentUser: (user: gapi.auth2.BasicProfile | null) => set(user),
  };
};

export const auth = buildStore();
