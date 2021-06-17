import './App.css';
import React from "react";
import Options from "./components/Options/Options";
import Field from "./components/Field/Field";
import {useDispatch, useSelector} from "react-redux";
import {changeGameIsRunningOption, selectField} from "./features/field/fieldSlice";
import Button from "@material-ui/core/Button";

function App() {

    const field = useSelector(selectField);
    const dispatch = useDispatch();

    return (
        <div className="App">
            <Options/>
            <div className="gameField">
                {
                    field.gameIsRunning ?
                        <Field/>
                        :
                        <Button variant="contained" color="secondary" size="large" onClick={()=>dispatch(changeGameIsRunningOption())}>
                            Начать игру
                        </Button>
                }
            </div>


        </div>
    );
}

export default App;
