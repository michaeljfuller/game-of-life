import React from "react";
import {fireEvent, render} from "@testing-library/react";
import App from "./App";

function renderApp() {
    return render(<App />)
}
type RenderedApp = ReturnType<typeof renderApp>;

function getAllCells(app: RenderedApp) {
    return app.getAllByTestId(/^Cell\[/);
}

describe('App', () => {
    describe('Controls', () => {

        it('can start and stops the Game', () => {
            jest.useFakeTimers();
            const app = renderApp();
            const timersBefore = jest.getTimerCount();
            const toggle = app.getByTestId('play-toggle');
            fireEvent.click(toggle);
            expect(jest.getTimerCount()).toBeGreaterThan(timersBefore);
            fireEvent.click(toggle);
            expect(jest.getTimerCount()).toEqual(timersBefore);
        });

        it('can set the number of rows + columns', () => {
            const rows = 3, columns = 2;
            const app = renderApp();
            const rowsInput = app.getByTestId('rows-input');
            const columnsInput = app.getByTestId('columns-input');
            fireEvent.input(rowsInput, { target: { value: rows } });
            fireEvent.input(columnsInput, { target: { value: columns } });
            expect(getAllCells(app).length).toBe(rows * columns);
        });

        it('can set the speed of the app', () => {
            const setIntervalSpy = jest.spyOn(global, 'setInterval');
            const ticksPerSecond = 2;
            const app = renderApp();

            const input = app.getByTestId('speed-input');
            fireEvent.input(input, { target: { value: ticksPerSecond } });
            fireEvent.click(app.getByTestId('play-toggle'));

            expect(setIntervalSpy).toHaveBeenCalledTimes(1);
            const [ , ms] = setIntervalSpy.mock.calls[0];
            expect(ms).toBe(1000/ticksPerSecond);
        });

    });
});
