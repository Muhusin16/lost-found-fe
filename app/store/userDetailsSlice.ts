import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define an interface for the user's state
interface UserState {
    userDetails: { [key: string]: any }; // A flexible userDetails object to store user properties dynamically
}

// Set the initial state with an empty userDetails object
const initialState: UserState = {
    userDetails: {}, // Initially empty, properties can be added dynamically
};

// Create the slice for managing user details
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Set or update multiple user details at once
        setUserDetails(state, action: PayloadAction<{ [key: string]: any }>) {
            state.userDetails = { ...state.userDetails, ...action.payload }; // Merge new details with existing state
        },
        // Clear all user details (reset userDetails to an empty object)
        clearUserDetails(state) {
            state.userDetails = {};
        },
        // Set or update a specific user property dynamically
        setUserProperty(state, action: PayloadAction<{ key: string; value: any }>) {
            state.userDetails[action.payload.key] = action.payload.value;
        },
    },
});

// Export the actions and reducer
export const { setUserDetails, clearUserDetails, setUserProperty } = userSlice.actions;

export default userSlice.reducer;
