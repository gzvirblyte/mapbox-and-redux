const initState = {
    points: [[0, 0]],
    distance: 0
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_COORDINATES':
            return {
                ...state,
                points: [...state.points, action.coordinates]
            }
        case 'GET_DISTANCE': {
            return {
                ...state,
                distance: action.distance
            }
        }
        default: {
            return state;
        }
    }
}

export default rootReducer;