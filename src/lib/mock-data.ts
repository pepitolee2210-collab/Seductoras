// ═══ TIERS ═══
export type Tier = "vip" | "pro" | "basic";

export const TIER_CONFIG = {
  vip: { label: "VIP", color: "badge-vip", maxPhotos: "Ilimitadas", maxVideos: "Ilimitados", stories: true, priority: 1, price: "$49.99/mes" },
  pro: { label: "PRO", color: "badge-pro", maxPhotos: "15", maxVideos: "5", stories: false, priority: 2, price: "$24.99/mes" },
  basic: { label: "BASIC", color: "badge-basic", maxPhotos: "5", maxVideos: "1", stories: false, priority: 3, price: "Gratis" },
} as const;

// ═══ ESCORTS ═══
export const MOCK_ESCORTS = [
  { id: "1", username: "valentina.escort", name: "Valentina", age: 23, city: "Medellín", zone: "El Poblado", tier: "vip" as Tier, isVerified: true, isOnline: true, rating: 4.9, reviews: 47, price: 350000, currency: "COP", phone: "+57 350 2088355", bio: "Modelo profesional, elegante y discreta. Servicio VIP en zonas exclusivas de Medellín. Atención personalizada.", height: 168, weight: 55, measurements: "90-60-90", hairColor: "Negra", skinColor: "Trigueña", languages: ["Español", "English"], services: ["Acompañante", "Cenas", "Viajes", "Hotel", "Domicilio"], schedule: "24 horas", photosCount: 24, videosCount: 5, viewsCount: 12450, storiesActive: 3 },
  { id: "2", username: "camila.hot", name: "Camila", age: 21, city: "Medellín", zone: "Laureles", tier: "vip" as Tier, isVerified: true, isOnline: false, rating: 4.8, reviews: 32, price: 300000, currency: "COP", phone: "+57 312 4567890", bio: "Universitaria atrevida y divertida. Me encanta complacer y hacer que pases un rato inolvidable.", height: 165, weight: 52, measurements: "88-58-92", hairColor: "Castaña", skinColor: "Blanca", languages: ["Español"], services: ["Acompañante", "Hotel", "Domicilio", "Fiestas"], schedule: "10AM - 12AM", photosCount: 18, videosCount: 3, viewsCount: 8930, storiesActive: 2 },
  { id: "3", username: "isabella.premium", name: "Isabella", age: 25, city: "Medellín", zone: "El Poblado", tier: "vip" as Tier, isVerified: true, isOnline: true, rating: 5.0, reviews: 63, price: 450000, currency: "COP", phone: "+57 318 9876543", bio: "Experiencia de lujo. Ex-modelo fitness con clase y sofisticación. Solo clientes selectos.", height: 172, weight: 58, measurements: "92-62-95", hairColor: "Rubia", skinColor: "Blanca", languages: ["Español", "English", "Italiano"], services: ["Acompañante", "Cenas", "Viajes", "Eventos", "Hotel"], schedule: "Con cita previa", photosCount: 32, videosCount: 8, viewsCount: 18200, storiesActive: 5 },
  { id: "4", username: "sofia.medellin", name: "Sofía", age: 22, city: "Medellín", zone: "Sabaneta", tier: "pro" as Tier, isVerified: true, isOnline: true, rating: 4.7, reviews: 21, price: 200000, currency: "COP", phone: "+57 315 1234567", bio: "Paisa auténtica, cariñosa y apasionada. Te haré sentir como un rey.", height: 160, weight: 50, measurements: "86-56-88", hairColor: "Negra", skinColor: "Morena", languages: ["Español"], services: ["Hotel", "Domicilio", "Masajes"], schedule: "2PM - 11PM", photosCount: 12, videosCount: 2, viewsCount: 5670, storiesActive: 0 },
  { id: "5", username: "mariana.vip", name: "Mariana", age: 24, city: "Medellín", zone: "Envigado", tier: "pro" as Tier, isVerified: true, isOnline: false, rating: 4.6, reviews: 18, price: 250000, currency: "COP", phone: "+57 320 9876543", bio: "Amante de la lencería fina y los encuentros apasionados. Discreción garantizada.", height: 170, weight: 56, measurements: "94-60-92", hairColor: "Pelirroja", skinColor: "Blanca", languages: ["Español", "English"], services: ["Acompañante", "Hotel", "Domicilio", "Fantasías"], schedule: "11AM - 10PM", photosCount: 10, videosCount: 2, viewsCount: 4320, storiesActive: 0 },
  { id: "6", username: "daniela.bella", name: "Daniela", age: 20, city: "Medellín", zone: "Bello", tier: "pro" as Tier, isVerified: false, isOnline: true, rating: 4.5, reviews: 12, price: 180000, currency: "COP", phone: "+57 311 5556789", bio: "Joven, fresca y con mucha energía. La mejor compañía para tu noche.", height: 162, weight: 48, measurements: "84-56-86", hairColor: "Castaña", skinColor: "Trigueña", languages: ["Español"], services: ["Hotel", "Domicilio"], schedule: "4PM - 12AM", photosCount: 8, videosCount: 1, viewsCount: 3100, storiesActive: 0 },
  { id: "7", username: "luciana.angel", name: "Luciana", age: 26, city: "Medellín", zone: "El Poblado", tier: "basic" as Tier, isVerified: true, isOnline: false, rating: 4.4, reviews: 9, price: 200000, currency: "COP", phone: "+57 322 3334455", bio: "Natural, sin filtros. Me gusta conectar de verdad.", height: 164, weight: 54, measurements: "88-60-90", hairColor: "Negra", skinColor: "Morena", languages: ["Español"], services: ["Hotel", "Domicilio", "Masajes"], schedule: "12PM - 9PM", photosCount: 5, videosCount: 0, viewsCount: 1890, storiesActive: 0 },
  { id: "8", username: "gabriela.dance", name: "Gabriela", age: 23, city: "Medellín", zone: "Itagüí", tier: "basic" as Tier, isVerified: true, isOnline: true, rating: 4.3, reviews: 7, price: 150000, currency: "COP", phone: "+57 314 7778899", bio: "Salsera y rumbera. Te garantizo que no te vas a aburrir conmigo.", height: 158, weight: 51, measurements: "85-58-88", hairColor: "Negra", skinColor: "Morena", languages: ["Español"], services: ["Acompañante", "Fiestas", "Hotel"], schedule: "6PM - 2AM", photosCount: 5, videosCount: 1, viewsCount: 1450, storiesActive: 0 },
  { id: "9", username: "natalia.elite", name: "Natalia", age: 27, city: "Medellín", zone: "Laureles", tier: "basic" as Tier, isVerified: false, isOnline: false, rating: 4.2, reviews: 5, price: 180000, currency: "COP", phone: "+57 319 1112233", bio: "Madura y experimentada. Sé exactamente lo que quieres.", height: 166, weight: 57, measurements: "90-62-92", hairColor: "Castaña", skinColor: "Blanca", languages: ["Español"], services: ["Hotel", "Domicilio"], schedule: "10AM - 8PM", photosCount: 4, videosCount: 0, viewsCount: 980, storiesActive: 0 },
] as const;

// ═══ CATEGORIES (filtros) ═══
export const FILTER_CITIES = ["Medellín", "Bogotá", "Cali", "Cartagena", "Barranquilla"] as const;

export const FILTER_ZONES: Record<string, string[]> = {
  "Medellín": ["El Poblado", "Laureles", "Envigado", "Sabaneta", "Bello", "Itagüí", "Centro"],
  "Bogotá": ["Chapinero", "Usaquén", "Zona T", "Norte", "Suba"],
};

export const FILTER_SERVICES = [
  "Acompañante", "Hotel", "Domicilio", "Masajes", "Cenas", "Viajes", "Fiestas", "Eventos", "Fantasías", "Parejas",
] as const;

export const FILTER_BODY = {
  hairColor: ["Negra", "Castaña", "Rubia", "Pelirroja"],
  skinColor: ["Blanca", "Trigueña", "Morena"],
  bodyType: ["Delgada", "Atlética", "Promedio", "Curvy"],
} as const;

export const FILTER_AGE_RANGES = ["18-21", "22-25", "26-30", "31-35", "36+"] as const;

// ═══ MOCK REVIEWS ═══
export const MOCK_REVIEWS = [
  { id: "r1", escortId: "1", author: "Carlos M.", rating: 5, comment: "Increíble experiencia. Muy profesional y hermosa en persona. 100% recomendada.", date: "Hace 2 días" },
  { id: "r2", escortId: "1", author: "Andrés R.", rating: 5, comment: "Superó mis expectativas. Puntual, discreta y muy agradable.", date: "Hace 1 semana" },
  { id: "r3", escortId: "1", author: "Marco L.", rating: 4, comment: "Muy buena compañía. Las fotos son reales. Volveré.", date: "Hace 2 semanas" },
  { id: "r4", escortId: "2", author: "David P.", rating: 5, comment: "Camila es espectacular. Muy divertida y espontánea.", date: "Hace 3 días" },
  { id: "r5", escortId: "3", author: "Juan S.", rating: 5, comment: "El servicio VIP vale cada peso. Isabella es de otro nivel.", date: "Hace 5 días" },
] as const;

export type Escort = typeof MOCK_ESCORTS[number];
export type Review = typeof MOCK_REVIEWS[number];
