import { User } from './user.interface';

export const Users: User[] = [
  {
    email: 'tom@tombee.io',
    password: 'YoullNeverGuessThis',
    name: 'Tom Bee',
    address: {
      streetName: 'Hacker Strasse',
      houseNumber: '2',
      postcode: '41541',
      city: 'Dormagen',
    },
    phone: '+49 178 7355085',
  },
  {
    email: 'obiwan@jedi.temple',
    password: 'HighGround',
    name: 'Obi Wan Kenobi',
    address: {
      streetName: 'Jedi Temple',
      houseNumber: '1',
      postcode: '00001',
      city: 'Coruscant',
    },
    phone: '+49 123 4567890',
  },
];
