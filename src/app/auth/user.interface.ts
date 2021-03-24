export interface User {
  email: string;
  password: string;
  name: string;
  address: {
    streetName: string;
    houseNumber: number;
    postcode: string;
    city: string;
  };
  phone: string;
}
