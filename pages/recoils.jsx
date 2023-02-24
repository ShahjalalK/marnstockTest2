import React from "react";
import RecoilTest from "./coutertest/recoiltest";
import { RecoilRoot } from "recoil";

export default function Recoil() {
  return (
    <div>
      <RecoilRoot>
        <RecoilTest />
      </RecoilRoot>
    </div>
  );
}
