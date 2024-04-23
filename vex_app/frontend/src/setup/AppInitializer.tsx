import { authState } from "@/state/authState";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export const AppInitializer = () => {
    // データの永続化を行うため、localStorageからデータを取得する
    const setAuth = useSetRecoilState(authState);
  
    useEffect(() => {
      const session = localStorage.getItem('session');
      try {
        if (session) {
          setAuth(JSON.parse(session));
        }
      } catch (error) {
        console.error('Error initialize auth state:', error);
      }
    }, [setAuth]);
  
    return null; 
  };