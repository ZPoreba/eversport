export function renderStarsIndicator(activeStars){
    return (
        <span className={'filter-content'}>
            {
                Array(5).fill('').map((_, index) => {
                    let starStyle = (index+1) <= activeStars ? 'active-star': 'inactive-star';
                    return <span className={`radio-label ${starStyle}`}>
                            <img key={index} src={'/icons/star.svg'} width={11}/>
                        </span>
                })
            }
        </span>
    )
}
