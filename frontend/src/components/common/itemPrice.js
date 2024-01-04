import './itemPrice.css'
export default function ItemPrice(props){
    const{name,price}=props
    return(
        <div className="item-wrapper">
        <p className='name-style'>{name}</p>
        <p className='price-style'>${price}</p>
    </div>
    )
}