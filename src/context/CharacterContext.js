import React from "react";

export const initialCharacter = {
    //[...[...facet scores]]
    bigfiveScores: [],
    //[...{conditionalSchema: {index, copingStyles:[..key]} or null, unconditionalSchema: {index, copingStyles:[..key]}}]
    schemaIndices: [],
};

export function charaReducer(state, action) {
    switch (action.type) {
        case "SET_BIGFIVE_SCORES":
            return {
                bigfiveScores: action.bigfiveScores,
                schemaIndices: state.schemaIndices,
            };
        case "SET_SCHEMA_INDICES":
            return {
                bigfiveScores: state.bigfiveScores,
                schemaIndices: action.schemaIndices,
            };
        default:
            return state;
    }
}

// CharacterDispatch 라는 이름으로 내보내줍니다.
export const CharacterContext = React.createContext(null);
