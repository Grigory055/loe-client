import { createSlice } from '@reduxjs/toolkit';
import { IGameStat } from '../types/types';
import { fetchStats } from './thunkActions';

export type StatSliceState = {
    stats: IGameStat[]
}

const initialState: StatSliceState = {
    stats: []
}

const statSlice = createSlice({
    name: 'statSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchStats.fulfilled, (state: StatSliceState, { payload }) => {
            if (payload) state.stats = payload
        })
    }
})

export default statSlice.reducer