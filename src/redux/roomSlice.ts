import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Room } from '@models/room'

interface RoomState {
  rooms: Room[]
  selectedRoom: Room | null
  searchResultRooms: Room[]
}

const initialState: RoomState = {
  rooms: [],
  selectedRoom: null,
  searchResultRooms: [],
}

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload
    },
    setSearchResultRooms: (state, action: PayloadAction<Room[]>) => {
      state.searchResultRooms = action.payload
    },
    setSelectedRoom: (state, action: PayloadAction<Room>) => {
      state.selectedRoom = action.payload
    },
    resetRoom: () => {
      return initialState
    },
  },
})

export const { setRooms, setSearchResultRooms, setSelectedRoom, resetRoom } =
  roomSlice.actions

export default roomSlice.reducer
