import { createSlice } from "@reduxjs/toolkit"
import professionService from "../services/profession.service"

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true
    }
    return false
}

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state, action) => {
            state.isLoading = true
        },
        professionsReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
            state.lastFetch = Date.now()
        },
        professionsRequestFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { reducer: professionsReducer, actions } = professionsSlice
const { professionsRequestFailed, professionsReceived, professionsRequested } =
    actions

export const loadProfessionsList = () => async (dispatch, getState) => {
    const lastFetch = getState().professions.lastFetch
    if (isOutdated(lastFetch)) {
        dispatch(professionsRequested())
        try {
            const { content } = await professionService.get()
            dispatch(professionsReceived(content))
        } catch (error) {
            dispatch(professionsRequestFailed(error.message))
        }
    }
}

export const getProfessions = () => (state) => state.professions.entities

export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading

export const getProfessionsByIds = (professionsIds) => (state) => {
    if (state.professions.entities) {
        return state.professions.entities.find(
            (prof) => prof._id === professionsIds
        )
    }
}

export default professionsReducer
