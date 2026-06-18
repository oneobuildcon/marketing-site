"use client";

import { useEffect } from "react";

/**
 * Deters casual copying: blocks right-click context menu and image
 * dragging/saving across the site. Note: this cannot stop a determined
 * user (screenshots, view-source) but discourages easy copying.
 */
export default function ProtectContent() {
  useEffect(() => {
    const blockContextMenu = (e: MouseEvent) => {
      // Allow right-click inside form fields so users can paste/edit
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea")) return;
      e.preventDefault();
    };
    const blockDrag = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG") e.preventDefault();
    };

    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("dragstart", blockDrag);
    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("dragstart", blockDrag);
    };
  }, []);

  return null;
}
