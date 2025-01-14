import { createSlice } from '@reduxjs/toolkit';

export interface IPendingTxn {
  readonly txnHash: string;
  readonly text: string;
  readonly type: string;
}

const initialState: Array<any> = [];

const pendingTxnsSlice = createSlice({
  name: 'pendingTransactions',
  initialState,
  reducers: {
    fetchPendingTxns(state, action) {
      state.push(action.payload);
    },
    clearPendingTxn(state, action) {
      const target = state.find(x => x.txnHash === action.payload);
      state.splice(state.indexOf(target), 1);
    },
  },
});

export const getStakingTypeText = (action: string) => {
  return action.toLowerCase() === 'stake' ? 'Staking CLAM' : 'Unstaking sCLAM';
};

export const isPendingTxn = (pendingTransactions: IPendingTxn[], type: string) => {
  return pendingTransactions.map(x => x.type).includes(type);
};

export const txnButtonText = (
  pendingTransactions: IPendingTxn[],
  type: string,
  progress: string,
  defaultText: string,
) => {
  return isPendingTxn(pendingTransactions, type) ? progress : defaultText;
};

export const { fetchPendingTxns, clearPendingTxn } = pendingTxnsSlice.actions;

export default pendingTxnsSlice.reducer;
