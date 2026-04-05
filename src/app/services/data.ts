
import { Listing } from '../components/FeaturedListingCard';

// Images from Unsplash
const IMG_VILLA = 'https://images.unsplash.com/photo-1760067537255-64d36262cb0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjB2aWxsYSUyMHRyb3BpY2FsJTIwZXh0ZXJpb3IlMjBzd2ltbWluZyUyMHBvb2x8ZW58MXx8fHwxNzcxMDIxNzM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
const IMG_APT = 'https://images.unsplash.com/photo-1766513997564-8c5396f17716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb20lMjBvY2VhbiUyMHZpZXd8ZW58MXx8fHwxNzcxMDIxNzM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
const IMG_HOUSE = 'https://images.unsplash.com/photo-1762117360944-82ad090fffb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMHRyb3BpY2FsJTIwYXJjaGl0ZWN0dXJlJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzcxMDIxNzM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
const IMG_OFFICE = 'https://images.unsplash.com/photo-1768544582207-9238e7a3874b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZyUyMGV4dGVyaW9yJTIwZ2xhc3MlMjBmYWNhZGV8ZW58MXx8fHwxNzcxMDIxNzM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
const IMG_SUV = 'https://images.unsplash.com/photo-1763016940383-3be9417637a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzdXYlMjBjYXIlMjBmcm9udCUyMHZpZXd8ZW58MXx8fHwxNzcxMDIxNzM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
const IMG_LAND = 'https://images.unsplash.com/photo-1769258958976-8852440011b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGxhbmRzY2FwZSUyMG5hdHVyZSUyMGxhbmQlMjBwbG90fGVufDF8fHx8MTc3MTAyMTczNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

const HOST_SARAH = {
  name: 'Sarah M.',
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
  joined: 'Jan 2023',
  verified: true
};

const HOST_KAMA = {
  name: 'KAMA Agency',
  image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop',
  joined: 'Dec 2022',
  verified: true
};

const COMMON_AMENITIES = ['Wifi Fibre', 'Climatisation', 'Parking', 'Sécurité 24/7'];

export const MOCK_LISTINGS: any[] = [
  {
    id: '1',
    type: 'Villa',
    title: 'Villa Océane Premium',
    price: 2500000,
    location: 'La Sablière, Libreville',
    beds: 5,
    baths: 4,
    area: 450,
    image: IMG_VILLA,
    isPremium: true,
    has3D: true,
    isNew: true,
    rating: 4.9,
    reviews: 24,
    host: HOST_SARAH,
    description: "Découvrez cette magnifique villa située dans le quartier prisé de La Sablière. Avec sa vue imprenable sur l'océan, sa piscine à débordement et ses finitions haut de gamme, elle offre un cadre de vie exceptionnel. Idéale pour les familles ou les cadres en mission.",
    amenities: [...COMMON_AMENITIES, 'Piscine', 'Jardin', 'Cuisine équipée', 'Groupe électrogène'],
    images: [IMG_VILLA, IMG_APT, IMG_HOUSE, IMG_OFFICE]
  },
  {
    id: '2',
    type: 'Appartement',
    title: 'Appartement Vue Mer',
    price: 850000,
    location: 'Centre-Ville, Port-Gentil',
    beds: 3,
    baths: 2,
    area: 120,
    image: IMG_APT,
    isNew: true,
    rating: 4.7,
    reviews: 12,
    host: HOST_KAMA,
    description: "Superbe appartement moderne au cœur de Port-Gentil. Profitez d'une vue mer panoramique et d'un accès immédiat aux commodités. Immeuble sécurisé avec ascenseur et parking souterrain.",
    amenities: [...COMMON_AMENITIES, 'Ascenseur', 'Balcon', 'Salle de sport'],
    images: [IMG_APT, IMG_VILLA, IMG_HOUSE]
  },
  {
    id: '3',
    type: 'Maison',
    title: 'Maison Familiale Moderne',
    price: 650000,
    location: 'Akanda, Libreville',
    beds: 4,
    baths: 3,
    area: 200,
    image: IMG_HOUSE,
    rating: 4.5,
    reviews: 8,
    host: HOST_SARAH,
    description: "Maison neuve à Akanda, parfaite pour une famille. Quartier calme et sécurisé, proche des écoles et commerces. Grand jardin et terrasse couverte.",
    amenities: [...COMMON_AMENITIES, 'Jardin', 'Garage', 'Buanderie'],
    images: [IMG_HOUSE, IMG_VILLA, IMG_APT]
  },
  {
    id: '4',
    type: 'Bureau',
    title: 'Bureaux Open Space',
    price: 1200000,
    location: 'Boulevard Triomphal, LBV',
    beds: 0,
    baths: 2,
    area: 150,
    image: IMG_OFFICE,
    isPremium: true,
    rating: 4.8,
    reviews: 5,
    host: HOST_KAMA,
    description: "Espace de bureaux moderne et lumineux sur le Boulevard Triomphal. Configuration open space modulable. Fibre optique dédiée et services de réception inclus.",
    amenities: ['Wifi Fibre', 'Climatisation', 'Sécurité 24/7', 'Ascenseur', 'Parking', 'Salle de réunion'],
    images: [IMG_OFFICE, IMG_APT, IMG_VILLA]
  },
  {
    id: '5',
    type: 'Véhicule',
    title: 'Range Rover Sport 2024',
    price: 150000,
    location: 'Location Journalière',
    beds: 0,
    baths: 0,
    area: 0,
    image: IMG_SUV,
    isPremium: true,
    rating: 5.0,
    reviews: 3,
    host: HOST_KAMA,
    description: "Louez ce SUV de luxe pour vos déplacements professionnels ou privés. Confort absolu et prestige garanti. Chauffeur disponible sur demande.",
    amenities: ['Climatisation', 'GPS', 'Bluetooth', 'Sièges cuir', 'Assurance tous risques'],
    images: [IMG_SUV, IMG_OFFICE, IMG_VILLA]
  },
  {
    id: '6',
    type: 'Terrain',
    title: 'Terrain Constructible',
    price: 45000000,
    location: 'Nkok, Zone Économique',
    beds: 0,
    baths: 0,
    area: 1000,
    image: IMG_LAND,
    rating: 4.2,
    reviews: 1,
    host: HOST_SARAH,
    description: "Grand terrain plat et viabilisé dans la zone de Nkok. Idéal pour projet industriel ou résidentiel. Titre foncier disponible.",
    amenities: ['Eau', 'Électricité', 'Route bitumée'],
    images: [IMG_LAND, IMG_HOUSE, IMG_VILLA]
  },
  {
    id: '7',
    type: 'Appartement',
    title: 'Penthouse de Luxe',
    price: 3000000,
    location: 'Batterie 4, Libreville',
    beds: 4,
    baths: 4,
    area: 300,
    image: 'https://images.unsplash.com/photo-1512918760532-3edbed7174ce?w=800&h=600&fit=crop',
    isPremium: true,
    has3D: true,
    rating: 4.9,
    reviews: 15,
    host: HOST_KAMA,
    description: "Le summum du luxe à Libreville. Penthouse avec terrasse panoramique sur le toit. Prestations hôtelières incluses.",
    amenities: [...COMMON_AMENITIES, 'Piscine privée', 'Jacuzzi', 'Salle de sport', 'Conciergerie'],
    images: ['https://images.unsplash.com/photo-1512918760532-3edbed7174ce?w=800&h=600&fit=crop', IMG_VILLA, IMG_APT]
  },
  {
    id: '8',
    type: 'Villa',
    title: 'Villa avec Piscine',
    price: 1800000,
    location: 'Owendo, Libreville',
    beds: 4,
    baths: 3,
    area: 250,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop',
    rating: 4.6,
    reviews: 10,
    host: HOST_SARAH,
    description: "Belle villa spacieuse avec piscine à Owendo. Quartier résidentiel calme.",
    amenities: [...COMMON_AMENITIES, 'Piscine', 'Garage', 'Barbecue'],
    images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop', IMG_HOUSE, IMG_VILLA]
  }
];

export const getListings = async (): Promise<any[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_LISTINGS;
};
