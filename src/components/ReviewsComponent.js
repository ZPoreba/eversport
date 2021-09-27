import React, {Component} from "react";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {renderStarsIndicator} from "./StarsIndicator";

export default class ReviewsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: undefined
        }
    }

    clear = () => {
        this.setState({value: undefined});
    }

    handleRadioChange = (_, newValue) => {
        newValue = parseInt(newValue);
        this.setState({value: newValue}, () => {
            this.props.parentRef.setFilters({
                reviewsFilter: newValue,
            });
        });
    }

    render () {
        return(
            <FormControl component="fieldset">
                <RadioGroup
                    name="radio-buttons-group"
                    onChange={this.handleRadioChange}
                    value={this.state.value}
                >
                    <FormControlLabel
                        value={1}
                        checked={this.state.value === 1}
                        control={<Radio className={'filter-content'} />}
                        label={<span className={'filter-content'}>{renderStarsIndicator(1)} & Up</span>}
                    />
                    <FormControlLabel
                        value={2}
                        checked={this.state.value === 2}
                        control={<Radio className={'filter-content'} />}
                        label={<span className={'filter-content'}>{renderStarsIndicator(2)} & Up</span>}
                    />
                    <FormControlLabel
                        value={3}
                        checked={this.state.value === 3}
                        control={<Radio className={'filter-content'} />}
                        label={<span className={'filter-content'}>{renderStarsIndicator(3)} & Up</span>}
                    />
                    <FormControlLabel
                        value={4}
                        checked={this.state.value === 4}
                        control={<Radio className={'filter-content'} />}
                        label={<span className={'filter-content'}>{renderStarsIndicator(4)} & Up</span>}
                    />
                </RadioGroup>
            </FormControl>
        )
    }
}
