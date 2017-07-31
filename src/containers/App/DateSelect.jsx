import React, {Component, PropTypes} from 'react';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';


const DateSelect = ({handleChange, values, handleApply})=>{
    let months = [], years = [];
    /* of course we can use for, it's just for fun  */
    function loopYear(start, end, akk=[]){
        if(start < (end-1)){
            start++;
            akk.push(start.toString());
            return loopYear(start, end, akk);
        }
        return akk;
    }
    /*generates range in beetween of start and end */
    years = ["Select "].concat(loopYear(2006, 2017));
    months = ["Select "].concat(loopYear(0, 13));

    const style = {
        margin: 12,
        position:"relative",
        bottom:"20px"
    };
    console.log(values);
    return <Paper style={{margin:'10px'}}>
        <SelectField onChange={(event, index, value)=>handleChange(event, index, value, 'year')} style={{ margin:"10px"}} floatingLabelText="Year" value={values.year}>
            {
                years.map((el, i)=><MenuItem key={i} value={el} primaryText={`${el} Year`} />)
            }
        </SelectField>
        <SelectField disabled={(values.year == "Select " || values.year == "")} onChange={(event, index, value)=>handleChange(event, index, value, 'month')} style={{ margin:"10px"}} floatingLabelText="Month" value={values.month}>
            {
                months.map((el, i)=><MenuItem key={i} value={el} primaryText={`${el} Month`} />)
            }
        </SelectField>
        <RaisedButton onTouchTap={handleApply} label="Apply" primary={true} style={style} />
    </Paper>
}

export default DateSelect;

