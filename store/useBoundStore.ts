import { create } from "zustand";
import { createManagerInactivateSlice } from "./slices/managerInactivateSlice";
import { ManagerInactivateSlice } from "./slices/managerInactivateSlice/type";
import { createTeamLeadInactivateSlice } from "./slices/teamLeadInactivateSlice/index";
import { TeamLeadInactivateSlice } from "./slices/teamLeadInactivateSlice/type";
import { createSidebarSlice } from "./slices/sidebarDimensionSlice";
import { SidebarSlice } from "./slices/sidebarDimensionSlice/type";

export const useBoundStore = create<
  ManagerInactivateSlice & TeamLeadInactivateSlice & SidebarSlice
>()((...a) => ({
  ...createManagerInactivateSlice(...a),
  ...createTeamLeadInactivateSlice(...a),
  ...createSidebarSlice(...a),
}));
