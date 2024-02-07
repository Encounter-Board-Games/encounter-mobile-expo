export default function discovery(state = { filters: {} }, action) {
  
    switch (action.type) {
        case 'SET_DISCOVERY_STEPS':
            return {
                ...state,
                steps: action.steps
            }
        case 'SET_SELECT_FILTER_TOGGLE_DISCOVERY':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.filterType]: !state.filters[action.filterType] ? [action.value] : (
                        state.filters[action.filterType].includes(action.value) ?
                            state.filters[action.filterType].filter(c => c !== action.value) :
                            state.filters[action.filterType].concat([action.value])
                    )
                }
            }
        case 'OPEN_DISCOVERY':
            return {
                ...state,
                open: true
            }
        case 'CLOSE_DISCOVERY':
            return {
                ...state,
                open: false
            }
        case 'START_DISCOVERY':
            return {
                ...state,
                start: true
            }
            
        case 'SET_FILTERS_DISCOVERY':
            return  {
                ...state,
                filters: {
                    ...action.filters,
                }
            }   
        default:
            return state
    }
}