import * as lang from "../../lang.json";
import { create } from "zustand";
import { GradientDirection } from "../types/gradient.ts";

export type TagState = {
  name: string;
  title: Title;
  banner: string;
  id: string;
  badges: [string, string, string];
  color: string;
  bgColours: string[];
  isCustom: boolean;
  isGradient: boolean;
  layers: number;
  gradientDirection: GradientDirection;
};

type TagStore = TagState & {
  set: (tag: TagState) => void;
};

type Title = {
  first: number;
  last: number;
  string: string;
};

const initTitle = {
  title: {
    first: -1,
    last: -1,
    string: "카오폴리스의 젊은이",
  },
};

export const initTagState: TagState = {
  name: "Player",
  title: { ...initTitle.title },
  banner: "Npl_Tutorial00.png",
  layers: 0,
  id: lang["KRko"].sign + "0001",
  badges: ["", "", ""],
  color: "#ffffff",
  bgColours: ["#bbbbbb", "#999999", "#555555", "#222222"],
  isGradient: false,
  isCustom: false,
  gradientDirection: "to bottom",
};

export const useTagStore = create<TagStore>((set) => ({
  ...initTagState,
  set: (tag: TagState) =>
    set((state) => ({
      ...state,
      ...tag,
    })),
}));

export const setTitle = (title: Partial<Title>) => {
  useTagStore.setState((state) => ({
    ...state,
    title: {
      ...state.title,
      ...title,
    },
  }));
};

export const useTitle = () => {
  return useTagStore((state) => state.title);
};

export const setName = (name: string) => {
  useTagStore.setState((state) => ({
    ...state,
    name,
  }));
};

export const useName = () => {
  return useTagStore((state) => state.name);
};

export const setBanner = (banner: string) => {
  useTagStore.setState((state) => ({
    ...state,
    banner,
    isGradient: false,
  }));
};

export const useBanner = () => {
  return useTagStore((state) => state.banner);
};

export const setBadges = (badges: [string, string, string]) => {
  useTagStore.setState((state) => ({
    ...state,
    badges,
  }));
};

export const useBadges = () => {
  return useTagStore((state) => state.badges);
};

export const setColor = (color: string) => {
  useTagStore.setState((state) => ({
    ...state,
    color,
  }));
};

export const useColor = () => {
  return useTagStore((state) => state.color);
};

export const setId = (id: string) => {
  useTagStore.setState((state) => ({
    ...state,
    id,
  }));
};

export const useId = () => {
  return useTagStore((state) => state.id);
};

export const setLayers = (layers: number) => {
  useTagStore.setState((state) => ({
    ...state,
    layers,
  }));
};

export const setGradient = (bgColours: string[]) => {
  useTagStore.setState((state) => ({
    ...state,
    bgColours,
    isGradient: true,
  }));
};

export const useGradient = () => {
  return useTagStore((state) => state.bgColours);
};

export const useGradientDirection = () => {
  return useTagStore((state) => state.gradientDirection);
};

export const setGradientDirection = (gradientDirection: GradientDirection) => {
  useTagStore.setState((state) => ({
    ...state,
    gradientDirection,
    isGradient: true,
  }));
};
