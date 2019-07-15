import { GRANT_ACCESS } from '../constants/accessConstants';

const initialState = {
    token: null,
    userId: null
};

const access = (state = initialState, action) => {
    if (action.type === GRANT_ACCESS) {
        return {
            token: action.payload.token || null,
            userId: action.payload.userId || null
        };
    }

    return state;
};

export default access;
