import React, {Component} from "react";
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {MenuItem, Select} from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';


export default class SortingComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dateValue: null,
            sportsValue: [],
            sportsDataSource: this.getSportsData()
        }
    }

    getSportsData = () => {
        let sports = this.props.parentRef.getData().map(value => value.sport);
        return [...new Set(sports)]
    }

    clear = () => {
        this.setState({dateValue: null, sportsValue: []})
    }

    handleSelectChange = (event) => {
        const {
            target: { value },
        } = event;
        this.setState({sportsValue: typeof value === 'string' ? value.split(',') : value}, () => {
            this.props.parentRef.setFilters({
                sportsFilter: this.state.sportsValue
            });
        });
    }

    renderSportsInputValues = (data) => {
        let moreItems = data.length - 1;
        if (data.length > 0) data = data[0];
        if (moreItems > 0) data = `${data}+${moreItems}`
        data = data[0].toUpperCase() + data.slice(1);
        return <span style={{color: 'var(--eversport-color)'}}>{data}</span>
    }

    render() {
        return(
            <div style={{padding: '1%'}}>
                <Select
                    multiple
                    className={'sport-select'}
                    value={this.state.sportsValue}
                    startAdornment={
                        <InputAdornment position="start">
                            <span className={'select-input'}>SPORTS</span>
                        </InputAdornment>
                    }
                    onChange={this.handleSelectChange}
                    renderValue={this.renderSportsInputValues}
                >
                    {
                        this.state.sportsDataSource.map(sport =>
                            <MenuItem value={sport}>{sport[0].toUpperCase() + sport.slice(1)}</MenuItem>)
                    }
                </Select>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        value={this.state.dateValue}
                        onChange={(newValue) => {
                            this.setState({dateValue: newValue}, () => {
                                this.props.parentRef.setFilters({
                                    dateFilter: newValue
                                });
                            });
                        }}
                        renderInput={(params) => {
                            let date = params.inputProps.value
                            date = date && new Date(Date.parse(date));
                            date = date &&
                                (new Intl.DateTimeFormat('en-GB', {weekday: 'short', month: 'short', day: 'numeric'}))
                                    .format(date);
                            params.inputProps.value = date;
                            return <TextField
                                {...params}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <span className={'select-input'}>DATE</span>
                                        </InputAdornment>
                                    ),
                                }}
                                />
                        }}
                    />
                </LocalizationProvider>
            </div>
        )
    }
}