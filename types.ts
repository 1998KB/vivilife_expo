export interface Activites {
  activites: Activity[];
}
export interface Activity {
  id: string;
  imageUrl: string;
  dateTime: string;
  title: string;
  description: string;
  price: number;
  location: string;
  peopleBooked: number;
  liked: boolean;
  booked: boolean;
  furtherInformations: string;
  deck: boolean;
  distance?: number;
  geocode: {
    latitude: number;
    longitude: number;
  };
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
