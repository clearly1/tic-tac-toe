import React from 'react';
import styles from './CellStyles.module.sass'
import ClearIcon from '@material-ui/icons/Clear';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import SvgIcon from "@material-ui/core/SvgIcon";
import PropTypes from 'prop-types';
import {useSelector} from "react-redux";
import {selectOptions} from "../../features/options/optionsSlice";

function Cell({
                  value,
                  countStepsInGame,
                  setCountStepsInGame,
                  checkRule50x50Field,
                  firstIndex,
                  secondIndex,
                  isNextCrossStep,
                  step,
                  checkGameStatus,
                  iconsSize,
                  ...props
              }) {

    const options = useSelector(selectOptions);

    const handleChange = () => {
        if (options.mode === 'CvC') return false;
        if (options.firstStep === 'Player' && options.mode === 'PvC' && !isNextCrossStep) {
            return false;
        }
        if (options.firstStep === 'Computer' && options.mode === 'PvC' && isNextCrossStep) {
            return false;
        }

        if (value === 0) {
            if (options.format === '50x50') {
                if (countStepsInGame !== 2500) {
                    if (!(checkRule50x50Field(firstIndex, secondIndex))) {
                        return false
                    }
                }
            }
            if (isNextCrossStep) {
                step('x', firstIndex, secondIndex);
                checkGameStatus('x', firstIndex, secondIndex);
            } else {
                step('o', firstIndex, secondIndex);
                checkGameStatus('o', firstIndex, secondIndex);
            }
            setCountStepsInGame(countStepsInGame - 1);
        }
    };

    return (
        <div className={styles.cellContainer} onClick={handleChange}>
            {
                value !== 0 && value === 'x' &&
                <SvgIcon component={ClearIcon} style={{fontSize: iconsSize}}/>
            }
            {
                value !== 0 && value === 'o' &&
                <SvgIcon component={FiberManualRecordOutlinedIcon} style={{fontSize: iconsSize}}/>
            }
        </div>
    );
}

Cell.propTypes = {
    isNextCrossStep: PropTypes.bool,
    setCountStepsInGame: PropTypes.func,
    countStepsInGame: PropTypes.number,
    checkGameStatus: PropTypes.func,
    step: PropTypes.func,
    iconsSize: PropTypes.string,
    firstIndex: PropTypes.number,
    secondIndex: PropTypes.number,
    checkRule50x50Field: PropTypes.func,
};

export default Cell;