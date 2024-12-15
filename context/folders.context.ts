import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Folders = {
  folders: string[];
  addFolder: (item: string) => void;
  removeFolder: (item: string) => void;
};

const useFolders = create<Folders>()(
  persist(
    (set) => ({
      folders: [],
      addFolder: (item) =>
        set((state) => {
          if (state.folders.find((folder) => folder === item)) {
            return state;
          }
          const folders = [...state.folders, item];
          return { folders };
        }),
      removeFolder: (item) =>
        set((state) => {
          const folders = state.folders.filter((folder) => folder !== item);
          return { folders };
        }),
    }),
    {
      name: "folders",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useFolders;
