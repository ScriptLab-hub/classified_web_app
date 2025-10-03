export const categories = [
  { category_id: 1, name: 'Cars', slug: 'cars', icon_url: 'https://via.placeholder.com/16?text=Car' },
  { category_id: 2, name: 'Computers', slug: 'computers', icon_url: 'https://via.placeholder.com/16?text=Computer' },
  { category_id: 3, name: 'Property', slug: 'property', icon_url: 'https://via.placeholder.com/16?text=Property' },
];

export const users = [
  { user_id: 1, username: 'Ali Khan' },
  { user_id: 2, username: 'Sara Ahmed' },
  { user_id: 3, username: 'Imran Malik' },
  { user_id: 4, username: 'Zainab Raza' },
  { user_id: 5, username: 'Hassan Butt' },
];

export const locations = [
  { location_id: 1, city: 'Lahore', country: 'Pakistan' },
  { location_id: 2, city: 'Karachi', country: 'Pakistan' },
  { location_id: 3, city: 'Islamabad', country: 'Pakistan' },
];

export const ads = [
  // Cars (category_id: 1)
  { ad_id: 1, user_id: 1, category_id: 1, location_id: 1, title: 'Toyota Corolla 2018', description: 'Well-maintained car in Lahore', price: 2000000.00, image_url: 'https://via.placeholder.com/280x200?text=Car1', alt: 'Toyota Corolla ad', status: 'active', fake_contact: '0300-1234567' },
  { ad_id: 2, user_id: 2, category_id: 1, location_id: 2, title: 'Honda Civic 2020', description: 'Low mileage, Karachi', price: 2500000.00, image_url: 'https://via.placeholder.com/280x200?text=Car2', alt: 'Honda Civic ad', status: 'active', fake_contact: '0311-9876543' },
  { ad_id: 7, user_id: 3, category_id: 1, location_id: 3, title: 'Suzuki Alto 2021', description: 'Fuel-efficient, Islamabad', price: 1500000.00, image_url: 'https://via.placeholder.com/280x200?text=Car3', alt: 'Suzuki Alto ad', status: 'active', fake_contact: '0322-1112223' },
  { ad_id: 8, user_id: 4, category_id: 1, location_id: 1, title: 'Toyota Fortuner 2022', description: 'Top condition, Lahore', price: 8000000.00, image_url: 'https://via.placeholder.com/280x200?text=Car4', alt: 'Toyota Fortuner ad', status: 'active', fake_contact: '0333-2223334' },
  { ad_id: 9, user_id: 5, category_id: 1, location_id: 2, title: 'Honda City 2019', description: 'Single owner, Karachi', price: 2200000.00, image_url: 'https://via.placeholder.com/280x200?text=Car5', alt: 'Honda City ad', status: 'active', fake_contact: '0344-3334445' },
  { ad_id: 10, user_id: 1, category_id: 1, location_id: 3, title: 'Hyundai Tucson 2020', description: 'Fully loaded, Islamabad', price: 6000000.00, image_url: 'https://via.placeholder.com/280x200?text=Car6', alt: 'Hyundai Tucson ad', status: 'active', fake_contact: '0355-4445556' },
  { ad_id: 11, user_id: 2, category_id: 1, location_id: 1, title: 'Kia Sportage 2021', description: 'Like new, Lahore', price: 6500000.00, image_url: 'https://via.placeholder.com/280x200?text=Car7', alt: 'Kia Sportage ad', status: 'active', fake_contact: '0301-5556667' },
  { ad_id: 12, user_id: 3, category_id: 1, location_id: 2, title: 'Toyota Yaris 2020', description: 'Low mileage, Karachi', price: 2800000.00, image_url: 'https://via.placeholder.com/280x200?text=Car8', alt: 'Toyota Yaris ad', status: 'active', fake_contact: '0312-6667778' },
  { ad_id: 13, user_id: 4, category_id: 1, location_id: 3, title: 'Suzuki Swift 2022', description: 'Excellent condition, Islamabad', price: 2300000.00, image_url: 'https://via.placeholder.com/280x200?text=Car9', alt: 'Suzuki Swift ad', status: 'active', fake_contact: '0323-7778889' },
  { ad_id: 14, user_id: 5, category_id: 1, location_id: 1, title: 'Honda BR-V 2019', description: 'Family SUV, Lahore', price: 3500000.00, image_url: 'https://via.placeholder.com/280x200?text=Car10', alt: 'Honda BR-V ad', status: 'active', fake_contact: '0334-8889990' },
  // Computers (category_id: 2)
  { ad_id: 3, user_id: 3, category_id: 2, location_id: 1, title: 'Dell XPS 13', description: 'Like new, 16GB RAM, Lahore', price: 120000.00, image_url: 'https://via.placeholder.com/280x200?text=Computer1', alt: 'Dell XPS ad', status: 'active', fake_contact: '0322-5556667' },
  { ad_id: 4, user_id: 1, category_id: 2, location_id: 3, title: 'MacBook Pro 2021', description: 'M1 chip, Islamabad', price: 180000.00, image_url: 'https://via.placeholder.com/280x200?text=Computer2', alt: 'MacBook Pro ad', status: 'active', fake_contact: '0333-4445556' },
  { ad_id: 15, user_id: 2, category_id: 2, location_id: 2, title: 'HP Spectre x360', description: 'Convertible, Karachi', price: 140000.00, image_url: 'https://via.placeholder.com/280x200?text=Computer3', alt: 'HP Spectre ad', status: 'active', fake_contact: '0344-9991112' },
  { ad_id: 16, user_id: 4, category_id: 2, location_id: 1, title: 'Lenovo ThinkPad X1', description: 'Business laptop, Lahore', price: 110000.00, image_url: 'https://via.placeholder.com/280x200?text=Computer4', alt: 'Lenovo ThinkPad ad', status: 'active', fake_contact: '0355-1112223' },
  { ad_id: 17, user_id: 5, category_id: 2, location_id: 3, title: 'Asus ROG Zephyrus', description: 'Gaming laptop, Islamabad', price: 200000.00, image_url: 'https://via.placeholder.com/280x200?text=Computer5', alt: 'Asus ROG ad', status: 'active', fake_contact: '0300-2223334' },
  { ad_id: 18, user_id: 1, category_id: 2, location_id: 2, title: 'Acer Predator Helios', description: 'High performance, Karachi', price: 190000.00, image_url: 'https://via.placeholder.com/280x200?text=Computer6', alt: 'Acer Predator ad', status: 'active', fake_contact: '0311-3334445' },
  { ad_id: 19, user_id: 2, category_id: 2, location_id: 1, title: 'Surface Pro 7', description: 'Lightweight, Lahore', price: 130000.00, image_url: 'https://via.placeholder.com/280x200?text=Computer7', alt: 'Surface Pro ad', status: 'active', fake_contact: '0322-4445556' },
  { ad_id: 20, user_id: 3, category_id: 2, location_id: 3, title: 'Dell Inspiron 15', description: 'Budget laptop, Islamabad', price: 90000.00, image_url: 'https://via.placeholder.com/280x200?text=Computer8', alt: 'Dell Inspiron ad', status: 'active', fake_contact: '0333-5556667' },
  { ad_id: 21, user_id: 4, category_id: 2, location_id: 2, title: 'MacBook Air M2', description: 'Brand new, Karachi', price: 220000.00, image_url: 'https://via.placeholder.com/280x200?text=Computer9', alt: 'MacBook Air ad', status: 'active', fake_contact: '0344-6667778' },
  { ad_id: 22, user_id: 5, category_id: 2, location_id: 1, title: 'HP Pavilion 15', description: 'Reliable, Lahore', price: 100000.00, image_url: 'https://via.placeholder.com/280x200?text=Computer10', alt: 'HP Pavilion ad', status: 'active', fake_contact: '0355-7778889' },
  // Property (category_id: 3)
  { ad_id: 5, user_id: 2, category_id: 3, location_id: 2, title: '3-Bedroom Flat in Karachi', description: 'Sea-facing apartment', price: 15000000.00, image_url: 'https://via.placeholder.com/280x200?text=Property1', alt: 'Karachi flat ad', status: 'active', fake_contact: '0344-7778889' },
  { ad_id: 6, user_id: 3, category_id: 3, location_id: 1, title: 'House in Lahore DHA', description: '5-bedroom house, prime location', price: 30000000.00, image_url: 'https://via.placeholder.com/280x200?text=Property2', alt: 'Lahore house ad', status: 'active', fake_contact: '0355-9990001' },
  { ad_id: 23, user_id: 4, category_id: 3, location_id: 3, title: 'Apartment in Islamabad', description: 'Modern 2-bedroom, Islamabad', price: 12000000.00, image_url: 'https://via.placeholder.com/280x200?text=Property3', alt: 'Islamabad apartment ad', status: 'active', fake_contact: '0300-8889990' },
  { ad_id: 24, user_id: 5, category_id: 3, location_id: 1, title: 'Villa in Lahore', description: 'Luxury villa, Lahore', price: 50000000.00, image_url: 'https://via.placeholder.com/280x200?text=Property4', alt: 'Lahore villa ad', status: 'active', fake_contact: '0311-9991112' },
  { ad_id: 25, user_id: 1, category_id: 3, location_id: 2, title: 'Plot in Karachi', description: '500 sq yd plot, prime area', price: 25000000.00, image_url: 'https://via.placeholder.com/280x200?text=Property5', alt: 'Karachi plot ad', status: 'active', fake_contact: '0322-1112223' },
  { ad_id: 26, user_id: 2, category_id: 3, location_id: 3, title: 'Farmhouse in Islamabad', description: 'Spacious farmhouse, Islamabad', price: 40000000.00, image_url: 'https://via.placeholder.com/280x200?text=Property6', alt: 'Islamabad farmhouse ad', status: 'active', fake_contact: '0333-2223334' },
  { ad_id: 27, user_id: 3, category_id: 3, location_id: 1, title: '2-Bedroom Flat in Lahore', description: 'Affordable flat, Lahore', price: 8000000.00, image_url: 'https://via.placeholder.com/280x200?text=Property7', alt: 'Lahore flat ad', status: 'active', fake_contact: '0344-3334445' },
  { ad_id: 28, user_id: 4, category_id: 3, location_id: 2, title: 'Penthouse in Karachi', description: 'Luxury penthouse, Karachi', price: 35000000.00, image_url: 'https://via.placeholder.com/280x200?text=Property8', alt: 'Karachi penthouse ad', status: 'active', fake_contact: '0355-4445556' },
  { ad_id: 29, user_id: 5, category_id: 3, location_id: 3, title: 'House in Bahria Town', description: 'Modern house, Islamabad', price: 20000000.00, image_url: 'https://via.placeholder.com/280x200?text=Property9', alt: 'Bahria Town house ad', status: 'active', fake_contact: '0300-5556667' },
  { ad_id: 30, user_id: 1, category_id: 3, location_id: 1, title: 'Commercial Plot in Lahore', description: 'Prime location plot', price: 60000000.00, image_url: 'https://via.placeholder.com/280x200?text=Property10', alt: 'Lahore plot ad', status: 'active', fake_contact: '0311-6667778' },
];

export const promotions = [
  {
    id: 1,
    title: 'Sell Your Car Fast!',
    description: 'List your car today and reach millions.',
    image: 'https://via.placeholder.com/1920x400?text=Car+Promo',
    alt: 'Car promotion banner',
    ctaText: 'List Now',
    ctaAction: 'sell-car',
  },
  {
    id: 2,
    title: 'Exclusive iPhone Deals',
    description: 'Find the best prices on iPhones in Pakistan.',
    image: 'https://via.placeholder.com/1920x400?text=iPhone+Promo',
    alt: 'iPhone promotion banner',
    ctaText: 'Shop Now',
    ctaAction: 'shop-iphones',
  },
  {
    id: 3,
    title: 'Rent Your Dream Home',
    description: 'Top properties available in Lahore & Karachi.',
    image: 'https://via.placeholder.com/1920x400?text=Property+Promo',
    alt: 'Property promotion banner',
    ctaText: 'Browse Homes',
    ctaAction: 'browse-properties',
  },
];