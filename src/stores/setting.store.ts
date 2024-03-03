import {ActionStoreBaseModel} from 'models';
import {create} from 'zustand';

type State = {
  volume: number;
};
type Action = ActionStoreBaseModel<{
  setVolume: (volume: number) => void;
}>;
const initialState: State = {
  volume: 10,
};
export const useSettingStore = create<State & Action>(set => ({
  ...initialState,
  reset: () => set(() => initialState),
  setVolume: volume =>
    set(state => ({
      ...state,
      volume,
    })),
}));
