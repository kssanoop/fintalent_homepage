export type SidebarState = {
  width: null | number;
};

export type SidebarAction = {
  updateWidth: (width: number) => void;
};

export type SidebarSlice = SidebarState & SidebarAction;
