import { RouterProvider, Navigate } from "react-router";
import { router } from "./routes";
import { Toaster } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchNotes, fetchProfile, fetchTrashNotes } from "./Api/Apicall";

export default function App() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const themeMode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  const [checkingAuth, setCheckingAuth] = useState(true);

  // --- Theme Application ---
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(themeMode);
  }, [themeMode]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(fetchProfile()).unwrap();
      } catch (error) {
        console.log("Not logged in");
      } finally {
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, [dispatch]);

  useEffect(() => {
    if (!user) return;

    async function fetchAllData() {
      try {
        await Promise.all([
          dispatch(fetchNotes()).unwrap(),
          dispatch(fetchTrashNotes()).unwrap()
        ]);
      } catch (error) {
        console.log("Error fetching data :- ", error);
      }
    }

    fetchAllData();
  }, [user, dispatch]);

  if (checkingAuth) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </>
  );
}