import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context.js";
import {
  loginUser,
  registerUser,
  logoutUser,
  getMe,
} from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      setUser(data.user);
    } catch (_err) {
      console.error(_err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const data = await registerUser({ name, email, password });
      setUser(data.user);
    } catch (_err) {
      console.error(_err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
    } catch (_err) {
      console.error(_err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetMe = async () => {
    setLoading(true);
    try {
      const data = await getMe();
      setUser(data.user);
    } catch (_err) {
      console.error(_err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch {
        // not authenticated
      } finally {
        setLoading(false);
      }
    };

    getAndSetUser();
  }, [setUser, setLoading]);

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
    handleGetMe,
  };
};
