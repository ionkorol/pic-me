export interface UserProp {
  id: string;
  name: string;
  email: string;
  totalPoints: number;
  categories: {
    [key: string]: {
      points: number;
      location: {
        latitude: number;
        longitude: number;
      };
    };
  };
}

export interface CategoryProp {
  name: string;
  color: string;
  icon: string;
  points?: number;
  id: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}
