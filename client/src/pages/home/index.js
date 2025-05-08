import { MdLocationOn, MdSearch,MdArrowForward } from 'react-icons/md';
import "./index.css";
import Navbar from '../../components/navbar';
import FoodItems from '../../components/foodItems';
import Footer from '../../components/footer';
import Restaurants from '../../components/restaurants';

const Home = () => {

    
    return (
        <div>
            <Navbar />
            <div className="swiggy-container">
                <section className="swiggy-hero">
                    <div className="hero-text">
                        <h1>Order food & groceries. Discover best restaurants</h1>
                        <div className="search-section">
                            <div className="input-container">
                                <MdLocationOn className="input-icon" />
                                <input type="text" placeholder="Enter your delivery location" />
                            </div>
                            <div className="input-container">
                                <MdSearch className="input-icon" />
                                <input type="text" placeholder="Search for restaurant, item or more" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="swiggy-services">
                    <div className="service-card">
                        <h3 className="service-card-heading">Seamless Order Management</h3>
                        <p className="service-card-descreption">OrderSwift allows users to create, view, and manage orders in a centralized dashboard</p>
                        <MdArrowForward className="arrow-icon" />
                    </div>
                    <div className="service-card">
                        <h3 className="service-card-heading">Customer-Centric Dashboard</h3>
                        <p className="service-card-descreption">Customer information is tied to every order, giving businesses quick access to contact details, order history</p>
                        <MdArrowForward className="arrow-icon" />
                    </div>
                    <div className="service-card">
                        <h3 className="service-card-heading"> Insightful Analytics & Reports</h3>
                        <p className="service-card-descreption">Gain visibility into your operations with data-driven insights</p>
                        <MdArrowForward className="arrow-icon" />
                    </div>
                    <div className="service-card">
                        <h3 className="service-card-heading"> Secure and Scalable Infrastructure</h3>
                        <p className="service-card-descreption">OrderSwift ensures your data is secure and the platform can scale with your growth.</p>
                        <MdArrowForward className="arrow-icon" />
                    </div>
                </section>
            </div>
            <FoodItems />
            <Restaurants />
            <Footer />
        </div >
    )
}
export default Home;