export const googleSignIn = () => gapi.auth2.getAuthInstance().signIn();
export const googleSignOut = () => gapi.auth2.getAuthInstance().signOut();
export const listenAuthChanges = (callback: (isSignIn: boolean) => void) => gapi.auth2.getAuthInstance().isSignedIn.listen(callback);
