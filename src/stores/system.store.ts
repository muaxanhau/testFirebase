import {ActionStoreBaseModel} from 'models';
import {create} from 'zustand';

type State = {};
type Action = ActionStoreBaseModel<{
  alert: (
    title: string,
    message: string,
    button?: {text: string; onPress: () => void}[],
  ) => void;
}>;
const initialState: State = {};
export const useSystemStore = create<State & Action>(set => ({
  ...initialState,
  reset: () => set(() => initialState),
  alert: () => {},
}));
