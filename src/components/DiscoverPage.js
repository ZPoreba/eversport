import React, {Component}  from "react";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import DataService from '../services/DataService';
import Chip from '@mui/material/Chip';
import {renderStarsIndicator} from "./StarsIndicator";
import FilterComponent from "./FilterComponent";
import SortingComponent from "./SortingComponent";
import {Divider} from "@mui/material";


export default class DiscoverPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.parseData(DataService.getData()),
            fromPriceFilter: undefined,
            toPriceFilter: undefined,
            reviewsFilter: undefined,
            dateFilter: undefined,
            sportsFilter: undefined,
            filtersOn: false
        }
        this.sortingRef = React.createRef();
    }

    getData = () => {
        return this.state.data;
    }

    setFilters = (data) => {
        this.setState(data);
    }

    parseData = (data) => {
        return data.map(value => {
            value.startTime = new Date(Date.parse(value.startTime))
            value.endTime = new Date(Date.parse(value.endTime))
            return value
        })
    }

    renderSpotsAndDate = (data) => {
        return (
            <div style={{display: 'flex'}} >
                <div style={{marginRight: 15}}>Open spots: <strong>{data.slotsOpen} out of {data.slotsTotal}</strong></div>
                <div>Start date: <strong>{
                    (new Intl.DateTimeFormat('en-GB', {weekday: 'short', month: 'short', day: 'numeric'}))
                        .format(data.startTime)
                }</strong>
                </div>
            </div>
        )
    }

    renderSportAndReviews = (data) => {
        return (
            <div style={{display: 'flex'}} >
                <Chip size="small" label={data.sport[0].toUpperCase() + data.sport.slice(1)} style={{marginRight: 15}} />
                <div>
                    {renderStarsIndicator(data.rating)} ({data.ratings} Reviews)
                </div>
            </div>
        )
    }

    renderVenueDetails = (data) => {
        return (
            <div style={{display: 'flex'}} >
                <div>
                    Venue:
                </div>
                <img
                    src={data.venuePictureUrl}
                    alt="venue-img"
                    className={'venue-picture-img'}
                />
                <div>
                    {data.venueName}
                </div>
            </div>
        )
    }

    checkFilters = (data) => {
        let startTime = new Date(Date.parse(data.startTime));
        startTime.setHours(0, 0, 0, 0);
        let dateFilter = this.state.dateFilter;
        if (dateFilter) dateFilter.setHours(0, 0, 0, 0);

        return (
            (!this.state.fromPriceFilter || this.state.fromPriceFilter <= data.fromPrice)
            && (!this.state.toPriceFilter || this.state.toPriceFilter >= data.fromPrice)
            && (!this.state.reviewsFilter || this.state.reviewsFilter <= data.rating)
            && (!dateFilter || dateFilter.getTime() === startTime.getTime())
            && (!this.state.sportsFilter || !this.state.sportsFilter.length
                || this.state.sportsFilter.includes(data.sport))
        )
    }

    renderCard = (data) => {
        if (this.checkFilters(data))
            return (
                <Card sx={{display: 'flex'}} key={data.uuid}>
                    <img
                        src={data.pictureUrl}
                        alt="sport-img"
                        width={150}
                        height={150}
                        style={{margin: 15}}
                    />
                    <Box style={{width: '100%'}}>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {data.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {this.renderSpotsAndDate(data)}
                                {this.renderSportAndReviews(data)}
                                {this.renderVenueDetails(data)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <div className={'location-div'}>
                                {data.isOnline ?
                                    <div style={{float: 'left'}}>
                                        <img style={{filter: 'invert(50%)'}} src={'/icons/live.svg'} width={11}/>
                                        <span>Online</span>
                                    </div>:
                                    <div style={{float: 'left'}}>
                                        <img style={{filter: 'invert(50%)'}} src={'/icons/location.svg'} width={11}/>
                                        <span>{data.street}, {data.zip} {data.city}</span>
                                    </div>

                                }
                                <div style={{float: 'right'}}>
                                    From: {data.fromPrice} {data.currencySymbol}
                                </div>
                            </div>
                        </CardActions>
                    </Box>
                </Card>
            )
    }

    render() {
        let width = window.innerWidth;
        let filterClass = this.state.flitersOn ? 'full-screen-div': 'full-screen-div-none';
        let cardClass = this.state.flitersOn ? 'full-screen-div-none': 'full-screen-div';

        if (width >= 800) {
            let filterClass = '';
            let cardClass = '';
        }
        return(
            <React.Fragment>
                <div className={`filter-component-div ${filterClass}`}>
                    {width >= 800 && <img src={'/images/eversport-logo.png'} className={'eversport-logo'}/>}
                    <span>
                        <FilterComponent parentRef={this}/>
                        {
                            width < 800 &&
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => {this.setState({flitersOn: false})}}
                                style={{margin: 5, border: 'none', borderColor: 'lightgray', float: 'right'}}>
                                <img style={{filter: 'invert(50%)'}} src={'/icons/chevron-left.svg'} width={20}/>
                            </Button>
                        }
                    </span>
                </div>
                <div className={cardClass}>
                    {width < 800 && <img src={'/images/eversport-logo.png'} className={'eversport-logo'}/>}
                    <div style={{display: 'flex'}}>
                        {
                            width < 800 &&
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => {this.setState({flitersOn: true})}}
                                style={{margin: 5, borderRadius: '50%', borderColor: 'lightgray'}}>
                                <img style={{filter: 'invert(50%)'}} src={'/icons/search.svg'} width={20}/>
                            </Button>
                        }
                        <SortingComponent ref={this.sortingRef} parentRef={this} />
                    </div>
                    <Divider />
                    <div style={{padding: '1%', marginBottom: '1%'}}>
                        <h2><strong>Yoga in Wien: Yoga studios & Yoga courses at a glance </strong></h2>
                        <span style={{color: 'grey'}}>
                            The best Yoga studios in Wien at a glance: Find and compare Yoga studios near you. Click on one of
                            the Yoga studios to find all information about the studio's offer and book your net Yoga session
                            quickly and easily online.
                        </span>
                    </div>
                    <div className={'main-card-grid'}>
                    {
                        this.state.data.map(cardData => this.renderCard(cardData))
                    }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}