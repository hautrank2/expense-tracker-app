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
  payload: AuthPayload | null;
  onAuthticate: (token: AuthPayload) => void;
  onLogout: () => void;
};

export type AuthPayload = {
  email: string;
  token: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [payload, setPayload] = useState<AuthPayload | null>(null);

  const onAuthticate = useCallback((newToken: AuthPayload) => {
    setPayload(newToken);
  }, []);

  const onLogout = useCallback(() => {
    setPayload(null);
  }, []);

  const value = useMemo<AuthContextType>(
    () => ({
      isAuthenticated: !!payload,
      payload,
      onAuthticate,
      onLogout,
    }),
    [onAuthticate, onLogout, payload],
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
