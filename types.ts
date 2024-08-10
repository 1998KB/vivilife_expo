export interface Activites {
  activites: Activity[];
}
export interface Activity {
  id: number;
  imageUri: string;
  date: string;
  time: string;
  title: string;
  description: string;
  price: number;
  location: string;
  peopleBooked: number;
  liked: boolean;
  wishlist: boolean;
  booked: boolean;
  distance: number;
  furtherInformation: string;
  deck: boolean;
}

export interface ActivitySwipingProps {
  imageUri: string;
  date: string;
  time: string;
  title: string;
  description?: string;
  price?: number;
  location?: string;
  peopleBooked?: number;
  liked?: boolean;
  booked?: boolean;
}

export interface ActivityLikedCardProps {
  imageUri: string;
  time: string;
  date: string;
  distance: string;
  price: string;
  peopleBooked: number;
}

export interface IconProps {
  color: string;
}
export interface TabBarIcons {
  [key: string]: (props: IconProps) => React.ReactNode;
}
