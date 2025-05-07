import { MdLocationOn, MdSearch,MdArrowForward } from 'react-icons/md';
import "./index.css";
import Navbar from '../../components/navbar';

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
                        {/* <span>UPTO 60% OFF</span> */}
                        <MdArrowForward className="arrow-icon" />
                    </div>
                    <div className="service-card">
                        <h3 className="service-card-heading">Customer-Centric Dashboard</h3>
                        <p className="service-card-descreption">Customer information is tied to every order, giving businesses quick access to contact details, order history</p>
                        {/* <span>UPTO 60% OFF</span> */}
                        <MdArrowForward className="arrow-icon" />
                    </div>
                    <div className="service-card">
                        <h3 className="service-card-heading"> Insightful Analytics & Reports</h3>
                        <p className="service-card-descreption">Gain visibility into your operations with data-driven insights</p>
                        {/* <span>UPTO 50% OFF</span> */}
                        <MdArrowForward className="arrow-icon" />
                    </div>
                    <div className="service-card">
                        <h3 className="service-card-heading"> Secure and Scalable Infrastructure</h3>
                        <p className="service-card-descreption">OrderSwift ensures your data is secure and the platform can scale with your growth.</p>
                        <MdArrowForward className="arrow-icon" />
                    </div>
                </section>
            </div>
            <section className="food-category-section">
                <div className="food-category-grid">
                    <div className="food-card">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbxqC_eDXGPvfrmpMQIVaKWbqXaBzwrO7nSBYJ84tyfiXiIew614wlRYY&s" alt="Biryani" />
                        <p className="food-label">Biryani</p>
                    </div>
                    <div className="food-card">
                        <img src="https://media.istockphoto.com/id/621836658/photo/pizza-neapolitana-on-white-background.jpg?s=612x612&w=0&k=20&c=qZ5hfTBy4gtbcN6To8Mh6fwuidFeqoN6OackNnJXH_g=" alt="Pizza" />
                        <p className="food-label">Pizza</p>
                    </div>
                    <div className="food-card">
                        <img src="https://media.istockphoto.com/id/511484502/photo/double-cheese-and-bacon-cheeseburger.jpg?s=612x612&w=0&k=20&c=aJkQqm34Gv-UDJSX3bBNfHpV3W740ft3bITVJvS-5PM=" alt="Burger" />
                        <p className="food-label">Burger</p>
                    </div>
                    <div className="food-card">
                        <img src="https://media.istockphoto.com/id/174774088/photo/pork-souvlaki-wrap.jpg?s=612x612&w=0&k=20&c=sFjUYp__Ww80y9wj1dA5MmzCF4CgYSAUhTmLcxA71SU=" alt="Shawarma" />
                        <p className="food-label">Shawarma</p>
                    </div>
                    <div className="food-card">
                        <img src="https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Cake" />
                        <p className="food-label">Cake</p>
                    </div>
                    <div className="food-card">
                        <img src="https://media.istockphoto.com/id/1136006564/photo/vanilla-and-chocolate-sundaes-isolated-on-a-white-background.jpg?s=612x612&w=0&k=20&c=XaZo3aopn_SWTXH3dNVxw5v79zi3cI8MX4LbtO7dn9s=" alt="Ice Cream" />
                        <p className="food-label">Ice Cream</p>
                    </div>
                </div>
                <div className="food-category-grid1">
                    <div className="food-card">
                        <img src="https://cdn.pixabay.com/photo/2024/04/17/07/00/ai-generated-8701491_1280.png" alt=""/>
                        <p className="food-label">Kebab</p>
                    </div>
                    <div className="food-card">
                        <img src="https://media.istockphoto.com/id/1420303371/photo/misal-pav-or-usal-paav-is-famous-maharashtrian-spiced-street-dish-buns-are-served-with-spicy.jpg?s=612x612&w=0&k=20&c=vIbx6BpzW0oMPRn_6AdjKv2VdoUuZcOklcNHoitZlfs=" alt=""/>
                        <p className="food-label">Pav Bhaji</p>
                    </div>
                    <div className="food-card">
                        <img src="https://media.istockphoto.com/id/1430067912/photo/veg-steam-momo-nepalese-traditional-dish-momo-stuffed-with-vegetables-and-then-cooked-and.jpg?s=612x612&w=0&k=20&c=k7jSDjtOEF5pmv4HnMpBusVFLjmPfVQadsPiQI3FiYQ=" alt=""/>
                        <p className="food-label">Momo</p>
                    </div>
                    <div className="food-card">
                        <img src="https://cdn.pixabay.com/photo/2018/03/15/12/16/food-3228057_640.jpg" alt=""/>
                        <p className="food-label">Rolls</p>
                    </div>
                    <div className="food-card">
                        <img src="https://media.istockphoto.com/id/481149282/photo/south-indian-food.jpg?s=612x612&w=0&k=20&c=w43naq0743XDvzCi5FW_ROvzw4_KaCkuam16sfy3hTc=" alt=""/>
                        <p className="food-label">South Indian</p>
                    </div>
                    <div className="food-card">
                        <img src="https://media.istockphoto.com/id/176111461/photo/shell-pasta-alfredo-with-lobster-meat.jpg?s=1024x1024&w=is&k=20&c=_eAgSH_sy6uLbiaRFyvR8dXq6kod89UVGzYMSnRep7E=" alt=""/>
                        <p className="food-label">Pasta</p>
                    </div>
                </div>
            </section>

        </div >
    )
}
export default Home;