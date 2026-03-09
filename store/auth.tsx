import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  onAuthticate: (token: string) => void;
  onLogout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({
  children,
}: AuthContextProviderProps) => {
  const [token, setToken] = useState<string | null>(null);

  const onAuthticate = useCallback((newToken: string) => {
    setToken(newToken);
  }, []);

  const onLogout = useCallback(() => {
    setToken(null);
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      isAuthenticated: !!token,
      token,
      onAuthticate,
      onLogout,
    }),
    [token, onAuthticate, onLogout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthCtx = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return context;
};