import './productDescription.css'
export default function ProductDescription({name,type,winary}){
    return(
        <div className='product-description-styling'>
            <img></img>
            <div>
                <p className='title'>Name: {name}</p>
                <div className="inner-content-styling">
                    <p>Type: {type}</p>
                    <p>{winary}</p>
                </div>
            </div>
        </div>
    )
}