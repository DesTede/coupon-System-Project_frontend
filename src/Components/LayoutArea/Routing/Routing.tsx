import "./Routing.css";
import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "../../MainArea/HomePage/HomePage";
import Coupons from "../../CouponArea/Coupons/Coupons";
import Login from "../../AuthArea/Login/Login";
import NotFound from "../NotFound/NotFound";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path={"home"} element={<HomePage/>} />
                <Route path={"login"} element={<Login/>}/>
                <Route/>
                <Route path={"coupons"} element={<Coupons/>}/>
                <Route/>
                <Route/>
                <Route/>
                <Route/>
                <Route/>
                <Route/>
                <Route/>
                <Route/>
                <Route/>
                <Route path={"/"} element={<Navigate to={"home"}/> }/>
                <Route path={"*"} element={<NotFound/>} />
            </Routes>
        </div>
    );
}

export default Routing;
