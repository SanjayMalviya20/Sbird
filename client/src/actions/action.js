import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    user: null,
    otheruser: null,
    profile:[],
    searchuser:"",
    refresh:false
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setOtherUser: (state, action) => {
            state.otheruser = action.payload
        },
        setProfile:(state,action)=>{
            state.profile=action.payload
        }    ,
        setfollow:(state,action)=>{
            if(state.user.following.includes(action.payload)){
                state.user.following=state.user.following.filter((id)=>id!==action.payload)
            }   
            else{
                state.user.following.push(action.payload)
            }
        },
        setbookmark:(state, action) => {
            if(state.user.bookmarks.includes(action.payload)){
                state.user.bookmarks=state.user.bookmarks.filter((id)=>id!==action.payload)
            }   
            else{
                state.user.bookmarks.push(action.payload)
            }
        },
        setrefresh:(state,action)=>{
            state.refresh=action.payload
        },
        setupdate:(state,action)=>{
            state.user=action.payload
        },
        setsearchuser:(state,action)=>{
            state.searchuser=action.payload
        }

    }
}
)

// Action creators are generated for each case reducer function
export const { setUser, setOtherUser,setProfile ,setfollow,setbookmark,setupdate,setrefresh,setsearchuser} = userSlice.actions
export default userSlice.reducer