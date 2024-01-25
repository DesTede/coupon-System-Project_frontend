import "./CouponCard.css";
import {Card, CardContent} from "@mui/material";


interface CouponProps{
    title: string,
    price: number,
    imageUrl: string
}
function CouponCard(props:CouponProps): JSX.Element {
    
    
    return (
        <div className="CouponCard">
			<Card>
                <CardContent>
                    <h3>{props.title}</h3>
                    <img src={props.imageUrl} alt=""/><br/>
                    $ {props.price}
                </CardContent>
            </Card>
                
        </div>
    );
}

export default CouponCard;
