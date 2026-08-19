import { getClientLogos } from "@/data/clients";
import { getFaq } from "@/data/faq";
import { getReviews } from "@/data/reviews";
import { resolveLocale, type Locale } from "@/lib/i18n";

export interface Warehouse {
  id: string;
  city: string;
  address: string;
  hours: string;
  phone: string;
  email: string;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  header: {
    brand: string;
    tagline: string;
    navLabel: string;
    nav: {
      about: string;
      catalog: string;
      promos: string;
      services: string;
      reviews: string;
      contacts: string;
    };
    phone: string;
    requestCall: string;
    language: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    titleLine1: string;
    titleLine2: string;
    marketTitle: string;
    discountOffer: string;
    urgency: string;
    disclaimer: string;
    phoneHint: string;
    name: string;
    phone: string;
    submit: string;
    success: string;
    imageSrc: string;
    imageAlt: string;
    errors: {
      fullName: string;
      phone: string;
    };
  };
  categories: {
    title: string;
    showAll: string;
    items: Array<{
      title: string;
      subtitle: string;
      priceLabel: string;
      imageSrc: string;
      imageAlt: string;
      productSlug?: string;
    }>;
  };
  catalog: {
    eyebrow: string;
    title: string;
    subtitle: string;
    requestQuote: string;
    imageFallback: string;
  };
  advantages: {
    title: string;
    items: Array<{
      label: string;
      description: string;
    }>;
  };
  clients: {
    title: string;
    compactTitle: string;
    logos: Array<{ name: string; imageSrc: string }>;
  };
  caseStudy: {
    title: string;
    role: string;
    paragraphs: string[];
    signoff: string;
    imageSrc: string;
    imageAlt: string;
  };
  delivery: {
    title: string;
    subtitle: string;
    name: string;
    phone: string;
    submit: string;
    success: string;
    partnersTitle: string;
    partners: Array<{ name: string; imageSrc: string }>;
    trustFactors: Array<{
      id: "experience" | "warranty" | "service" | "prices" | "approach";
      title: string;
      subtitle: string;
    }>;
    errors: {
      fullName: string;
      phone: string;
    };
  };
  branches: {
    title: string;
    brand: string;
    subtitle: string;
    phoneLabel: string;
    emailLabel: string;
    addressLabel: string;
    officeLabel: string;
    hoursLabel: string;
    hoursPrefix: string;
    callCta: string;
    emailCta: string;
    mapsCta: string;
    warehouses: Warehouse[];
  };
  reviews: {
    title: string;
    prevLabel: string;
    nextLabel: string;
    submitCta: string;
    modalTitle: string;
    modalName: string;
    modalPhone: string;
    modalMessage: string;
    modalSubmit: string;
    modalSuccess: string;
    modalClose: string;
    errors: {
      fullName: string;
      phone: string;
      message: string;
    };
    items: Array<{
      id: string;
      company: string;
      author: string;
      text: string;
      date?: string;
      imageSrc: string;
      imageAlt: string;
    }>;
  };
  videos: {
    title: string;
    subtitle: string;
    youtubeCta: string;
    youtubeHref: string;
    items: Array<{
      title: string;
      imageSrc: string;
      imageAlt: string;
      duration: string;
    }>;
  };
  faq: {
    title: string;
    seeAll: string;
    items: Array<{ id?: string; question: string; answer: string }>;
  };
  leadForm: {
    eyebrow: string;
    title: string;
    subtitle: string;
    fullName: string;
    email: string;
    phone: string;
    company: string;
    message: string;
    quantity: string;
    citiesLabel: string;
    citiesHint: string;
    cities: Warehouse[];
    warehouseOfficeLabel: string;
    warehouseHoursLabel: string;
    filesLabel: string;
    filesHint: string;
    filesBrowse: string;
    filesDrag: string;
    filesMaxSize: string;
    filesRemove: string;
    messengerHint: string;
    messengerViber: string;
    messengerTelegram: string;
    submit: string;
    successTitle: string;
    successBody: string;
    successReset: string;
    errors: {
      fullName: string;
      email: string;
      phone: string;
      fileType: string;
      fileSize: string;
    };
  };
  consultation: {
    title: string;
    subtitle: string;
    benefits: string[];
    fullName: string;
    phone: string;
    comment: string;
    submit: string;
    success: string;
    imageSrc: string;
    imageAlt: string;
    errors: {
      fullName: string;
      phone: string;
    };
  };
  seoText: {
    title: string;
    preview: string[];
    rest: string[];
    readMore: string;
    readLess: string;
  };
  stickyCta: {
    call: string;
    order: string;
  };
  a11y: {
    scrollToTop: string;
  };
  product: {
    eyebrow: string;
    requestQuote: string;
    buyCta: string;
    orderCta: string;
    skuLabel: string;
    relatedTitle: string;
    detailsCta: string;
    capacityLabel: string;
    liftHeightLabel: string;
    specifications: string;
    imagePlaceholder: string;
    thumbPlaceholder: string;
    tabs: {
      description: string;
      specifications: string;
      delivery: string;
      readMore: string;
      readLess: string;
    };
    deliveryBullets: string[];
    advantages: Array<{
      id: "stock" | "shipping" | "payment" | "warranty";
      title: string;
      subtitle: string;
    }>;
    commercialOffer: {
      title: string;
      email: string;
      phone: string;
      submit: string;
      filesLabel: string;
      filesHint: string;
      filesBrowse: string;
      filesDrag: string;
      filesMaxSize: string;
      filesRemove: string;
      success: string;
      errors: {
        email: string;
        phone: string;
        fileType: string;
        fileSize: string;
      };
    };
    breadcrumbs: {
      home: string;
      catalog: string;
      category: string;
    };
  };
  footer: {
    brand: string;
    tagline: string;
    phone: string;
    email: string;
    hours: string;
    catalogTitle: string;
    catalogLinks: Array<{ label: string; href: string }>;
    navTitle: string;
    navLinks: Array<{ label: string; href: string }>;
    helpTitle: string;
    helpText: string;
    cta: string;
    copyright: string;
    legal: string;
    siteNote: string;
    privacy: string;
    social: Array<{
      label: string;
      href: string;
      network: "telegram" | "viber" | "youtube";
    }>;
  };
}

const COMPANY_PHONE = "+380 (98) 154-09-82";
const COMPANY_EMAIL = "rokla-ag@ukr.net";

const WAREHOUSES_UK: Warehouse[] = [
  {
    id: "kyiv",
    city: "Київ",
    address: "Дніпровська наб., 13-В",
    hours: "09:00 - 17:00",
    phone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
  },
  {
    id: "dnipro",
    city: "Дніпро",
    address: "Запорізьке шосе, 62",
    hours: "09:00 - 18:00",
    phone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
  },
  {
    id: "kharkiv",
    city: "Харків",
    address: "пр-т Аеропорту (Гагаріна), 352",
    hours: "09:00 - 18:00",
    phone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
  },
  {
    id: "lviv",
    city: "Львів",
    address: "вул. Б. Хмельницького, 188-А",
    hours: "09:00 - 18:00",
    phone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
  },
  {
    id: "vinnytsia",
    city: "Вінниця",
    address: "вул. Батозька, 1-В",
    hours: "09:00 - 18:00",
    phone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
  },
  {
    id: "zhytomyr",
    city: "Житомир",
    address: "Київське шосе, 4/2",
    hours: "09:00 - 18:00",
    phone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
  },
];

const WAREHOUSES_RU: Warehouse[] = [
  {
    id: "kyiv",
    city: "Киев",
    address: "Днепровская наб., 13-В",
    hours: "09:00 - 17:00",
    phone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
  },
  {
    id: "dnipro",
    city: "Днепр",
    address: "Запорожское шоссе, 62",
    hours: "09:00 - 18:00",
    phone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
  },
  {
    id: "kharkiv",
    city: "Харьков",
    address: "пр-т Аэропорта (Гагарина), 352",
    hours: "09:00 - 18:00",
    phone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
  },
  {
    id: "lviv",
    city: "Львов",
    address: "ул. Б. Хмельницкого, 188-А",
    hours: "09:00 - 18:00",
    phone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
  },
  {
    id: "vinnytsia",
    city: "Винница",
    address: "ул. Батозская (Ботожская), 1-В",
    hours: "09:00 - 18:00",
    phone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
  },
  {
    id: "zhytomyr",
    city: "Житомир",
    address: "Киевское шоссе, 4/2",
    hours: "09:00 - 18:00",
    phone: COMPANY_PHONE,
    email: COMPANY_EMAIL,
  },
];

const CATEGORY_IMAGES = {
  pallet: "/images/catalog/gidravlicheskie-telezhki.jpg",
  stacker: "/images/catalog/shtabelery.jpg",
  table: "/images/catalog/gidravlicheskie-stoly.jpg",
  service: "/images/catalog/samohodnye-telezhki.jpg",
  reach: "/images/catalog/richtracki.jpg",
  forklift: "/images/catalog/pogruzchiki.jpg",
  lift: "/images/catalog/podemniki.jpg",
  parts: "/images/catalog/zapchasti.jpg",
} as const;

const DICTIONARY_UK: Dictionary = {
  meta: {
    title: "KAISER — складська техніка",
    description:
      "Рокли, штабелери та складська техніка KAISER. 20 років на ринку України.",
  },
  header: {
    brand: "KAISER",
    tagline: "Надійне обладнання для складської логістики",
    navLabel: "Основна навігація",
    nav: {
      about: "Про обладнання",
      catalog: "Каталог",
      promos: "Акції",
      services: "Про сервіс",
      reviews: "Відгуки",
      contacts: "Контакти",
    },
    phone: "+380 50 407 08 24",
    requestCall: "Замовити дзвінок",
    language: "Мова",
    openMenu: "Відкрити меню",
    closeMenu: "Закрити меню",
  },
  hero: {
    titleLine1: "ТЕХНІКА ДЛЯ СКЛАДУ",
    titleLine2: "НІМЕЦЬКА ЯКІСТЬ",
    marketTitle: "20 РОКІВ НА РИНКУ В УКРАЇНІ",
    discountOffer: "Отримайте знижку 3% при купівлі від 3 одиниць*",
    urgency: "Тільки до 20 серпня!",
    disclaimer: "* Детальну інформацію уточнюйте у менеджера",
    phoneHint: "тел.",
    name: "Ім’я",
    phone: "Телефон",
    submit: "Замовити",
    success: "Заявку прийнято. Менеджер зателефонує.",
    imageSrc: "/images/hero/hero-kaiser-warehouse.jpg",
    imageAlt: "Складська техніка KAISER",
    errors: {
      fullName: "Вкажіть ім’я (мінімум 2 символи).",
      phone: "Вкажіть телефон у форматі +380 (XX) XXX-XX-XX.",
    },
  },
  categories: {
    title: "Каталог техніки KAISER",
    showAll: "Показати всі категорії",
    items: [
      {
        title: "Гідравлічні візки",
        subtitle: "від 2000 до 2500 кг",
        priceLabel: "від 8 900 ₴",
        imageSrc: CATEGORY_IMAGES.pallet,
        imageAlt: "Гідравлічні візки",
        productSlug: "hydraulic-pallet-truck-2t",
      },
      {
        title: "Штабелери",
        subtitle: "від 1 000 до 2 000 кг",
        priceLabel: "від 12 500 ₴",
        imageSrc: CATEGORY_IMAGES.stacker,
        imageAlt: "Штабелери",
      },
      {
        title: "Гідравлічні столи",
        subtitle: "від 500 до 2 000 кг",
        priceLabel: "від 12 500 ₴",
        imageSrc: CATEGORY_IMAGES.table,
        imageAlt: "Гідравлічні столи",
      },
      {
        title: "Самохідні візки",
        subtitle: "ремонт, колеса, ТО",
        priceLabel: "за запитом",
        imageSrc: CATEGORY_IMAGES.service,
        imageAlt: "Самохідні візки",
      },
      {
        title: "Річтраки",
        subtitle: "від 1 400 до 2 500 кг",
        priceLabel: "під замовлення",
        imageSrc: CATEGORY_IMAGES.reach,
        imageAlt: "Річтраки",
      },
      {
        title: "Навантажувачі",
        subtitle: "від 1 500 до 3 500 кг",
        priceLabel: "під замовлення",
        imageSrc: CATEGORY_IMAGES.forklift,
        imageAlt: "Навантажувачі",
      },
      {
        title: "Підйомники",
        subtitle: "висота до 12 м",
        priceLabel: "під замовлення",
        imageSrc: CATEGORY_IMAGES.lift,
        imageAlt: "Підйомники",
      },
      {
        title: "Запчастини",
        subtitle: "гідравліка, ролики, вила",
        priceLabel: "за запитом",
        imageSrc: CATEGORY_IMAGES.parts,
        imageAlt: "Запчастини",
      },
    ],
  },
  catalog: {
    eyebrow: "Каталог",
    title: "Каталог техніки KAISER",
    subtitle: "Оберіть модель, щоб відкрити сторінку з характеристиками та формою замовлення.",
    requestQuote: "Запит ціни",
    imageFallback: "Зображення",
  },
  advantages: {
    title: "Ваші переваги в KAISER",
    items: [
      {
        label: "12 місяців гарантії",
        description:
          "Можлива розширена гарантія 24 місяці на штабелери, рокли, навантажувачі",
      },
      {
        label: "Безготівковий розрахунок",
        description:
          "Працюємо з юридичними особами та ФОП. Купити роклу в лізинг або розстрочку",
      },
      {
        label: "Завжди на складі",
        description:
          "Завдяки безперервним поставкам, на нашому складі завжди в наявності рокли, штабелери, навантажувачі",
      },
      {
        label: "Оперативна доставка!",
        description:
          "Доставка по Києву в день звернення, по УКРАЇНІ від 1 дня після оплати, всі супровідні документи в комплекті",
      },
      {
        label: "Відділ контролю якості",
        description:
          "Вся продукція проходить ретельну перевірку перед відвантаженням",
      },
      {
        label: "Вся продукція сертифікована",
        description:
          "Продукція відповідає міжнародним стандартам якості. Реєстрація ТМ — Німеччина",
      },
      {
        label: "Накопичувальна система знижок",
        description:
          "Система знижок для постійних клієнтів: при купівлі штабелера знижка на гідравлічний візок рокла",
      },
      {
        label: "Стаціонарний та виїзний Сервісний центр",
        description:
          "Виїзні бригади, мережа сервісних центрів по всій Україні. Склад комплектуючих для рокл, штабелерів, навантажувачів",
      },
    ],
  },
  clients: {
    title: "Наші постійні клієнти",
    compactTitle: "Наші клієнти",
    logos: getClientLogos("uk"),
  },
  caseStudy: {
    title: "Алфьоров Сергій Миколайович",
    role: "Генеральний директор ТОВ \"КЛЕБАЄР ЛТД\"",
    paragraphs: [
      "Дорогі партнери, я радий вітати вас на нашому сайті. Наша компанія ТОВ \"КЛЕБАЄР ЛТД\" працює 20 років на ринку. Ми займаємося продажем техніки для складу (Гідравлічні візки, Рокли, Штабелери, Навантажувачі).",
      "Наша мета — виявити ваші потреби та залишити вас задоволеними.",
      "Ми працюємо на всій території України, надаємо гарантійне та післягарантійне обслуговування по всій країні.",
      "Ми постійно працюємо над розширенням асортименту нашого магазину з гнучкими системами знижок, покращенням клієнтського сервісу, щоб наші клієнти могли отримати найкращий вибір та найкращі умови.",
    ],
    signoff: "З повагою до Вас та Вашого бізнесу!",
    imageSrc: "/images/case/ceo-alferov.jpg",
    imageAlt: "Алфьоров Сергій Миколайович, генеральний директор ТОВ «КЛЕБАЄР ЛТД»",
  },
  delivery: {
    title: "Замовити доставку по Україні",
    subtitle: "* Детальну інформацію уточніть у менеджера",
    name: "Ім’я",
    phone: "Телефон",
    submit: "Отримати доставку",
    success: "Заявку прийнято. Менеджер зателефонує.",
    partnersTitle: "Нам довіряють:",
    partners: getClientLogos("uk"),
    trustFactors: [
      {
        id: "experience",
        title: "10 років на ринку",
        subtitle: "Досвід та надійність",
      },
      {
        id: "warranty",
        title: "Офіційна гарантія",
        subtitle: "На всю техніку",
      },
      {
        id: "service",
        title: "Сервісний центр",
        subtitle: "Обслуговування і ремонт",
      },
      {
        id: "prices",
        title: "Вигідні ціни",
        subtitle: "Прямий імпортер",
      },
      {
        id: "approach",
        title: "Індивідуальний підхід",
        subtitle: "Допомога експертів",
      },
    ],
    errors: {
      fullName: "Вкажіть ім’я (мінімум 2 символи).",
      phone: "Вкажіть телефон у форматі +380 (XX) XXX-XX-XX.",
    },
  },
  branches: {
    title: "Контактна інформація",
    brand: "KAISER",
    subtitle: "Офіційний представник",
    phoneLabel: "Телефон",
    emailLabel: "Email",
    addressLabel: "Адреса",
    officeLabel: "Офіс - Склад:",
    hoursLabel: "Режим роботи:",
    hoursPrefix: "Пн–Пт",
    callCta: "Зателефонувати",
    emailCta: "Написати на Email",
    mapsCta: "Відкрити в Google Maps ↗",
    warehouses: WAREHOUSES_UK,
  },
  reviews: {
    title: "Відгуки наших клієнтів",
    prevLabel: "Попередній відгук",
    nextLabel: "Наступний відгук",
    submitCta: "Надіслати відгук",
    modalTitle: "Залишити відгук",
    modalName: "Ім’я",
    modalPhone: "Телефон",
    modalMessage: "Ваш відгук",
    modalSubmit: "Надіслати",
    modalSuccess: "Дякуємо! Відгук надіслано.",
    modalClose: "Закрити",
    errors: {
      fullName: "Вкажіть ім’я (мінімум 2 символи).",
      phone: "Вкажіть коректний номер телефону.",
      message: "Напишіть відгук.",
    },
    items: getReviews("uk"),
  },
  videos: {
    title: "Відеоогляди",
    subtitle:
      "Короткі огляди техніки KAISER: збірка, гідровузол і робота на складі.",
    youtubeCta: "Дивитися всі відео",
    youtubeHref: "https://www.youtube.com",
    items: [
      {
        title: "Збірка гідравлічної рокли",
        imageSrc: "/images/products/pallet-truck-2t-1.jpg",
        imageAlt: "Відео: збірка гідравлічної рокли",
        duration: "0:48",
      },
      {
        title: "Принцип роботи гідровузла",
        imageSrc: "/images/products/pallet-truck-2t-2.jpg",
        imageAlt: "Відео: принцип роботи гідровузла",
        duration: "0:36",
      },
      {
        title: "Огляд посиленої моделі 2,5 т",
        imageSrc: "/images/products/pallet-truck-heavy-1.jpg",
        imageAlt: "Відео: огляд посиленої рокли",
        duration: "1:12",
      },
      {
        title: "Рокла з довгими вилами на складі",
        imageSrc: "/images/products/pallet-truck-long-1.jpg",
        imageAlt: "Відео: рокла з довгими вилами",
        duration: "0:54",
      },
    ],
  },
  faq: {
    title: "Часті запитання",
    seeAll: "Дивитися всі питання",
    items: getFaq("uk"),
  },
  leadForm: {
    eyebrow: "Контакт",
    title: "Надіслати реквізити",
    subtitle: "Залиште контакти та файл з реквізитами компанії (.pdf, .jpg, .png).",
    fullName: "ПІБ",
    email: "Email",
    phone: "Телефон",
    company: "Назва компанії",
    message: "Повідомлення",
    quantity: "Кількість",
    citiesLabel: "Місто / склад",
    citiesHint: "Оберіть офіс-склад:",
    cities: WAREHOUSES_UK,
    warehouseOfficeLabel: "Офіс-склад",
    warehouseHoursLabel: "Режим роботи",
    filesLabel: "Прикріпити файл з реквізитами",
    filesHint: "Приймаємо: .pdf, .jpg, .png",
    filesBrowse: "Обрати файли",
    filesDrag: "Перетягніть файли сюди",
    filesMaxSize: "До 10 МБ на файл",
    filesRemove: "Видалити файл",
    messengerHint: "Або надішліть на",
    messengerViber: "Viber",
    messengerTelegram: "Telegram",
    submit: "Надіслати заявку",
    successTitle: "Заявка успішно відправлена",
    successBody: "Менеджер зв’яжеться з вами найближчим часом у робочі години.",
    successReset: "Надіслати ще одну заявку",
    errors: {
      fullName: "Вкажіть ім’я (мінімум 2 символи).",
      email: "Вкажіть коректний email.",
      phone: "Вкажіть телефон у форматі +380 (XX) XXX-XX-XX.",
      fileType: "Лише PDF, JPG або PNG.",
      fileSize: "Файл перевищує 10 МБ.",
    },
  },
  stickyCta: {
    call: "Зателефонувати",
    order: "Замовити",
  },
  a11y: {
    scrollToTop: "Нагору",
  },
  product: {
    eyebrow: "Товар",
    requestQuote: "Запит ціни",
    buyCta: "Замовити зі знижкою",
    orderCta: "Замовити",
    skuLabel: "Артикул",
    relatedTitle: "Схожі товари",
    detailsCta: "Детальніше",
    capacityLabel: "Вантажопідйомність",
    liftHeightLabel: "Висота підйому",
    specifications: "Характеристики",
    imagePlaceholder: "Зображення відсутнє",
    thumbPlaceholder: "Мініатюра",
    tabs: {
      description: "Опис",
      specifications: "Характеристики",
      delivery: "Доставка та оплата",
      readMore: "Читати далі",
      readLess: "Згорнути",
    },
    deliveryBullets: [
      "Доставка по Києву в день звернення після підтвердження замовлення.",
      "По Україні — від 1 дня після оплати, з повним комплектом документів.",
      "Самовивіз зі складів у Києві, Дніпрі, Харкові, Одесі та Львові.",
      "Оплата: готівка, картка, безготівковий розрахунок з ПДВ.",
    ],
    advantages: [
      {
        id: "stock",
        title: "Склад в Україні.",
        subtitle: "Товар в наявності.",
      },
      {
        id: "shipping",
        title: "Відправка в день замовлення.",
        subtitle: "При замовленні до 15:00.",
      },
      {
        id: "payment",
        title: "Будь-яка форма оплати.",
        subtitle: "Безготівковий розрахунок з ПДВ.",
      },
      {
        id: "warranty",
        title: "Гарантія та сервіс.",
        subtitle: "Підтримка 24/7.",
      },
    ],
    commercialOffer: {
      title: "Отримати комерційну пропозицію",
      email: "Email",
      phone: "Телефон",
      submit: "Надіслати",
      filesLabel: "Прикріпити файл",
      filesHint: "PDF, JPG або PNG до 10 МБ",
      filesBrowse: "Обрати файл",
      filesDrag: "Перетягніть файл сюди",
      filesMaxSize: "Макс. 10 МБ",
      filesRemove: "Видалити",
      success: "Заявку прийнято. Надішлемо КП на email.",
      errors: {
        email: "Вкажіть коректний email.",
        phone: "Вкажіть телефон у форматі +380 (XX) XXX-XX-XX.",
        fileType: "Лише PDF, JPG або PNG.",
        fileSize: "Файл перевищує 10 МБ.",
      },
    },
    breadcrumbs: {
      home: "Головна",
      catalog: "Каталог",
      category: "Гідравлічні візки",
    },
  },
  consultation: {
    title: "Потрібна допомога з вибором?",
    subtitle:
      "Наші спеціалісти допоможуть підібрати оптимальне обладнання.",
    benefits: [
      "Безкоштовна консультація",
      "Індивідуальний підхід",
      "Розрахунок вартості за 5 хвилин",
    ],
    fullName: "Ваше ім'я",
    phone: "Телефон*",
    comment: "Коментар (необов'язково)",
    submit: "Отримати консультацію",
    success: "Заявку прийнято. Менеджер зателефонує.",
    imageSrc: "/images/manager.png",
    imageAlt: "Менеджер KAISER",
    errors: {
      fullName: "Вкажіть ім’я (мінімум 2 символи).",
      phone: "Вкажіть телефон у форматі +380 (XX) XXX-XX-XX.",
    },
  },
  seoText: {
    title: "Що являють собою гідравлічні візки",
    preview: [
      "Гідравлічні візки (рохлі) — базовий інструмент складської логістики. Вони піднімають палети на невелику висоту і дозволяють швидко переміщувати вантажі без електрики.",
      "KAISER пропонує моделі вантажопідйомністю від 2 до 2,5 т з різною довжиною вил, типом коліс і комплектацією під підлогу вашого складу.",
    ],
    rest: [
      "Правильний підбір рохлі зменшує простої на рампі, знижує навантаження на персонал і продовжує ресурс техніки. Важливі параметри: вага вантажу, ширина проїздів, покриття підлоги та інтенсивність змін.",
      "Наші менеджери допоможуть порівняти гідравлічні візки, штабелери та іншу складську техніку під ваші задачі — з урахуванням бюджету, термінів відвантаження та сервісу.",
    ],
    readMore: "Читати далі →",
    readLess: "Згорнути",
  },
  footer: {
    brand: "KAISER",
    tagline: "Надійна складська техніка для вашого бізнесу",
    phone: "+380 (98) 154-09-82",
    email: "rokla-ag@ukr.net",
    hours: "Пн–Пт: 09:00 – 18:00",
    catalogTitle: "Каталог продукції",
    catalogLinks: [
      { label: "Гідравлічні візки", href: "#catalog" },
      { label: "Штабелери", href: "#catalog" },
      { label: "Гідравлічні столи", href: "#catalog" },
      { label: "Річтраки", href: "#catalog" },
      { label: "Навантажувачі", href: "#catalog" },
      { label: "Підйомники", href: "#catalog" },
      { label: "Самохідні візки", href: "#catalog" },
    ],
    navTitle: "Компанія",
    navLinks: [
      { label: "Про компанію", href: "#about" },
      { label: "Новини", href: "#about" },
      { label: "Документи та реквізити", href: "#contact" },
      { label: "Гарантія та сервіс", href: "#services" },
      { label: "Вакансії", href: "#contact" },
    ],
    helpTitle: "Отримати допомогу з підбором",
    helpText:
      "Наші спеціалісти допоможуть підібрати оптимальне рішення під ваші задачі",
    cta: "Отримати консультацію",
    copyright: "© KAISER / ТОВ «КЛЕБАЄР ЛТД» 2016-2026. Усі права захищено.",
    legal: "ТОВ «КАЙЗЕР ГРУП» — надійний партнер у складській техніці.",
    siteNote: "Сайт створено для вашої зручності та росту бізнесу!",
    privacy: "Політика конфіденційності",
    social: [
      {
        label: "Telegram",
        href: "https://t.me/+380981540982",
        network: "telegram",
      },
      {
        label: "Viber",
        href: "viber://chat?number=%2B380981540982",
        network: "viber",
      },
      {
        label: "YouTube",
        href: "https://www.youtube.com",
        network: "youtube",
      },
    ],
  },
};

const DICTIONARY_RU: Dictionary = {
  meta: {
    title: "KAISER — складская техника",
    description:
      "Роклы, штабелеры и складская техника KAISER. 20 лет на рынке Украины.",
  },
  header: {
    brand: "KAISER",
    tagline: "Надёжное оборудование для складской логистики",
    navLabel: "Основная навигация",
    nav: {
      about: "Про оборудование",
      catalog: "Каталог",
      promos: "Акции",
      services: "Про сервис",
      reviews: "Отзывы",
      contacts: "Контакты",
    },
    phone: "+380 50 407 08 24",
    requestCall: "Заказать звонок",
    language: "Язык",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
  },
  hero: {
    titleLine1: "ТЕХНИКА ДЛЯ СКЛАДА",
    titleLine2: "НЕМЕЦКОЕ КАЧЕСТВО",
    marketTitle: "20 ЛЕТ НА РЫНКЕ В УКРАИНЕ",
    discountOffer: "Получите скидку 3% при покупке от 3 единиц*",
    urgency: "Только до 20 августа!",
    disclaimer: "* Детальную информацию уточняйте у менеджера",
    phoneHint: "тел.",
    name: "Имя",
    phone: "Телефон",
    submit: "Заказать",
    success: "Заявка принята. Менеджер перезвонит.",
    imageSrc: "/images/hero/hero-kaiser-warehouse.jpg",
    imageAlt: "Складская техника KAISER",
    errors: {
      fullName: "Укажите имя (минимум 2 символа).",
      phone: "Укажите телефон в формате +380 (XX) XXX-XX-XX.",
    },
  },
  categories: {
    title: "Каталог техники KAISER",
    showAll: "Показать все категории",
    items: [
      {
        title: "Гидравлические тележки",
        subtitle: "от 2000 до 2500 кг",
        priceLabel: "от 8 900 ₴",
        imageSrc: CATEGORY_IMAGES.pallet,
        imageAlt: "Гидравлические тележки",
        productSlug: "hydraulic-pallet-truck-2t",
      },
      {
        title: "Штабелеры",
        subtitle: "от 1 000 до 2 000 кг",
        priceLabel: "от 12 500 ₴",
        imageSrc: CATEGORY_IMAGES.stacker,
        imageAlt: "Штабелеры",
      },
      {
        title: "Гидравлические столы",
        subtitle: "от 500 до 2 000 кг",
        priceLabel: "от 12 500 ₴",
        imageSrc: CATEGORY_IMAGES.table,
        imageAlt: "Гидравлические столы",
      },
      {
        title: "Самоходные тележки",
        subtitle: "ремонт, колёса, ТО",
        priceLabel: "по запросу",
        imageSrc: CATEGORY_IMAGES.service,
        imageAlt: "Самоходные тележки",
      },
      {
        title: "Richtracks",
        subtitle: "от 1 400 до 2 500 кг",
        priceLabel: "под заказ",
        imageSrc: CATEGORY_IMAGES.reach,
        imageAlt: "Richtracks",
      },
      {
        title: "Погрузчики",
        subtitle: "от 1 500 до 3 500 кг",
        priceLabel: "под заказ",
        imageSrc: CATEGORY_IMAGES.forklift,
        imageAlt: "Погрузчики",
      },
      {
        title: "Подъемники",
        subtitle: "высота до 12 м",
        priceLabel: "под заказ",
        imageSrc: CATEGORY_IMAGES.lift,
        imageAlt: "Подъемники",
      },
      {
        title: "Запчасти",
        subtitle: "гидравлика, ролики, вилы",
        priceLabel: "по запросу",
        imageSrc: CATEGORY_IMAGES.parts,
        imageAlt: "Запчасти",
      },
    ],
  },
  catalog: {
    eyebrow: "Каталог",
    title: "Каталог техники KAISER",
    subtitle: "Выберите модель, чтобы открыть страницу с характеристиками и формой заказа.",
    requestQuote: "Запрос цены",
    imageFallback: "Изображение",
  },
  advantages: {
    title: "Ваши преимущества в KAISER",
    items: [
      {
        label: "12 месяцев гарантии",
        description:
          "Возможна расширенная гарантия 24 месяца на штабелеры, роклы, погрузчики",
      },
      {
        label: "Безналичный расчет",
        description:
          "Работаем с юридическими лицами и ИП. Купить роклу в лизинг или рассрочка",
      },
      {
        label: "Всегда на складе",
        description:
          "Благодаря непрерывным поставкам, на нашем складе всегда в наличии роклы, штабелеры, погрузчики",
      },
      {
        label: "Оперативная доставка!",
        description:
          "Доставка по Киеву в день обращения, по УКРАИНЕ от 1 дня после оплаты, все сопроводительные документы в комплекте",
      },
      {
        label: "Отдел контроля качества",
        description:
          "Вся продукция проходит тщательную проверку перед отгрузкой",
      },
      {
        label: "Вся продукция сертифицирована",
        description:
          "Продукция отвечает международным стандартам качества. Регистрация ТМ - Германия",
      },
      {
        label: "Накопительная система скидок",
        description:
          "Система скидок для постоянных клиентов при покупке штабелера скидка на гидравлическую тележку рокла",
      },
      {
        label: "Стационарный и выездной Сервисный центр",
        description:
          "Выездные бригады, сеть Сервисных центров по всей Украине. Склад комплектующих для рокла, штабелеров, погрузчиков",
      },
    ],
  },
  clients: {
    title: "Наши постоянные клиенты",
    compactTitle: "Наши клиенты",
    logos: getClientLogos("ru"),
  },
  caseStudy: {
    title: "Алферов Сергей Николаевич",
    role: "Генеральный директор ТОВ \"КЛЕБАЕР ЛТД\"",
    paragraphs: [
      "Дорогие партнеры, я рад приветствовать вас на нашем сайте. Наша компания ТОВ \"КЛЕБАЕР ЛТД\" работает 20 лет на рынке. Мы занимаемся продажей техники для склада (Гидравлические тележки, Роклы, Штабелеры, Погрузчики).",
      "Наша цель – выявить ваши потребности и оставить вас удовлетворенными.",
      "Мы работаем на всей территории Украины, предоставляем гарантийное и послегарантийное обслуживание на всей территории Украины.",
      "Мы постоянно работаем над расширением ассортимента нашего магазина с гибкими системами скидок, улучшением клиентского сервиса, чтобы наши клиенты могли получить лучший выбор и лучшие условия.",
    ],
    signoff: "С уважением к Вам и Вашему бизнесу!",
    imageSrc: "/images/case/ceo-alferov.jpg",
    imageAlt: "Алферов Сергей Николаевич, генеральный директор ТОВ «КЛЕБАЕР ЛТД»",
  },
  delivery: {
    title: "Заказать доставку по Украине",
    subtitle: "* Подробную информацию уточните у менеджера",
    name: "Имя",
    phone: "Телефон",
    submit: "Получить доставку",
    success: "Заявка принята. Менеджер перезвонит.",
    partnersTitle: "Нам доверяют:",
    partners: getClientLogos("ru"),
    trustFactors: [
      {
        id: "experience",
        title: "10 лет на рынке",
        subtitle: "Опыт и надёжность",
      },
      {
        id: "warranty",
        title: "Официальная гарантия",
        subtitle: "На всю технику",
      },
      {
        id: "service",
        title: "Сервисный центр",
        subtitle: "Обслуживание и ремонт",
      },
      {
        id: "prices",
        title: "Выгодные цены",
        subtitle: "Прямой импортёр",
      },
      {
        id: "approach",
        title: "Индивидуальный подход",
        subtitle: "Помощь экспертов",
      },
    ],
    errors: {
      fullName: "Укажите имя (минимум 2 символа).",
      phone: "Укажите телефон в формате +380 (XX) XXX-XX-XX.",
    },
  },
  branches: {
    title: "Контактная информация",
    brand: "KAISER",
    subtitle: "Официальный представитель",
    phoneLabel: "Телефон",
    emailLabel: "Email",
    addressLabel: "Адрес",
    officeLabel: "Офис - Склад:",
    hoursLabel: "Режим работы:",
    hoursPrefix: "Пн–Пт",
    callCta: "Позвонить",
    emailCta: "Написать на Email",
    mapsCta: "Открыть в Google Maps ↗",
    warehouses: WAREHOUSES_RU,
  },
  reviews: {
    title: "Отзывы наших клиентов",
    prevLabel: "Предыдущий отзыв",
    nextLabel: "Следующий отзыв",
    submitCta: "Отправить отзыв",
    modalTitle: "Оставить отзыв",
    modalName: "Имя",
    modalPhone: "Телефон",
    modalMessage: "Ваш отзыв",
    modalSubmit: "Отправить",
    modalSuccess: "Спасибо! Отзыв отправлен.",
    modalClose: "Закрыть",
    errors: {
      fullName: "Укажите имя (минимум 2 символа).",
      phone: "Укажите корректный номер телефона.",
      message: "Напишите отзыв.",
    },
    items: getReviews("ru"),
  },
  videos: {
    title: "Видеообзоры",
    subtitle:
      "Короткие обзоры техники KAISER: сборка, гидроузел и работа на складе.",
    youtubeCta: "Смотреть все видео",
    youtubeHref: "https://www.youtube.com",
    items: [
      {
        title: "Сборка гидравлической роклы",
        imageSrc: "/images/products/pallet-truck-2t-1.jpg",
        imageAlt: "Видео: сборка гидравлической роклы",
        duration: "0:48",
      },
      {
        title: "Принцип работы гидроузла",
        imageSrc: "/images/products/pallet-truck-2t-2.jpg",
        imageAlt: "Видео: принцип работы гидроузла",
        duration: "0:36",
      },
      {
        title: "Обзор усиленной модели 2,5 т",
        imageSrc: "/images/products/pallet-truck-heavy-1.jpg",
        imageAlt: "Видео: обзор усиленной роклы",
        duration: "1:12",
      },
      {
        title: "Рокла с длинными вилами на складе",
        imageSrc: "/images/products/pallet-truck-long-1.jpg",
        imageAlt: "Видео: рокла с длинными вилами",
        duration: "0:54",
      },
    ],
  },
  faq: {
    title: "Часто задаваемые вопросы",
    seeAll: "Смотреть все вопросы",
    items: getFaq("ru"),
  },
  leadForm: {
    eyebrow: "Контакт",
    title: "Отправить реквизиты",
    subtitle: "Оставьте контакты и файл с реквизитами компании (.pdf, .jpg, .png).",
    fullName: "ФИО",
    email: "Email",
    phone: "Телефон",
    company: "Название компании",
    message: "Сообщение",
    quantity: "Количество",
    citiesLabel: "Город / склад",
    citiesHint: "Выберите офис-склад:",
    cities: WAREHOUSES_RU,
    warehouseOfficeLabel: "Офис-склад",
    warehouseHoursLabel: "Режим работы",
    filesLabel: "Прикрепить файл с реквизитами",
    filesHint: "Принимаем: .pdf, .jpg, .png",
    filesBrowse: "Выбрать файлы",
    filesDrag: "Перетащите файлы сюда",
    filesMaxSize: "До 10 МБ на файл",
    filesRemove: "Удалить файл",
    messengerHint: "Или отправьте в",
    messengerViber: "Viber",
    messengerTelegram: "Telegram",
    submit: "Отправить заявку",
    successTitle: "Заявка успешно отправлена",
    successBody: "Менеджер свяжется с вами в ближайшее время в рабочие часы.",
    successReset: "Отправить ещё одну заявку",
    errors: {
      fullName: "Укажите имя (минимум 2 символа).",
      email: "Укажите корректный email.",
      phone: "Укажите телефон в формате +380 (XX) XXX-XX-XX.",
      fileType: "Только PDF, JPG или PNG.",
      fileSize: "Файл превышает 10 МБ.",
    },
  },
  stickyCta: {
    call: "Позвонить",
    order: "Заказать",
  },
  a11y: {
    scrollToTop: "Наверх",
  },
  product: {
    eyebrow: "Товар",
    requestQuote: "Запрос цены",
    buyCta: "Заказать со скидкой",
    orderCta: "Заказать",
    skuLabel: "Артикул",
    relatedTitle: "Похожие товары",
    detailsCta: "Подробнее",
    capacityLabel: "Грузоподъёмность",
    liftHeightLabel: "Высота подъёма",
    specifications: "Характеристики",
    imagePlaceholder: "Изображение отсутствует",
    thumbPlaceholder: "Миниатюра",
    tabs: {
      description: "Описание",
      specifications: "Характеристики",
      delivery: "Доставка и оплата",
      readMore: "Читать далее",
      readLess: "Свернуть",
    },
    deliveryBullets: [
      "Доставка по Киеву в день обращения после подтверждения заказа.",
      "По Украине — от 1 дня после оплаты, с полным комплектом документов.",
      "Самовывоз со складов в Киеве, Днепре, Харькове, Одессе и Львове.",
      "Оплата: наличные, карта, безналичный расчёт с НДС.",
    ],
    advantages: [
      {
        id: "stock",
        title: "Склад в Украине.",
        subtitle: "Товар в наличии.",
      },
      {
        id: "shipping",
        title: "Отправка в день заказа.",
        subtitle: "При заказе до 15:00.",
      },
      {
        id: "payment",
        title: "Любая форма оплаты.",
        subtitle: "Безналичный расчёт с НДС.",
      },
      {
        id: "warranty",
        title: "Гарантия и сервис.",
        subtitle: "Поддержка 24/7.",
      },
    ],
    commercialOffer: {
      title: "Получить коммерческое предложение",
      email: "Email",
      phone: "Телефон",
      submit: "Отправить",
      filesLabel: "Прикрепить файл",
      filesHint: "PDF, JPG или PNG до 10 МБ",
      filesBrowse: "Выбрать файл",
      filesDrag: "Перетащите файл сюда",
      filesMaxSize: "Макс. 10 МБ",
      filesRemove: "Удалить",
      success: "Заявку приняли. Отправим КП на email.",
      errors: {
        email: "Укажите корректный email.",
        phone: "Укажите телефон в формате +380 (XX) XXX-XX-XX.",
        fileType: "Только PDF, JPG или PNG.",
        fileSize: "Файл превышает 10 МБ.",
      },
    },
    breadcrumbs: {
      home: "Главная",
      catalog: "Каталог",
      category: "Гидравлические тележки",
    },
  },
  consultation: {
    title: "Нужна помощь с выбором?",
    subtitle:
      "Наши специалисты помогут подобрать оптимальное оборудование.",
    benefits: [
      "Бесплатная консультация",
      "Индивидуальный подход",
      "Расчет стоимости за 5 минут",
    ],
    fullName: "Ваше имя",
    phone: "Телефон*",
    comment: "Комментарий (необязательно)",
    submit: "Получить консультацию",
    success: "Заявку приняли. Менеджер перезвонит.",
    imageSrc: "/images/manager.png",
    imageAlt: "Менеджер KAISER",
    errors: {
      fullName: "Укажите имя (минимум 2 символа).",
      phone: "Укажите телефон в формате +380 (XX) XXX-XX-XX.",
    },
  },
  seoText: {
    title: "Что представляют собой гидравлические тележки",
    preview: [
      "Гидравлические тележки (рохли) — базовый инструмент складской логистики. Они поднимают паллеты на небольшую высоту и позволяют быстро перемещать грузы без электричества.",
      "KAISER предлагает модели грузоподъёмностью от 2 до 2,5 т с разной длиной вил, типом колёс и комплектацией под пол вашего склада.",
    ],
    rest: [
      "Правильный подбор рохли уменьшает простои на рампе, снижает нагрузку на персонал и продлевает ресурс техники. Важные параметры: вес груза, ширина проездов, покрытие пола и интенсивность смен.",
      "Наши менеджеры помогут сравнить гидравлические тележки, штабелёры и другую складскую технику под ваши задачи — с учётом бюджета, сроков отгрузки и сервиса.",
    ],
    readMore: "Читать далее →",
    readLess: "Свернуть",
  },
  footer: {
    brand: "KAISER",
    tagline: "Надежная складская техника для вашего бизнеса",
    phone: "+380 (98) 154-09-82",
    email: "rokla-ag@ukr.net",
    hours: "Пн–Пт: 09:00 – 18:00",
    catalogTitle: "Каталог продукции",
    catalogLinks: [
      { label: "Гидравлические тележки", href: "#catalog" },
      { label: "Штабелёры", href: "#catalog" },
      { label: "Гидравлические столы", href: "#catalog" },
      { label: "Ричтраки", href: "#catalog" },
      { label: "Погрузчики", href: "#catalog" },
      { label: "Подъёмники", href: "#catalog" },
      { label: "Самоходные тележки", href: "#catalog" },
    ],
    navTitle: "Компания",
    navLinks: [
      { label: "О компании", href: "#about" },
      { label: "Новости", href: "#about" },
      { label: "Документы и реквизиты", href: "#contact" },
      { label: "Гарантия и сервис", href: "#services" },
      { label: "Вакансии", href: "#contact" },
    ],
    helpTitle: "Получить помощь с подбором",
    helpText:
      "Наши специалисты помогут подобрать оптимальное решение под ваши задачи",
    cta: "Получить консультацию",
    copyright: "© KAISER / ООО «КЛЕБАЕР ЛТД» 2016-2026. Все права защищены.",
    legal: "ООО «КАЙЗЕР ГРУПП» — надёжный партнёр в складской технике.",
    siteNote: "Сайт создан для вашего удобства и роста бизнеса!",
    privacy: "Политика конфиденциальности",
    social: [
      {
        label: "Telegram",
        href: "https://t.me/+380981540982",
        network: "telegram",
      },
      {
        label: "Viber",
        href: "viber://chat?number=%2B380981540982",
        network: "viber",
      },
      {
        label: "YouTube",
        href: "https://www.youtube.com",
        network: "youtube",
      },
    ],
  },
};

const DICTIONARIES: Record<Locale, Dictionary> = {
  uk: DICTIONARY_UK,
  ru: DICTIONARY_RU,
};

export function getDictionary(lang: string): Dictionary {
  return DICTIONARIES[resolveLocale(lang)];
}
