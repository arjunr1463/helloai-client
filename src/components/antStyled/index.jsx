"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs";

export default function AntdStyledComponentsRegistry({ children }) {
  // Create cache using useMemo to ensure it's not re-created on every render
  const [cache] = useState(() => createCache());

  // Insert Ant Design's styles into the server-rendered HTML
  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ));

  // Wrap children with the StyleProvider to ensure styles are applied
  return <StyleProvider cache={cache}>{children}</StyleProvider>;
}
