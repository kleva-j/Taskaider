"use client";

import { createEdgeStoreProvider } from "@edgestore/react";
import { type EdgeStoreRouter } from "@taskaider/api";

const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<EdgeStoreRouter>();

export { EdgeStoreProvider, useEdgeStore };
