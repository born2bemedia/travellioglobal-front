"use client";

import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

export type FormsPopupType = "market-research" | "property-consultation" | "request";

type FormsPopupStore = {
  popupType: FormsPopupType | null;
  requestName: string;
  openMarketResearch: () => void;
  openPropertyConsultation: () => void;
  openRequest: (name: string) => void;
  closePopup: () => void;
};

export const useFormsPopupStore = create<FormsPopupStore>((set) => ({
  popupType: null,
  requestName: "",

  openMarketResearch: () => set({ popupType: "market-research" }),

  openPropertyConsultation: () => set({ popupType: "property-consultation" }),

  openRequest: (name: string) => set({ requestName: name, popupType: "request" }),

  closePopup: () => set({ popupType: null, requestName: "" }),
}));

/** Hook with only actions (for components that only open/close popups). */
export function useFormsPopup() {
  return useFormsPopupStore(
    useShallow((state) => ({
      openMarketResearch: state.openMarketResearch,
      openPropertyConsultation: state.openPropertyConsultation,
      openRequest: state.openRequest,
      closePopup: state.closePopup,
    }))
  );
}
