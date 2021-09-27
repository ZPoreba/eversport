import React, {Component} from "react";
import {Grid, OutlinedInput , InputLabel, Slider, SliderThumb} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';

function AirbnbThumbComponent(props) {
    const { children, ...other } = props;
    let img_src = other['data-index'] ? '/icons/chevron-left.svg': '/icons/chevron-right.svg';
    return (
        <SliderThumb {...other}>
            {children}
            <img src={img_src} width={8}/>
        </SliderThumb>
    );
}

const AirbnbSlider = styled(Slider)(({ theme }) => ({
    color: '#3a8589',
    height: 3,
    padding: '13px 0',
    '& .MuiSlider-thumb': {
        height: 27,
        width: 27,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        '&:hover': {
            boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
        },
        '& .airbnb-bar': {
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    '& .MuiSlider-track': {
        height: 3,
    },
    '& .MuiSlider-rail': {
        color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
        opacity: theme.palette.mode === 'dark' ? undefined : 1,
        height: 3,
    },
}));

export default class PriceRangeComponent extends Component {

    constructor(props) {
        super(props);
        let maxValue = this.getData();
        this.state = {
            leftValue: 0,
            rightValue: maxValue,
            maxValue: maxValue
        }
    }

    clear = () => {
        this.setState({leftValue: 0, rightValue: this.state.maxValue});
    }

    getData = () => {
        let prices = this.props.parentRef.getData().map(value => value.fromPrice);
        return Math.max(...prices);
    }

    handleInputChange = (event) => {
        let side = event.target.offsetParent.classList.contains('right-thumb') ? 'right': 'left';
        let newState = {};
        newState[`${side}Value`] = event.target.value === '' ? 0: Number(event.target.value);
        this.setState(newState, this.setParentValue);
    };

    setParentValue = () => {
        this.props.parentRef.setFilters({
            fromPriceFilter: this.state.leftValue,
            toPriceFilter: this.state.rightValue
        });
    }

    handleBlur = () => {
        if (this.state.leftValue < 0 || this.state.rightValue < this.state.leftValue) {
            this.setState({leftValue: 0}, this.setParentValue);
        } else if (this.state.leftValue > this.state.maxValue) {
            this.setState({leftValue: this.state.maxValue}, this.setParentValue);
        }

        if (this.state.rightValue < 0) {
            this.setState({rightValue: 0}, this.setParentValue);
        } else if (this.state.rightValue > this.state.maxValue || this.state.rightValue < this.state.leftValue) {
            this.setState({rightValue: this.state.maxValue}, this.setParentValue);
        }
    };

    handleSliderChange = (_, newValue) => {
        this.setState({
            leftValue: newValue[0],
            rightValue: newValue[1]
        }, () => {
            this.props.parentRef.setFilters({
                fromPriceFilter: this.state.leftValue,
                toPriceFilter: this.state.rightValue !== this.state.maxValue ? this.state.rightValue: undefined
            });
        });
    };

    render() {
        return(
            <React.Fragment>
                <AirbnbSlider
                    components={{ Thumb: AirbnbThumbComponent }}
                    getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                    defaultValue={[20, 40]}
                    value={
                        [
                            typeof this.state.leftValue === 'number' ? this.state.leftValue : 0,
                            typeof this.state.rightValue === 'number' ? this.state.rightValue : this.state.maxValue
                        ]
                    }
                    min={0}
                    max={this.state.maxValue}
                    onChange={this.handleSliderChange}
                    disableSwap
                />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <InputLabel style={{textAlign: 'center', fontSize: '0.9rem'}}>From</InputLabel>
                        <OutlinedInput
                            className={'left-thumb'}
                            value={this.state.leftValue}
                            size="small"
                            onChange={this.handleInputChange}
                            onBlur={this.handleBlur}
                            style={{width: '120%'}}
                            endAdornment={
                                <InputAdornment position="end">
                                    <img style={{filter: 'invert(50%)'}} src={'/icons/euro.svg'} width={10}/>
                                </InputAdornment>
                            }
                            inputProps={{
                                step: 10,
                                min: 0,
                                max: this.state.maxValue,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel style={{textAlign: 'center', fontSize: '0.9rem'}}>To</InputLabel>
                        <OutlinedInput
                            className={'right-thumb'}
                            value={this.state.rightValue}
                            size="small"
                            onChange={this.handleInputChange}
                            onBlur={this.handleBlur}
                            style={{width: '120%'}}
                            endAdornment={
                                <InputAdornment position="end">
                                    <img style={{filter: 'invert(50%)'}} src={'/icons/euro.svg'} width={10}/>
                                </InputAdornment>
                            }
                            inputProps={{
                                step: 10,
                                min: 0,
                                max: this.state.maxValue,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}