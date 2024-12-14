import reducer, { addSavedPlants } from '../src/redux/reducers/plantReducer'

describe('SavedPlants', () => {
    const initialState = {
        savedPlants: [],
        plant: { id: 1, name: 'Fern' },
    }

    it('should add a new plant to savedPlants if it does not exist', () => {

        const newPlant = { id: 1, name: 'Fern' }
        const action = addSavedPlants(newPlant)
        const state = reducer(initialState, action)

        expect(state.savedPlants).toHaveLength(1)
        expect(state.savedPlants[0]).toEqual(newPlant)
    })

    it('should remove a plant from savedPlants if it already exists', () => {
        const existingPlant = { id: 1, name: 'Fern' }
        const action = addSavedPlants(existingPlant)
        const state = reducer(initialState, action)
        expect(state.savedPlants).toHaveLength(0)
    })
})
