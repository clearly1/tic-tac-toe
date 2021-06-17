import React from 'react';
import styles from "./GameResultWindow.module.sass";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
import ClearIcon from '@material-ui/icons/Clear';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import {changeGameIsRunningOption} from "../../features/field/fieldSlice";
import {useDispatch} from "react-redux";
import PropTypes from 'prop-types';

function GameResultWindow(props) {

    const dispatch = useDispatch();

    return (
        <>
            <div className={styles.backgroundResult}/>
            <div className={styles.windowResultContainer}>
                <div className={styles.windowResult}>
                    <span>Результат игры:</span>
                    {
                        props.gameResult === 'Ничья' ?
                            <span>{props.gameResult}!</span>
                            :
                            !props.isNextCrossStep ?
                                <span>{props.gameResult}<SvgIcon component={ClearIcon}/>!</span>
                                :
                                <span>{props.gameResult}<SvgIcon
                                    component={FiberManualRecordOutlinedIcon}/>!</span>
                    }
                    <Button variant="contained" color="secondary" size="medium"
                            onClick={() => dispatch(changeGameIsRunningOption())}>
                        начать новую игру
                    </Button>
                </div>
            </div>
        </>
    );
}

GameResultWindow.propTypes = {
    gameResult: PropTypes.string,
    isNextCrossStep: PropTypes.bool,
};

export default GameResultWindow;