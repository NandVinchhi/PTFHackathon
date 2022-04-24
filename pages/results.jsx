import { Results } from "../components/lessons/Results";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";

export default function App() {
  const router = useRouter();
  const auth = getAuth();
  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (!user) {
        router.push("/login");
      }
    });
  }, []);
  return (
    <>
      <Results />
    </>
  );
}
