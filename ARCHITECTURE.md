# Architecture SOLID - KAMA

## Vue d'ensemble

Ce projet a été refactorisé pour respecter les principes SOLID et adopter une architecture en couches propre et maintenable.

## Structure de l'architecture

```
src/
├── domain/                    # Couche Domaine (Business Logic)
│   ├── entities/              # Entités métier
│   │   ├── Listing.ts         # Modèle de domaine Listing
│   │   └── User.ts            # Modèle de domaine User
│   └── repositories/          # Interfaces des repositories
│       ├── IListingRepository.ts
│       └── IAuthRepository.ts
│
├── infrastructure/             # Couche Infrastructure (Implémentations)
│   └── repositories/          # Implémentations concrètes
│       ├── SupabaseListingRepository.ts
│       └── SupabaseAuthRepository.ts
│
├── application/               # Couche Application (Use Cases)
│   └── services/              # Services applicatifs
│       ├── ListingService.ts  # Logique métier pour les listings
│       └── AuthService.ts     # Logique métier pour l'authentification
│
└── presentation/              # Couche Présentation (UI)
    ├── contexts/              # Contextes React (Injection de dépendances)
    │   └── ServiceContext.tsx
    └── hooks/                 # Hooks personnalisés
        ├── useListings.ts     # Hooks pour la gestion des listings
        └── useAuth.ts         # Hooks pour l'authentification
```

## Principes SOLID appliqués

### 1. Single Responsibility Principle (SRP)
- **Domain** : Contient uniquement les modèles métier et interfaces
- **Infrastructure** : Implémente les détails techniques (Supabase, HTTP)
- **Application** : Contient la logique métier pure
- **Presentation** : Gère uniquement l'affichage et l'interaction utilisateur

### 2. Open/Closed Principle (OCP)
- Les interfaces (`IListingRepository`, `IAuthRepository`) permettent d'étendre les fonctionnalités sans modifier le code existant
- On peut ajouter de nouvelles implémentations (ex: `MockListingRepository`) sans toucher aux services applicatifs

### 3. Liskov Substitution Principle (LSP)
- Toute implémentation d'un repository peut être substituée à l'interface sans casser le code
- `SupabaseListingRepository` peut être remplacé par `MockListingRepository` sans impact

### 4. Interface Segregation Principle (ISP)
- Les interfaces sont spécifiques et ne forcent pas l'implémentation de méthodes inutiles
- `IListingRepository` et `IAuthRepository` sont séparées selon leurs responsabilités

### 5. Dependency Inversion Principle (DIP)
- Les couches supérieures (Application, Presentation) dépendent d'abstractions (interfaces)
- Les détails d'implémentation (Infrastructure) implémentent ces abstractions
- L'injection de dépendances se fait via `ServiceContext`

## Flux de données

```
User Action (Component)
    ↓
Hook (useListings, useAuth)
    ↓
Service (ListingService, AuthService)
    ↓
Repository Interface (IListingRepository, IAuthRepository)
    ↓
Repository Implementation (SupabaseListingRepository, SupabaseAuthRepository)
    ↓
External API (Supabase)
```

## Avantages de cette architecture

1. **Testabilité** : Facile de créer des mocks pour les tests
2. **Maintenabilité** : Code organisé et séparé par responsabilités
3. **Extensibilité** : Facile d'ajouter de nouvelles fonctionnalités
4. **Flexibilité** : Peut changer d'implémentation (ex: passer de Supabase à Firebase) sans modifier le code métier
5. **Réutilisabilité** : Les services et hooks peuvent être réutilisés dans différents composants

## Exemple d'utilisation

### Dans un composant

```tsx
import { useListings } from '../../presentation/hooks/useListings';
import { useAuth } from '../../presentation/hooks/useAuth';

function MyComponent() {
  const { listings, loading } = useListings();
  const { user, signIn } = useAuth();
  
  // Utilisation simple et propre
}
```

### Ajout d'une nouvelle implémentation

Pour ajouter un repository mock pour les tests :

```tsx
class MockListingRepository implements IListingRepository {
  async getAll(): Promise<Listing[]> {
    return MOCK_DATA;
  }
  // ... autres méthodes
}

// Dans App.tsx
const listingRepository = new MockListingRepository(); // Facile à changer
```

## Migration depuis l'ancienne architecture

L'ancienne architecture avait :
- ❌ Logique métier dans les composants
- ❌ Appels API directs dans les pages
- ❌ Dépendances directes vers Supabase
- ❌ Pas de séparation des responsabilités

La nouvelle architecture :
- ✅ Logique métier dans les services
- ✅ Hooks pour encapsuler la logique de récupération
- ✅ Injection de dépendances via Context
- ✅ Séparation claire des responsabilités
