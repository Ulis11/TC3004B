export const GifItem = ({ title, url, id }) => {
    return (
        <div className='card'>
            <h5> {title} </h5>
            <h6> {id} </h6>
            <img src={url} alt={title} />
        </div>
    )
}