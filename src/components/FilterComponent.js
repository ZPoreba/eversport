import React, {Component}  from "react";
import PriceRangeComponent from "./PriceRangeComponent";
import {Divider} from "@mui/material";
import ReviewsComponent from "./ReviewsComponent";

export default class FilterComponent extends Component {

    priceRangeRef = React.createRef();
    reviewsRef = React.createRef();

    clearFilters = () => {
        this.props.parentRef.setFilters({
            fromPriceFilter: undefined,
            toPriceFilter: undefined,
            reviewsFilter: undefined,
            dateFilter: undefined,
            sportsFilter: undefined
        });

        this.priceRangeRef.current.clear();
        this.reviewsRef.current.clear();
        this.props.parentRef.sortingRef.current.clear();
    }

    render () {
        let filters = this.props.parentRef.state;
        return(
            <React.Fragment>
                <div style={{padding: '10%'}}>
                    <div className={'filter-label'}>
                        FILTERS
                    </div>
                    <ul className={'filter-list'}>
                    {
                        filters.fromPriceFilter ?
                        <li className={'filter-content'}>from {filters.fromPriceFilter} euros</li>: ''
                    }
                    {
                        filters.toPriceFilter ?
                            <li className={'filter-content'}>to {filters.toPriceFilter} euros</li>: ''
                    }
                    {
                        filters.reviewsFilter ?
                            <li className={'filter-content'}>{filters.reviewsFilter} & Up</li>: ''
                    }
                    {
                        filters.dateFilter ?
                            <li className={'filter-content'}>
                                starts {
                                    (new Intl.DateTimeFormat('en-GB', {
                                        weekday: 'short',
                                        month: 'short',
                                        day: 'numeric'
                                    }))
                                        .format(filters.dateFilter)
                                }
                            </li>: ''
                    }
                    {
                        filters.sportsFilter ?
                            <li className={'filter-content'}>
                                {filters.sportsFilter.join(', ')}
                            </li>: ''
                    }
                    </ul>
                    <div style={{color: 'var(--eversport-color)'}} className={'filter-content'}>
                        <a onClick={this.clearFilters}>Clear all</a>
                    </div>
                </div>
                <div style={{padding: '10%'}}>
                    <div className={'filter-label'}>
                        PRICE RANGE
                    </div>
                    <PriceRangeComponent ref={this.priceRangeRef} parentRef={this.props.parentRef} />
                </div>
                <Divider />
                <div style={{padding: '10%'}}>
                    <div className={'filter-label'}>
                        REVIEWS
                    </div>
                    <ReviewsComponent ref={this.reviewsRef} parentRef={this.props.parentRef} />
                </div>
            </React.Fragment>
        )
    }
}
