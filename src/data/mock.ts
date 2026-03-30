// ==================== Hero Slides ====================
export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  imageAlt: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: "pesach",
    title: "שולחן חג מעוצב בהתאמה אישית",
    subtitle: "מוצרים ממותגים לשולחן הסדר — הדפסות, חריטות ועיצובים ייחודיים",
    buttonText: "לקולקציית פסח",
    buttonLink: "/category/holidays",
    image: "/images/hero-pesach.jpg",
    imageAlt: "שולחן סדר מעוצב עם מוצרים ממותגים",
  },
  {
    id: "teachers",
    title: "מתנות למורים ולגננות",
    subtitle: "סוף שנה מתקרב — הפתיעו עם מתנה אישית שתיזכר",
    buttonText: "למתנות למורים",
    buttonLink: "/category/teachers",
    image: "/images/hero-teachers.jpg",
    imageAlt: "מתנות מעוצבות למורים וגננות",
  },
  {
    id: "engraving",
    title: "חריטה אישית על כל מוצר",
    subtitle: "שם, תאריך, הקדשה — כל מילה הופכת את המתנה למיוחדת",
    buttonText: "גלו את החריטות",
    buttonLink: "/category/engraving",
    image: "/images/hero-engraving.jpg",
    imageAlt: "מוצרים עם חריטת לייזר אישית",
  },
  {
    id: "judaica",
    title: "יודאיקה בעיצוב מודרני",
    subtitle: "מזוזות, חנוכיות, קידוש ועוד — עיצובים ייחודיים בחיתוך לייזר",
    buttonText: "ליודאיקה",
    buttonLink: "/category/judaica",
    image: "/images/hero-judaica.jpg",
    imageAlt: "מוצרי יודאיקה בעיצוב מודרני",
  },
];

// ==================== Categories ====================
export interface Category {
  id: string;
  title: string;
  slug: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  { id: "1", title: "מתנות לחגים", slug: "holidays", icon: "Gift", color: "#f28db2" },
  { id: "2", title: "מתנות למורים", slug: "teachers", icon: "GraduationCap", color: "#cb8fb6" },
  { id: "3", title: "יודאיקה", slug: "judaica", icon: "Star", color: "#82acb4" },
  { id: "4", title: "חריטות לייזר", slug: "engraving", icon: "Pen", color: "#b0d8a2" },
  { id: "5", title: "חיתוכי לייזר", slug: "laser-cut", icon: "Scissors", color: "#fde480" },
  { id: "6", title: "מארזים", slug: "packages", icon: "Package", color: "#c6e8f1" },
  { id: "7", title: "בלונים", slug: "balloons", icon: "PartyPopper", color: "#fdd093" },
  { id: "8", title: "מתנות אישיות", slug: "personal", icon: "Heart", color: "#f2b9b8" },
];

// ==================== Products ====================
export interface MockProduct {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  imageAlt: string;
  slug: string;
}

export const bestSellers: MockProduct[] = [
  {
    id: "bs-1",
    name: "מזוזה מעוצבת בחיתוך לייזר",
    subtitle: "יודאיקה",
    price: 89,
    image: "/images/products/mezuzah.jpg",
    imageAlt: "מזוזה מעוצבת מעץ בחיתוך לייזר",
    slug: "mezuzah-laser",
  },
  {
    id: "bs-2",
    name: "ספל עם חריטה אישית",
    subtitle: "חריטות לייזר",
    price: 79,
    image: "/images/products/mug.jpg",
    imageAlt: "ספל קרמי עם חריטה אישית",
    slug: "custom-mug",
  },
  {
    id: "bs-3",
    name: "מארז שוקולד ממותג",
    subtitle: "מארזים",
    price: 149,
    image: "/images/products/chocolate-box.jpg",
    imageAlt: "מארז שוקולד מעוצב עם מיתוג אישי",
    slug: "chocolate-box",
  },
  {
    id: "bs-4",
    name: "בלוני הליום עם כיתוב",
    subtitle: "בלונים",
    price: 59,
    image: "/images/products/balloons.jpg",
    imageAlt: "בלוני הליום צבעוניים עם כיתוב אישי",
    slug: "helium-balloons",
  },
];

export const newProducts: MockProduct[] = [
  {
    id: "np-1",
    name: "מחזיק מפתחות חרוט",
    subtitle: "מתנות אישיות",
    price: 45,
    image: "/images/products/keychain.jpg",
    imageAlt: "מחזיק מפתחות מעץ עם חריטה אישית",
    slug: "engraved-keychain",
  },
  {
    id: "np-2",
    name: "לוח ברכות מעוצב",
    subtitle: "מתנות למורים",
    price: 120,
    image: "/images/products/blessing-board.jpg",
    imageAlt: "לוח ברכות מעוצב למורה",
    slug: "blessing-board",
  },
  {
    id: "np-3",
    name: "חנוכייה מודרנית",
    subtitle: "יודאיקה",
    price: 199,
    image: "/images/products/hanukkiah.jpg",
    imageAlt: "חנוכייה בעיצוב מודרני מחיתוך לייזר",
    slug: "modern-hanukkiah",
  },
  {
    id: "np-4",
    name: "תיק צ׳ימידן ממותג",
    subtitle: "מתנות לחגים",
    price: 95,
    image: "/images/products/tote-bag.jpg",
    imageAlt: "תיק בד ממותג עם הדפסה אישית",
    slug: "branded-tote",
  },
];

// ==================== Footer Links ====================
export interface FooterLink {
  label: string;
  href: string;
}

export const footerNavLinks: FooterLink[] = [
  { label: "דף הבית", href: "/" },
  { label: "אודות", href: "/about" },
  { label: "צרו קשר", href: "/contact" },
  { label: "שאלות נפוצות", href: "/faq" },
  { label: "מדיניות החזרות", href: "/returns" },
  { label: "תקנון", href: "/terms" },
];

export const footerCategoryLinks: FooterLink[] = [
  { label: "מתנות לחגים", href: "/category/holidays" },
  { label: "יודאיקה", href: "/category/judaica" },
  { label: "חריטות לייזר", href: "/category/engraving" },
  { label: "מארזים", href: "/category/packages" },
  { label: "מתנות אישיות", href: "/category/personal" },
  { label: "בלונים", href: "/category/balloons" },
];
