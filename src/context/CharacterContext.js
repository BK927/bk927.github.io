import React from "react";

// CharacterDispatch 라는 이름으로 내보내줍니다.
export const CharacterContext = React.createContext({
    //[...[...facet scores]]
    bigfive: [],
    //[...{conditionalSchema: {index, copingStyles:[..key]} or null, unconditionalSchema: {index, copingStyles:[..key]}}]
    schema: [],
    setBigfive: (bigfive) => {},
    setSchema: (schema) => {},
});
