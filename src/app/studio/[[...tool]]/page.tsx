"use client";

import dynamic from "next/dynamic";

const Studio = dynamic(() => import("next-sanity/studio").then((mod) => {
  const { NextStudio } = mod;
  return import("../../../../sanity.config").then((cfg) => ({
    default: () => <NextStudio config={cfg.default} />,
  }));
}), { ssr: false });

export default function StudioPage() {
  return <Studio />;
}
