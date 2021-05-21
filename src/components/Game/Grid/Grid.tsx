import React from "react";
import {Cell} from "../Cell/Cell";

export interface GridProps {

}
export function Grid(props: GridProps) {
    const [isAlive, setIsAlive] = React.useState(true);
    const toggleAlive = (row: number, column: number) => {
        console.log("Toggle", row, column);
        setIsAlive(!isAlive);
    }

    const onPress = React.useCallback((row: number, column: number) => {
        toggleAlive(row, column);
    }, [toggleAlive]);

    return <div>
        Grid
        <Cell alive={isAlive} row={0} column={0} onPress={onPress} />
    </div>;
}
