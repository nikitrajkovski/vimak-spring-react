import Counter from '../common/counter'
import ProductDescription from './productDescription'
import './productItem.css'
import trashImage from './trash-can.png'

export default function ProductItem({name,type,winary,price}){
    return(
        <div className='product-item-wrapper'>
            <ProductDescription name={name} type={type} winary={winary}></ProductDescription>
            <Counter></Counter>
            <p>${price}</p>
            <img src={trashImage} className='trash-styling'></img>
        </div>
    )
}