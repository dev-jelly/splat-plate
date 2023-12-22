import { create } from "zustand";

type FontRect = {
  x: number;
  y: number;
  fontSize: number;
};

type Rect = {
  x: number;
  y: number;
  w: number;
  h: number;
};

type TagPositionState = {
  tagSize: {
    w: number;
    h: number;
  };
  titlePosition: FontRect;
  namePosition: FontRect;
  badgesPosition: Rect;
  idPosition: FontRect;
};

type TagPositionStore = TagPositionState & {
  set: (tag: TagPositionState) => void;
};

export const initTagPositionState: TagPositionState = {
  tagSize: {
    w: 700,
    h: 200,
  },
  titlePosition: {
    x: 0,
    y: 0,
    fontSize: 0,
  },
  namePosition: {
    x: 0,
    y: 0,
    fontSize: 0,
  },
  badgesPosition: {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  },
  idPosition: {
    x: 0,
    y: 0,
    fontSize: 0,
  },
};

export const useTagPositionStore = create<TagPositionStore>((set) => ({
  ...initTagPositionState,
  set: (tag: TagPositionState) =>
    set((state) => ({
      ...state,
      ...tag,
    })),
}));

export const useTagPosition = () => {
  const tagSize = useTagPositionStore((state) => state.tagSize);
  const titlePosition = useTagPositionStore((state) => state.titlePosition);
  const namePosition = useTagPositionStore((state) => state.namePosition);
  const badgesPosition = useTagPositionStore((state) => state.badgesPosition);
  const idPosition = useTagPositionStore((state) => state.idPosition);

  return {
    tagSize,
    titlePosition,
    namePosition,
    badgesPosition,
    idPosition,
  };
};

export const useTagSize = () => useTagPositionStore((state) => state.tagSize);

export const setTagSize = (tagSize: TagPositionState["tagSize"]) => {
  useTagPositionStore.setState((state) => ({
    ...state,
    tagSize,
  }));
};

export const setTitlePosition = (
  titlePosition: TagPositionState["titlePosition"],
) => {
  useTagPositionStore.setState((state) => ({
    ...state,
    titlePosition,
  }));
};

export const setNamePosition = (
  namePosition: TagPositionState["namePosition"],
) => {
  useTagPositionStore.setState((state) => ({
    ...state,
    namePosition,
  }));
};
export const setBadgesPosition = (
  badgesPosition: TagPositionState["badgesPosition"],
) => {
  useTagPositionStore.setState((state) => ({
    ...state,
    badgesPosition,
  }));
};

export const setIdPosition = (idPosition: TagPositionState["idPosition"]) => {
  useTagPositionStore.setState((state) => ({
    ...state,
    idPosition,
  }));
};

export const setTagPosition = (tagPosition: TagPositionState) => {
  useTagPositionStore.setState((state) => ({
    ...state,
    ...tagPosition,
  }));
};

export const resetTagPosition = () => {
  useTagPositionStore.setState((state) => ({
    ...state,
    ...initTagPositionState,
  }));
};

export const useTagPositionState = () => useTagPositionStore.getState();
