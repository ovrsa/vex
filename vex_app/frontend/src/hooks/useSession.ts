export const useSession = () => {
    const sessionData = JSON.parse(localStorage.getItem('recoil-persist') || '{}');
    const user = sessionData.isLoginState ? sessionData.isLoginState.user : null;

    return user;
};