import { StateCreator } from "zustand";
import { SidebarSlice, SidebarState } from "./type";

const initialState: SidebarState = {
  width: null,
};

export const createSidebarSlice: StateCreator<SidebarSlice> = (set, get) => ({
  ...initialState,
  updateWidth: (width: number) => {
    set(() => ({ width }));
  },
});
