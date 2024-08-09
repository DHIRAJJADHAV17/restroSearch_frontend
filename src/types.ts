export type Admin = {
  name: string;
  email: string;
  password: string;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};
export type ReviewItem = {
  _id: string;
  name: string;
  about: string;
  rating: number;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  discription: string;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  review: ReviewItem[];
};
