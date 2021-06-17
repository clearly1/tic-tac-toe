import React, {useEffect, useState} from 'react';
import styles from './FieldStyles.module.sass'
import {useSelector} from "react-redux";
import {selectOptions} from "../../features/options/optionsSlice";
import Cell from "../Cell/Cell";
import GameResultWindow from "../GameResultWindow/GameResultWindow";
import remove from "lodash/remove"

function Field() {

    const options = useSelector(selectOptions);
    const [game, setGame] = useState(() => {
        let arr = [];
        if (options.format === '3x3') {
            for (let i = 0; i < 3; i++) {
                arr[i] = [];
                for (let j = 0; j < 3; j++) {
                    arr[i][j] = 0;
                }
            }
        } else {
            for (let i = 0; i < 50; i++) {
                arr[i] = [];
                for (let j = 0; j < 50; j++) {
                    arr[i][j] = 0;
                }
            }
        }
        return arr;
    });
    const [freeCellsForComputerIn50x50, setFreeCellsForComputerIn50x50] = useState([]);
    const [freeCellsForComputerIn3x3, setFreeCellsForComputerIn3x3] = useState(() => {
            let tmpArr = [];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    tmpArr.push([i, j])
                }
            }
            return tmpArr;
        }
    );
    const [isNextCrossStep, setIsNextCrossStep] = useState(true);
    const [gameResult, setGameResult] = useState(null);
    const [countStepsInGame, setCountStepsInGame] = useState(() => {
        if (options.format === '3x3') {
            return 3 * 3;
        }
        return 50 * 50;
    });
    const [iconsSize] = useState(() => {
        if (options.format === '3x3') {
            return '100px'
        }
        return '10px'
    });
    const [cellsToWinCount] = useState(() => {
        if (options.format === '3x3') {
            return 3;
        }
        return 5;
    });
    const [maxIJ] = useState(() => {
        if (options.format === '3x3') {
            return 2
        }
        return 49
    });

    useEffect(() => {
        if (gameResult === null) {
            if (countStepsInGame === 0) {
                setGameResult(`Ничья`)
            }
        }
    }, [countStepsInGame]);

    useEffect(() => {
        if (options.mode !== 'PvP' && gameResult === null && countStepsInGame > 0) {
            if (options.firstStep === 'Player' || options.mode === 'CvC') {
                if (!isNextCrossStep) {
                    //computer step in CvC or PvC mode
                    setTimeout(() => {
                        if (options.format === '50x50') {
                            makeComputerStep(freeCellsForComputerIn50x50,'o');
                        } else {
                            makeComputerStep(freeCellsForComputerIn3x3,'o');
                        }
                    }, 1000);
                } else if (options.mode === 'CvC') {
                    //computer step in CvC mode
                    setTimeout(() => {
                        if (options.format === '50x50') {
                            if (countStepsInGame === 2500) {
                                makeFirstComputerStepIn50x50('x');
                            } else {
                                makeComputerStep(freeCellsForComputerIn50x50,'x');
                            }
                        } else {
                            makeComputerStep(freeCellsForComputerIn3x3,'x');
                        }
                    }, 1000);
                }
            } else {
                if (isNextCrossStep) {
                    //computer step in PvC mode
                    setTimeout(() => {
                        if (options.format === '50x50') {
                            if (countStepsInGame === 2500) {
                                makeFirstComputerStepIn50x50('x');
                            } else {
                                makeComputerStep(freeCellsForComputerIn50x50,'x');
                            }
                        } else {
                            makeComputerStep(freeCellsForComputerIn3x3,'x');
                        }
                    }, 1000);
                }
            }

        }
    }, [countStepsInGame]);

    const makeComputerStep = (freeCells, stepItem) => {
        let rndInt = Math.floor(Math.random() * (freeCells.length - 1));
        step(stepItem, freeCells[rndInt][0], freeCells[rndInt][1]);
        checkGameStatus(stepItem, freeCells[rndInt][0], freeCells[rndInt][1]);
    };
    const makeFirstComputerStepIn50x50 = (stepItem) => {
        let i = Math.floor(Math.random() * 49);
        let j = Math.floor(Math.random() * 49);
        step(stepItem, i, j);
        checkGameStatus(stepItem, i, j);
    };

    const step = (whoseStep, firstIndex, secondIndex) => {

        let tmp = [...game];
        let rowTmp = tmp[firstIndex];
        rowTmp[secondIndex] = whoseStep;
        tmp[firstIndex] = rowTmp;
        setGame(tmp);
        if (options.format === '50x50' && options.mode !== 'PvP') {
            let tmpArr = [];
            if (firstIndex - 1 >= 0) {
                if ([...game[firstIndex - 1]][secondIndex] === 0) {
                    tmpArr.push([firstIndex - 1, secondIndex])
                }
            }
            if (firstIndex + 1 <= maxIJ) {
                if ([...game[firstIndex + 1]][secondIndex] === 0) {
                    tmpArr.push([firstIndex + 1, secondIndex])
                }
            }
            if (secondIndex + 1 <= maxIJ) {
                if ([...game[firstIndex]][secondIndex + 1] === 0) {
                    tmpArr.push([firstIndex, secondIndex + 1])
                }
            }
            if (secondIndex - 1 >= 0) {
                if ([...game[firstIndex]][secondIndex - 1] === 0) {
                    tmpArr.push([firstIndex, secondIndex - 1])
                }
            }
            if (!(firstIndex - 1 < 0 || secondIndex - 1 < 0)) {
                if ([...game[firstIndex - 1]][secondIndex - 1] === 0) {
                    tmpArr.push([firstIndex - 1, secondIndex - 1])
                }
            }
            if (!(firstIndex + 1 > maxIJ || secondIndex + 1 > maxIJ)) {
                if ([...game[firstIndex + 1]][secondIndex + 1] === 0) {
                    tmpArr.push([firstIndex + 1, secondIndex + 1])
                }
            }
            if (!(firstIndex - 1 < 0 || secondIndex + 1 > maxIJ)) {
                if ([...game[firstIndex - 1]][secondIndex + 1] === 0) {
                    tmpArr.push([firstIndex - 1, secondIndex + 1])
                }
            }
            if (!(secondIndex - 1 < 0 || firstIndex + 1 > maxIJ)) {
                if ([...game[firstIndex + 1]][secondIndex - 1] === 0) {
                    tmpArr.push([firstIndex + 1, secondIndex - 1])
                }
            }
            tmpArr = [tmpArr, freeCellsForComputerIn50x50].flat();
            remove(tmpArr, (coordinates) => coordinates.toString() === [firstIndex, secondIndex].toString());
            setFreeCellsForComputerIn50x50(tmpArr);
        } else if (options.format === '3x3' && options.mode !== 'PvP') {
            let tmpArr = [...freeCellsForComputerIn3x3];
            remove(tmpArr, (coordinates) => coordinates.toString() === [firstIndex, secondIndex].toString());
            setFreeCellsForComputerIn3x3(tmpArr);
        }
        setIsNextCrossStep(!isNextCrossStep);
    };

    const checkLines = (valueCell, winCellsCount, firstIndex, secondIndex) => {
        let topCount = 0;
        let bottomCount = 0;
        let rightCount = 0;
        let leftCount = 0;
        for (let i = 1; i < winCellsCount; i++) {
            if (firstIndex - i < 0) {
                break;
            } else {
                if ([...game[firstIndex - i]][secondIndex] === valueCell) {
                    topCount++;
                } else {
                    break;
                }
            }
        }
        for (let i = 1; i < winCellsCount; i++) {
            if (firstIndex + i > maxIJ) {
                break;
            } else {
                if ([...game[firstIndex + i]][secondIndex] === valueCell) {
                    bottomCount++;
                } else {
                    break;
                }
            }
        }
        for (let i = 1; i < winCellsCount; i++) {
            if (secondIndex + i > maxIJ) {
                break;
            } else {
                if ([...game[firstIndex]][secondIndex + i] === valueCell) {
                    rightCount++;
                } else {
                    break;
                }
            }
        }
        for (let i = 1; i < winCellsCount; i++) {
            if (secondIndex - i < 0) {
                break;
            } else {
                if ([...game[firstIndex]][secondIndex - i] === valueCell) {
                    leftCount++;
                } else {
                    break;
                }
            }
        }

        return topCount + bottomCount === winCellsCount - 1 || rightCount + leftCount === winCellsCount - 1;
    };

    const checkDiagonal = (valueCell, winCellsCount, firstIndex, secondIndex) => {
        let topLeftCount = 0;
        let bottomRightCount = 0;
        let topRightCount = 0;
        let bottomLeftCount = 0;
        for (let i = 1; i < winCellsCount; i++) {
            if (firstIndex - i < 0 || secondIndex - i < 0) {
                break;
            } else {
                if ([...game[firstIndex - i]][secondIndex - i] === valueCell) {
                    topLeftCount++;
                } else {
                    break;
                }
            }
        }
        for (let i = 1; i < winCellsCount; i++) {
            if (firstIndex + i > maxIJ || secondIndex + i > maxIJ) {
                break;
            } else {
                if ([...game[firstIndex + i]][secondIndex + i] === valueCell) {
                    bottomRightCount++;
                } else {
                    break;
                }
            }
        }
        for (let i = 1; i < winCellsCount; i++) {
            if (firstIndex - i < 0 || secondIndex + i > maxIJ) {
                break;
            } else {
                if ([...game[firstIndex - i]][secondIndex + i] === valueCell) {
                    topRightCount++;
                } else {
                    break;
                }
            }
        }
        for (let i = 1; i < winCellsCount; i++) {
            if (secondIndex - i < 0 || firstIndex + i > maxIJ) {
                break;
            } else {
                if ([...game[firstIndex + i]][secondIndex - i] === valueCell) {
                    bottomLeftCount++;
                } else {
                    break;
                }
            }
        }

        return topLeftCount + bottomRightCount === winCellsCount - 1 || topRightCount + bottomLeftCount === winCellsCount - 1;
    };

    const checkRule50x50Field = (firstIndex, secondIndex) => {
        if (firstIndex - 1 >= 0) {
            if ([...game[firstIndex - 1]][secondIndex] !== 0) {
                return true
            }
        }
        if (firstIndex + 1 <= maxIJ) {
            if ([...game[firstIndex + 1]][secondIndex] !== 0) {
                return true
            }
        }
        if (secondIndex + 1 <= maxIJ) {
            if ([...game[firstIndex]][secondIndex + 1] !== 0) {
                return true
            }
        }
        if (secondIndex - 1 >= 0) {
            if ([...game[firstIndex]][secondIndex - 1] !== 0) {
                return true
            }
        }
        if (!(firstIndex - 1 < 0 || secondIndex - 1 < 0)) {
            if ([...game[firstIndex - 1]][secondIndex - 1] !== 0) {
                return true
            }
        }
        if (!(firstIndex + 1 > maxIJ || secondIndex + 1 > maxIJ)) {
            if ([...game[firstIndex + 1]][secondIndex + 1] !== 0) {
                return true
            }
        }
        if (!(firstIndex - 1 < 0 || secondIndex + 1 > maxIJ)) {
            if ([...game[firstIndex - 1]][secondIndex + 1] !== 0) {
                return true
            }
        }
        if (!(secondIndex - 1 < 0 || firstIndex + 1 > maxIJ)) {
            if ([...game[firstIndex + 1]][secondIndex - 1] !== 0) {
                return true
            }
        }
        return false
    };

    const checkGameStatus = (whoseStep, firstIndex, secondIndex) => {
        if (checkLines(whoseStep, cellsToWinCount, firstIndex, secondIndex) || checkDiagonal(whoseStep, cellsToWinCount, firstIndex, secondIndex)) {
            setGameResult('Победа');
        } else {
            setCountStepsInGame(countStepsInGame - 1);
        }
    };

    return (
        <>
            <div className={styles.fieldContainer}>
                {
                    game.map((item, index) => (
                        <div className={styles.flexRow} key={index}>
                            {
                                item.map((value, idx) => (
                                    <Cell key={idx} setCountStepsInGame={setCountStepsInGame} step={step} value={value}
                                          firstIndex={index} secondIndex={idx} checkGameStatus={checkGameStatus}
                                          countStepsInGame={countStepsInGame}
                                          iconsSize={iconsSize} isNextCrossStep={isNextCrossStep}
                                          checkRule50x50Field={checkRule50x50Field}/>
                                ))
                            }
                        </div>
                    ))
                }
                {
                    gameResult !== null && <GameResultWindow gameResult={gameResult} isNextCrossStep={isNextCrossStep}/>
                }
            </div>
        </>
    );
}

export default Field;