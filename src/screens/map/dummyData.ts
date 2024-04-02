export type Restaurant = {
  latitude: number;
  longitude: number;
  title: string;
  description: string;
  rate: number;
  openAt: string;
  closeAt: string;
};

export const dummyRestaurants: Restaurant[] = [
  {
    latitude: 10.776889,
    longitude: 106.700806,
    title: 'The Lotus Pond',
    description: 'Delicious Vietnamese cuisine in a cozy atmosphere.',
    rate: 4.5,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.777889,
    longitude: 106.701806,
    title: 'Roma Cucina',
    description: 'Authentic Italian pasta with a modern twist.',
    rate: 4.0,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.778889,
    longitude: 106.702806,
    title: 'Sakura Sushi',
    description: 'The best sushi and Japanese dishes in town.',
    rate: 4.7,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.779889,
    longitude: 106.703806,
    title: 'Le Petit Croissant',
    description: 'A delightful French bakery offering fresh pastries.',
    rate: 4.3,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.780889,
    longitude: 106.704806,
    title: 'Bean There Done That',
    description: 'Cozy café with the best coffee and homemade cakes.',
    rate: 4.8,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.781889,
    longitude: 106.705806,
    title: 'Taco Libre',
    description: 'Traditional Mexican tacos and margaritas.',
    rate: 4.2,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.782889,
    longitude: 106.706806,
    title: 'Green Sprout',
    description: 'Vegan-friendly options with a modern twist.',
    rate: 4.6,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.783889,
    longitude: 106.707806,
    title: "Ocean's Bounty",
    description: 'Exquisite seafood dishes by the waterfront.',
    rate: 4.9,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.784889,
    longitude: 106.708806,
    title: 'Skyline Eats',
    description: 'Luxury dining experience with a panoramic city view.',
    rate: 4.4,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.785889,
    longitude: 106.709806,
    title: 'Family Feast',
    description: 'Family-friendly restaurant with a play area for kids.',
    rate: 4.1,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.786889,
    longitude: 106.710806,
    title: 'Fusion Fantasia',
    description: "Award-winning chef's innovative fusion cuisine.",
    rate: 4.7,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.787889,
    longitude: 106.711806,
    title: 'Brunch & Munch',
    description: 'All-day brunch spot with organic ingredients.',
    rate: 4.0,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.788889,
    longitude: 106.712806,
    title: 'Burgers & Brews',
    description: 'Local craft beers and gourmet burgers.',
    rate: 4.5,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.789889,
    longitude: 106.713806,
    title: 'The Prime Rib',
    description: 'Steakhouse featuring prime cuts and fine wines.',
    rate: 4.8,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.790889,
    longitude: 106.714806,
    title: 'Trattoria Bella',
    description: 'Rustic Italian trattoria with a charming ambiance.',
    rate: 4.3,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.791889,
    longitude: 106.715806,
    title: 'Grill & Chill',
    description: 'Outdoor BBQ and grill with live music on weekends.',
    rate: 4.6,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.792889,
    longitude: 106.716806,
    title: 'Cocktail Corner',
    description: 'Signature cocktails and small plates in a trendy bar.',
    rate: 4.2,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.793889,
    longitude: 106.717806,
    title: 'Thai Spice',
    description: 'Authentic Thai cuisine with a modern decor.',
    rate: 4.7,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  {
    latitude: 10.794889,
    longitude: 106.718806,
    title: 'City View Terrace',
    description: 'Indoor and outdoor seating with panoramic views of the city.',
    rate: 4.9,
    openAt: '8:00 AM',
    closeAt: '10:00 PM',
  },
  //   {
  //     latitude: 10.795889,
  //     longitude: 106.719806,
  //     title: 'The Vineyard',
  //     description: 'Fine dining with an extensive wine selection.',
  //     rate: 4.8,
  //     openAt: '8:00 AM',
  //     closeAt: '10:00 PM',
  //   },
];

export const currPosition = {
  latitude: 10.795889,
  longitude: 106.719806,
};

export const regionDelta = {
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121,
};