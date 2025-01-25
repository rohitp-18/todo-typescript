import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "./alertProvider";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, loading } = useContext(AlertContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  return <>{user && children}</>;
}

export default AuthProvider;
