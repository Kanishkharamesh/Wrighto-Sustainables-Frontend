import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faLanguage } from '@fortawesome/free-solid-svg-icons';
import './HomePage.css';
import Header from '../components/Header.jsx';

function HomePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('English');
    const [activeCategory, setActiveCategory] = useState(null);

    const toggleDarkMode = () => setDarkMode(!darkMode);
    const handleSearch = (e) => setSearchTerm(e.target.value);

    const categoryContent = {
        'Disposable Cups & Glasses': {
            description: 'This category includes all products related to single-use cups and glasses.',
            products: [
                'Disposable Plastic Cups 250ml With Lid',
                'Clear Plastic Cup',
                '350 ml PP Injection Cup',
                '250ml Plastic Disposable Cup',
                'Transparent 250ml Disposable Glass',
                'Small Round Transparent Sauce Container 25ml',
            ],
        },
        'Disposable Food Containers': {
            description: 'This category covers all the single-use food storage containers.',
            products: [
                'Milky White Disposable Plastic Food Container 500ml',
                '600 ML Flat PP Disposable Food Container',
                '1000ml Rectangle Plastic Food Container',
                'Rectangle 200ml Disposable Plastic Food Container',
                '750ml Eco-Friendly Meal Box (Biodegradable)',
            ],
        },
        'Reusable Food Containers': {
            description: 'This category includes containers that are durable, reusable, and suitable for meal prep or food delivery.',
            products: [
                '500ml Reusable Rectangle Plastic Containers with Lids – Pack of 25',
                '650ml Black Reusable Food Container with Lid',
            ],
        },
        'Specialty & Small-Scale Containers': {
            description: 'This category is for unique or smaller items like sauce containers and specialty food containers.',
            products: ['Plastic Forth Round Sauce Cups (50ml)'],
        },
    };

    return (
        <div className={`homepage-container ${darkMode ? 'dark-mode' : ''}`}>
            <Header
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
                language={language}
                setLanguage={setLanguage}
            />

            {/* Hero Section */}
            <div className="homepage-hero">
                <h1>Sustainable Solutions for Food Packaging</h1>
                <p>Eco-friendly, recyclable, and durable plastic containers for all your food packaging needs</p>
                <div className="homepage-buttons">
                    <Link to="/product"><button className="homepage-btn">Shop Now</button></Link>
                    <Link to="/about"><button className="homepage-btn secondary">Learn More</button></Link>
                </div>
            </div>

            {/* Search Bar */}
            <div className="homepage-search">
                <input
                    type="text"
                    placeholder="Search by plastic type, size, or color..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <button className="homepage-search-btn">Search</button>
            </div>

            {/* Interactive Categories */}
            <div className="homepage-categories">
                <h2>Explore Categories</h2>
                <div className="categories-grid">
                    {Object.keys(categoryContent).map((category) => (
                        <div
                            key={category}
                            className={`category-card ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </div>
                    ))}
                </div>
                {activeCategory && (
                    <div className="category-content">
                        <h3>{activeCategory}</h3>
                        <p>{categoryContent[activeCategory].description}</p>
                        <ul>
                            {categoryContent[activeCategory].products.map((product, index) => (
                                <li key={index}>{product}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="homepage-featured">
                <h2>Featured Products</h2>
                <div className="featured-grid">
                    {/* Product 1 */}
                    <div className="product-card">
                        <img src="https://neeyog.com/wp-content/uploads/2019/01/C-500ML-FOOD-CONTAINER-B-500x500.jpg" alt="Recyclable Food Container" />
                        <p>Recyclable Food Container</p>
                        <button className="product-btn">
                            <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
                        </button>
                    </div>
                    {/* Product 2 */}
                    <div className="product-card">
                        <img src="https://southplastic.com/wp-content/webp-express/webp-images/uploads/2021/06/SPI-065B_1.jpg.webp" alt="Microwave-Safe Bowl" />
                        <p>Microwave-Safe Bowl</p>
                        <button className="product-btn">
                            <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
                        </button>
                    </div>
                    {/* Product 3 */}
                    <div className="product-card">
                        <img src="https://5.imimg.com/data5/KK/LV/RZ/SELLER-26768775/disposable-plastic-glass.jpg" alt="Transparent Disposable Glass" />
                        <p>Transparent Disposable Glass</p>
                        <button className="product-btn">
                            <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
                        </button>
                    </div>
                </div>
            </div>


            {/* Offers Carousel */}
            <div className="homepage-offers">
                <h2>Special Offers</h2>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://packaginglabph.com/cdn/shop/products/MR650BCLOSE_1200x1200.jpg?v=1611486449"
                            alt="Offer 1"
                            width="1200"  // Set width to 1200px
                            height="400"  // Set height to 400px
                        />
                        <Carousel.Caption>
                            <h3>Buy 1 Get 1 Free</h3>
                            <p>Don't miss out on this amazing offer!</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://5.imimg.com/data5/SELLER/Default/2023/10/350092542/RI/TJ/UJ/185375504/hinged-sauce-cups.jpg"
                            alt="Offer 2"
                            width="1200"  // Set width to 1200px
                            height="400"  // Set height to 400px
                        />
                        <Carousel.Caption>
                            <h3>20% Off on All Products</h3>
                            <p>Use code ECO20 at checkout.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>


            {/* Customer Testimonials */}
            <div className="homepage-testimonials">
                <h2>Customer Testimonials</h2>
                <div className="testimonials-slider">
                    <p>"The best eco-friendly containers I've ever used!"</p>
                    <p>"Durable and safe for all food types—highly recommended!"</p>
                </div>
            </div>

            {/* Blog Teaser */}
            <div className="homepage-blog" id="blog">
                <h2>Read Our Blog</h2>
                <div className="blog-preview">
                    <div className="blog-card">
                        <img src="https://www.allcountyrecycling.com/blog/admin/uploads/2022/recycle_7.jpg" alt="Blog" />
                        <h3>5 Ways to Recycle Food Packaging at Home</h3>
                        <p>Learn practical tips on recycling...</p>
                        <button className="blog-btn">Read More</button>
                    </div>
                    <div className="blog-card">
                        <img src="https://one-more-tree.org/wp-content/uploads/2024/01/wooden-miniature-house-green-leaf-plug-surge-protector-ecofriendly-electricity-your-home-1-870x563.jpg" alt="Blog" />
                        <h3>Eco-Friendly Living Simplified</h3>
                        <p>Discover easy steps for sustainable living...</p>
                        <button className="blog-btn">Read More</button>
                    </div>
                </div>
            </div>


            {/* Impact Counter with Animation */}
            <div className="homepage-impact">
                <h2>Our Sustainability Impact</h2>
                <p>Waste Reduced: <span className="count-up">1,234 kg</span></p>
                <p>Containers Recycled: <span className="count-up">1 Million</span></p>
            </div>

            {/* Countdown Timer for Special Offer */}
            <div className="countdown-timer">
                <h3>Special Offer - Ends In:</h3>
                <div id="countdown"></div>
            </div>

            {/* Sticky Announcement Bar */}
            <div className="sticky-announcement">
                <p>New Arrivals! Check out our latest eco-friendly products!</p>
            </div>

            {/* Newsletter Signup */}
            <div className="homepage-newsletter">
                <h2>Stay Connected</h2>
                <p>Subscribe to our newsletter for updates and offers.</p>
                <div className="newsletter-form">
                    <input type="email" placeholder="Enter your email" />
                    <button className="newsletter-btn">Subscribe</button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;