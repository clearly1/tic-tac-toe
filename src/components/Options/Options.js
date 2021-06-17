import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    changeFirstStepOption,
    changeFormatOption,
    changeModeOption,
    selectOptions
} from "../../features/options/optionsSlice";
import styles from './OptionsStyles.module.sass';
import GameOption from "../GameOption/GameOption";

const gameModeOptions = {
    name: 'Режим игры',
    type: 'mode',
    list: [
        {
            value: 'PvP',
            label: 'Player vs Player'
        },
        {
            value: 'PvC',
            label: 'Player vs Computer'
        },
        {
            value: 'CvC',
            label: 'Computer vs Computer'
        },
    ]
};

const gameStepOptions = {
    name: 'Ходит первый',
    type: 'firstStep',
    list: [
        {
            value: 'Player',
            label: 'Player'
        },
        {
            value: 'Computer',
            label: 'Computer'
        },
    ]
};

const gameFormatOptions = {
    name: 'Формат поля',
    type: 'format',
    list: [
        {
            value: '3x3',
            label: '3x3',
        },
        {
            value: '50x50',
            label: '50x50'
        },
    ]
};

function Options() {

    const options = useSelector(selectOptions);
    const dispatch = useDispatch();

    return (
        <div className={styles.optionsContainer}>
            <span className={styles.settingsHeader}>Настройки</span>
            <GameOption parameters={{
                name: gameModeOptions.name,
                type: gameModeOptions.type,
                value: options.mode,
                onChange: e => dispatch(changeModeOption(e.target.value)),
                list: gameModeOptions.list
            }}/>

            {
                options.mode === 'PvC' &&
                <GameOption parameters={{
                    name: gameStepOptions.name,
                    type: gameStepOptions.type,
                    value: options.firstStep,
                    onChange: e => dispatch(changeFirstStepOption(e.target.value)),
                    list: gameStepOptions.list
                }}/>
            }
            <GameOption parameters={{
                name: gameFormatOptions.name,
                type: gameFormatOptions.type,
                value: options.format,
                onChange: e => dispatch(changeFormatOption(e.target.value)),
                list: gameFormatOptions.list
            }}/>
        </div>
    );
}

export default Options;