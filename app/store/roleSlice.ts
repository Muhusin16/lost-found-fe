import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RoleState {
    role: string | null;

}

const initialState: RoleState = {
    role: null,
};

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        setRole(state, action: PayloadAction<string | null>) {
            state.role = action.payload;
        },
        clearRole(state) {
            state.role = null;
        },
    },
})

export const { setRole, clearRole } = roleSlice.actions;

export default roleSlice.reducer;