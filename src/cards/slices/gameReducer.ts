export const INCREMENT_POINTS = "INCREMENT_POINTS";
export const RESET_POINTS = "RESET_POINTS";

export interface GameState{
    points: number;
}

const initialState: GameState = {
    points: 0
}

export function increment(amount = 1){
    return{
        type: INCREMENT_POINTS,
        payload: amount
    }
}

export function reset(amount = 0){
    return{
        type: RESET_POINTS,
        payload: amount
    }
}

export default function gameReducer(state = initialState, action: any){
    switch(action.type){
        case INCREMENT_POINTS:
            return{
                ...state,
                points: state.points + action.payload
            };
        case RESET_POINTS:
            return{
                ...state,
                points: action.payload
            };
        default:
            return state;
    }
}