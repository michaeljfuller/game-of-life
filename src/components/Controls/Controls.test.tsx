import React from "react";
import {fireEvent, render} from "@testing-library/react";
import {Controls, ControlsProps} from "./Controls";

function renderControls(partial?: Partial<ControlsProps>) {
    const props: ControlsProps = Object.assign({
        playing: false,
        columns: 12,
        rows: 12,
        speed: 1,
        onPause: () => {},
        onPlay: () => {},
        onSetRows: () => {},
        onSetColumns: () => {},
        onSetSpeed: () => {},
    }, partial);
    return render(<Controls {...props} />);
}

describe("Controls", () => {
    describe('props', () => {

        it('shows play button if paused', () => {
            const controls = renderControls({ playing: false });
            const button = controls.getByTestId('play-toggle');
            expect(button).toHaveTextContent('Play')
        });

        it('shows pause button if playing', () => {
            const controls = renderControls({ playing: true });
            const button = controls.getByTestId('play-toggle');
            expect(button).toHaveTextContent('Pause')
        });

        it('can set columns', () => {
            const columns = 123;
            const controls = renderControls({ columns });
            expect(controls.getByTestId('columns-input')).toHaveValue(columns);
        });

        it('can set rows', () => {
            const rows = 123;
            const controls = renderControls({ rows });
            expect(controls.getByTestId('rows-input')).toHaveValue(rows);
        });

        it('can set speed', () => {
            const speed = 1.23;
            const controls = renderControls({ speed });
            expect(controls.getByTestId('speed-input')).toHaveValue(speed.toString());
        });

    });
    describe('callbacks', () => {

        it('has a pause button', () => {
            const onPause = jest.fn();
            const controls = renderControls({ onPause, playing: true });
            const button = controls.getByTestId('play-toggle');
            fireEvent.click(button);
            expect(onPause).toHaveBeenCalledTimes(1);
        });

        it('has a play button', () => {
            const onPlay = jest.fn();
            const controls = renderControls({ onPlay, playing: false });
            const button = controls.getByTestId('play-toggle');
            fireEvent.click(button);
            expect(onPlay).toHaveBeenCalledTimes(1);
        });

        it('has columns input', () => {
            const value = 123;
            const onSetColumns = jest.fn();
            const controls = renderControls({ onSetColumns });
            const field = controls.getByTestId('columns-input');
            fireEvent.input(field, { target: {value} });
            expect(onSetColumns).toHaveBeenCalledTimes(1);
            expect(onSetColumns).toHaveBeenCalledWith(value)
        });

        it('has rows input', () => {
            const value = 12.3;
            const onSetRows = jest.fn();
            const controls = renderControls({ onSetRows });
            const field = controls.getByTestId('rows-input');
            fireEvent.input(field, { target: {value} });
            expect(onSetRows).toHaveBeenCalledTimes(1);
            expect(onSetRows).toHaveBeenCalledWith(value)
        });

        it('has speed input', () => {
            const value = 1.23;
            const onSetSpeed = jest.fn();
            const controls = renderControls({ onSetSpeed });
            const field = controls.getByTestId('speed-input');
            fireEvent.input(field, { target: {value} });
            expect(onSetSpeed).toHaveBeenCalledTimes(1);
            expect(onSetSpeed).toHaveBeenCalledWith(value)
        });

    });
});

