import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { countState, histryState } from "./countState";

export default function CounterBtn() {
    const [count, setCount] = useRecoilState(countState)
    const setHistry = useSetRecoilState(histryState)
    const inc = () => {
        setCount(count + 1)
        setHistry(prev => [...prev, "Incriment By 1"])
    }
    const dic = () => {
        setCount(count - 1)
        setHistry(prev => [...prev, "Decriment By 1"])
    }
  return (
    <div className="flex items-center space-x-1">
      <button
        className="px-5 py-1 bg-gray-600"
        onClick={inc}
      >
        Incriment
      </button>
      <button
        className="px-5 py-1 bg-gray-600"
        onClick={dic }
      >
        Dicriment
      </button>
    </div>
  );
}
