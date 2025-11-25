"use client";

import { useEffect, useState } from "react";

type Props = {
  expiresAt: number; // timestamp in ms
  onExpire: () => void;
};

export default function Countdown({ expiresAt, onExpire }: Props) {
  const [remaining, setRemaining] = useState(() => expiresAt - Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      const diff = expiresAt - Date.now();
      setRemaining(diff);
      if (diff <= 0) {
        clearInterval(id);
        onExpire();
      }
    }, 1000);
    return () => clearInterval(id);
  }, [expiresAt, onExpire]);

  if (remaining <= 0)
    return <span className="text-red-600 font-semibold">Expired</span>;

  const mins = Math.floor(remaining / 60000);
  const secs = Math.floor((remaining % 60000) / 1000);

  return (
    <span className="text-indigo-700 font-semibold">
      {mins.toString().padStart(2, "0")}:{secs.toString().padStart(2, "0")}
    </span>
  );
}
