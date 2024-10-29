import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    getallpost: null,
    loading: false,
}
export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setallpost: (state, action) => { 
            state.getallpost = action.payload.data
        }
        ,
        setlodaing: (state, action) => {
            state.loading = action.payload.loading
        },
 
    },

}
)

// Action creators are generated for each case reducer function
export const { setallpost ,setlodaing,setrefresh} = postSlice.actions
export default postSlice.reducer