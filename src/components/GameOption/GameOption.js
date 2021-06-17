import React from 'react';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import {useSelector} from "react-redux";
import {selectField} from "../../features/field/fieldSlice";

function GameOption(props) {
    const field = useSelector(selectField);

    return (
        <>
            <FormControl component="fieldset">
                <FormLabel component="legend">{props.parameters.name}</FormLabel>
                <RadioGroup aria-label={props.parameters.type} name={props.parameters.type}
                            value={props.parameters.value}
                            onChange={props.parameters.onChange}>
                    {
                        props.parameters.list.map((item,idx) => (
                            <FormControlLabel disabled={field.gameIsRunning} key={idx} value={item.value} control={<Radio/>} label={item.label}/>
                        ))
                    }
                </RadioGroup>
            </FormControl>
        </>
    );
}

export default GameOption;