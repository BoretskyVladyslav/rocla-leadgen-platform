import { getClientLogos } from "@/data/clients";
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
  header: {
    brand: string;
    tagline: string;
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
    title: string;
    titleHighlights: string[];
    subtitle: string;
    promo: string;
    promoNote: string;
    trustBadges: string[];
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
    errors: {
      fullName: string;
      phone: string;
    };
  };
  branches: {
    title: string;
    phoneLabel: string;
    emailLabel: string;
    addressLabel: string;
    hoursLabel: string;
    warehouses: Warehouse[];
  };
  reviews: {
    title: string;
    items: Array<{
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
    items: Array<{
      title: string;
      imageSrc: string;
      imageAlt: string;
    }>;
  };
  faq: {
    title: string;
    items: Array<{ question: string; answer: string }>;
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
    benefits: string[];
    fullName: string;
    phone: string;
    email: string;
    submit: string;
    success: string;
    imageSrc: string;
    imageAlt: string;
    errors: {
      fullName: string;
      email: string;
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
  product: {
    eyebrow: string;
    requestQuote: string;
    buyCta: string;
    orderCta: string;
    skuLabel: string;
    relatedTitle: string;
    specifications: string;
    imagePlaceholder: string;
    thumbPlaceholder: string;
    tabs: {
      description: string;
      specifications: string;
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
      network: "telegram" | "instagram" | "viber";
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
  header: {
    brand: "KAISER",
    tagline: "Офіційний представник / Продаж, сервіс та ремонт по всій Україні",
    nav: {
      about: "Про компанію",
      catalog: "Каталог",
      promos: "Акції",
      services: "Послуги",
      reviews: "Відгуки",
      contacts: "Контакти",
    },
    phone: "+380 (98) 154-09-82",
    requestCall: "Замовити дзвінок",
    language: "Мова",
    openMenu: "Відкрити меню",
    closeMenu: "Закрити меню",
  },
  hero: {
    title: "Купити роклу (рохлю) — німецька якість KAISER",
    titleHighlights: ["роклу (рохлю)", "KAISER"],
    subtitle: "20 років на ринку в Україні",
    promo: "Знижки до 18%. Гарантія 24 місяці.",
    promoNote: "* Детальну інформацію уточнюйте у менеджера",
    trustBadges: [
      "Відвантаження за 30 хв",
      "Оплата з ПДВ",
      "Гарантія 24 міс",
    ],
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
    logos: getClientLogos("uk"),
  },
  caseStudy: {
    title: "Алфьоров Сергій Миколайович",
    role: "Генеральний директор ТОВ \"КЛЕБАЕР ЛТД\"",
    paragraphs: [
      "Дорогі партнери, я радий вітати вас на нашому сайті. Наша компанія ТОВ \"КЛЕБАЕР ЛТД\" працює 20 років на ринку. Ми займаємося продажем техніки для складу (Гідравлічні візки, Рокли, Штабелери, Навантажувачі).",
      "Наша мета — виявити ваші потреби та залишити вас задоволеними.",
      "Ми працюємо на всій території України, надаємо гарантійне та післягарантійне обслуговування по всій країні.",
      "Ми постійно працюємо над розширенням асортименту нашого магазину з гнучкими системами знижок, покращенням клієнтського сервісу, щоб наші клієнти могли отримати найкращий вибір та найкращі умови.",
    ],
    signoff: "З повагою до Вас та Вашого бізнесу!",
    imageSrc: "/images/case/ceo-alferov.jpg",
    imageAlt: "Алфьоров Сергій Миколайович, генеральний директор ТОВ «КЛЕБАЕР ЛТД»",
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
    errors: {
      fullName: "Вкажіть ім’я (мінімум 2 символи).",
      phone: "Вкажіть телефон у форматі +380 (XX) XXX-XX-XX.",
    },
  },
  branches: {
    title: "Контактна інформація",
    phoneLabel: "Телефон",
    emailLabel: "Email",
    addressLabel: "Адреса",
    hoursLabel: "Режим роботи",
    warehouses: WAREHOUSES_UK,
  },
  reviews: {
    title: "Відгуки наших клієнтів",
    items: [
      {
        company: "ТОВ «ЛАЙФСЕ ЛЛ»",
        author: "Язиджи Ісмет",
        date: "12.03.2024",
        text: "Купували самохідний штабелер. Показали модель до оплати, доставили за 2 дні — чітко й організовано.",
        imageSrc: "/images/reviews/review-1.jpg",
        imageAlt: "Техніка KAISER у клієнта",
      },
      {
        company: "ТОВ «НОША»",
        author: "Гнатенко Сергій",
        date: "28.01.2024",
        text: "Роклу доставили в Ужгород через два дні. Техніка відмінна, консультація зі збірки допомогла.",
        imageSrc: "/images/reviews/review-2.jpg",
        imageAlt: "Рокла в роботі на складі клієнта",
      },
      {
        company: "ТОВ «ОККО-ХОЛДИНГ»",
        author: "Рассказов Дмитро",
        date: "05.11.2023",
        text: "Запропонували варіант із змінною АКБ, показали на складі й навіть тест-драйв. Працюватимемо далі.",
        imageSrc: "/images/reviews/review-3.jpg",
        imageAlt: "Навантажувач на об’єкті клієнта",
      },
      {
        company: "ТОВ «АТБ-МАРКЕТ»",
        author: "Коваленко Олена",
        date: "19.09.2023",
        text: "Замовили партію гідравлічних рокл для розподільчого центру. Усі машини з однаковими вузлами — зручно для сервісу.",
        imageSrc: "/images/reviews/review-4.jpg",
        imageAlt: "Рокли на складі ритейлера",
      },
      {
        company: "ПрАТ «Фармак»",
        author: "Мельник Андрій",
        date: "03.07.2023",
        text: "Потрібна була техніка з харчовим допуском коліс. Підібрали PU-ролики, документи надіслали того ж дня.",
        imageSrc: "/images/reviews/review-5.jpg",
        imageAlt: "Складська техніка на фармацевтичному складі",
      },
      {
        company: "ТОВ «Нова Пошта»",
        author: "Шевченко Ігор",
        date: "21.05.2023",
        text: "Рокли витримали пікове навантаження сезону. Гарантійне обслуговування — без зайвих поїздок.",
        imageSrc: "/images/reviews/review-6.jpg",
        imageAlt: "Рокла в логістичному хабі",
      },
      {
        company: "ТОВ «Епіцентр К»",
        author: "Бондар Марія",
        date: "14.02.2023",
        text: "Брали посилені моделі 2,5 т під важкі палети. Шасі не грає, гідравліка стабільна після року роботи.",
        imageSrc: "/images/reviews/review-1.jpg",
        imageAlt: "Посилена рокла на будівельному складі",
      },
      {
        company: "ТОВ «Комфі Трейд»",
        author: "Лисенко Віктор",
        date: "08.12.2022",
        text: "Доставили в Дніпро за добу після оплати. Менеджер пояснив різницю між кованим і збірним гідровузлом.",
        imageSrc: "/images/reviews/review-2.jpg",
        imageAlt: "Рокла в магазині техніки",
      },
    ],
  },
  videos: {
    title: "Відеоогляди",
    subtitle:
      "Короткі огляди техніки KAISER: збірка, гідровузол і робота на складі.",
    items: [
      {
        title: "Збірка гідравлічної рокли",
        imageSrc: "/images/products/pallet-truck-2t-1.jpg",
        imageAlt: "Відео: збірка гідравлічної рокли",
      },
      {
        title: "Принцип роботи гідровузла",
        imageSrc: "/images/products/pallet-truck-2t-2.jpg",
        imageAlt: "Відео: принцип роботи гідровузла",
      },
      {
        title: "Огляд посиленої моделі 2,5 т",
        imageSrc: "/images/products/pallet-truck-heavy-1.jpg",
        imageAlt: "Відео: огляд посиленої рокли",
      },
      {
        title: "Рокла з довгими вилами на складі",
        imageSrc: "/images/products/pallet-truck-long-1.jpg",
        imageAlt: "Відео: рокла з довгими вилами",
      },
    ],
  },
  faq: {
    title: "Часті запитання",
    items: [
      {
        question: "Ємність і підйомність рокли?",
        answer:
          "Базові гідравлічні рохлі — 2000 кг, посилені моделі — до 2500 кг. Довжина вил 1150–1500 мм. Точні параметри підтверджуємо під вашу палету.",
      },
      {
        question: "Чи є доставка по Україні?",
        answer:
          "Так. Київ — часто в день звернення; регіони — від 1 дня після оплати з повним комплектом документів.",
      },
      {
        question: "Яка гарантія на техніку?",
        answer:
          "12 місяців базової гарантії. Для штабелерів, рокл і навантажувачів доступна розширена гарантія до 24 місяців.",
      },
      {
        question: "Які файли можна додати до заявки?",
        answer:
          "PDF, JPG і PNG — реквізити, креслення чи специфікації в межах типових поштових вкладень.",
      },
      {
        question: "Як швидко відповідаєте на заявки?",
        answer:
          "Менеджер зв’язується протягом робочого дня, зазвичай протягом 24 годин.",
      },
    ],
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
  product: {
    eyebrow: "Товар",
    requestQuote: "Запит ціни",
    buyCta: "Купити",
    orderCta: "Замовити",
    skuLabel: "Артикул",
    relatedTitle: "Схожі товари",
    specifications: "Характеристики",
    imagePlaceholder: "Зображення відсутнє",
    thumbPlaceholder: "Мініатюра",
    tabs: {
      description: "Опис",
      specifications: "Характеристики",
    },
    breadcrumbs: {
      home: "Головна",
      catalog: "Каталог",
      category: "Гідравлічні візки",
    },
  },
  consultation: {
    title: "Потрібна допомога з вибором?",
    benefits: [
      "Допоможемо підібрати під ваші задачі",
      "Індивідуальний розрахунок вартості",
      "Відповідь протягом 15 хвилин",
    ],
    fullName: "Ім’я",
    phone: "Телефон",
    email: "Email",
    submit: "Отримати консультацію",
    success: "Заявку прийнято. Менеджер зателефонує.",
    imageSrc: "/images/consultation/manager.jpg",
    imageAlt: "Менеджер KAISER",
    errors: {
      fullName: "Вкажіть ім’я (мінімум 2 символи).",
      email: "Вкажіть коректний email.",
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
      { label: "Обслуговування / колеса", href: "#catalog" },
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
    copyright: "© KAISER. Усі права захищено.",
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
        label: "Instagram",
        href: "https://www.instagram.com/",
        network: "instagram",
      },
      {
        label: "Viber",
        href: "viber://chat?number=%2B380981540982",
        network: "viber",
      },
    ],
  },
};

const DICTIONARY_RU: Dictionary = {
  header: {
    brand: "KAISER",
    tagline: "Официальный представитель / Продажа, сервис и ремонт по всей Украине",
    nav: {
      about: "О компании",
      catalog: "Каталог",
      promos: "Акции",
      services: "Услуги",
      reviews: "Отзывы",
      contacts: "Контакты",
    },
    phone: "+380 (98) 154-09-82",
    requestCall: "Заказать звонок",
    language: "Язык",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
  },
  hero: {
    title: "Купить роклу (рохлю) — немецкое качество KAISER",
    titleHighlights: ["роклу (рохлю)", "KAISER"],
    subtitle: "20 лет на рынке в Украине",
    promo: "Скидки до 18%. Гарантия 24 месяца.",
    promoNote: "* Детальную информацию уточняйте у менеджера",
    trustBadges: [
      "Отгрузка за 30 мин",
      "Оплата с НДС",
      "Гарантия 24 мес",
    ],
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
    errors: {
      fullName: "Укажите имя (минимум 2 символа).",
      phone: "Укажите телефон в формате +380 (XX) XXX-XX-XX.",
    },
  },
  branches: {
    title: "Контактная информация",
    phoneLabel: "Телефон",
    emailLabel: "Email",
    addressLabel: "Адрес",
    hoursLabel: "Режим работы",
    warehouses: WAREHOUSES_RU,
  },
  reviews: {
    title: "Отзывы наших клиентов",
    items: [
      {
        company: "ООО «ЛАЙФСЕ ЛЛ»",
        author: "Языджи Исмет",
        date: "12.03.2024",
        text: "Покупали самоходный штабеллер. Показали модель до оплаты, доставили за 2 дня — чётко и организованно.",
        imageSrc: "/images/reviews/review-1.jpg",
        imageAlt: "Техника KAISER у клиента",
      },
      {
        company: "ООО «НОША»",
        author: "Гнатенко Сергей",
        date: "28.01.2024",
        text: "Роклу доставили в Ужгород через два дня. Техника отличная, консультация по сборке помогла.",
        imageSrc: "/images/reviews/review-2.jpg",
        imageAlt: "Рокла в работе на складе клиента",
      },
      {
        company: "ООО «ОККО-ХОЛДИНГ»",
        author: "Рассказов Дмитрий",
        date: "05.11.2023",
        text: "Предложили вариант с переменной АКБ, показали на складе и даже тест-драйв. Будем сотрудничать.",
        imageSrc: "/images/reviews/review-3.jpg",
        imageAlt: "Погрузчик на объекте клиента",
      },
      {
        company: "ООО «АТБ-МАРКЕТ»",
        author: "Коваленко Елена",
        date: "19.09.2023",
        text: "Заказали партию гидравлических рокл для распределительного центра. Все машины с одинаковыми узлами — удобно для сервиса.",
        imageSrc: "/images/reviews/review-4.jpg",
        imageAlt: "Роклы на складе ритейлера",
      },
      {
        company: "ЧАО «Фармак»",
        author: "Мельник Андрей",
        date: "03.07.2023",
        text: "Нужна была техника с пищевым допуском колёс. Подобрали PU-ролики, документы отправили в тот же день.",
        imageSrc: "/images/reviews/review-5.jpg",
        imageAlt: "Складская техника на фармацевтическом складе",
      },
      {
        company: "ООО «Новая Почта»",
        author: "Шевченко Игорь",
        date: "21.05.2023",
        text: "Роклы выдержали пиковую нагрузку сезона. Гарантийное обслуживание — без лишних поездок.",
        imageSrc: "/images/reviews/review-6.jpg",
        imageAlt: "Рокла в логистическом хабе",
      },
      {
        company: "ООО «Эпицентр К»",
        author: "Бондарь Мария",
        date: "14.02.2023",
        text: "Брали усиленные модели 2,5 т под тяжёлые паллеты. Шасси не играет, гидравлика стабильна после года работы.",
        imageSrc: "/images/reviews/review-1.jpg",
        imageAlt: "Усиленная рокла на строительном складе",
      },
      {
        company: "ООО «Комфи Трейд»",
        author: "Лысенко Виктор",
        date: "08.12.2022",
        text: "Доставили в Днепр за сутки после оплаты. Менеджер объяснил разницу между кованым и сборным гидроузлом.",
        imageSrc: "/images/reviews/review-2.jpg",
        imageAlt: "Рокла в магазине техники",
      },
    ],
  },
  videos: {
    title: "Видеообзоры",
    subtitle:
      "Короткие обзоры техники KAISER: сборка, гидроузел и работа на складе.",
    items: [
      {
        title: "Сборка гидравлической роклы",
        imageSrc: "/images/products/pallet-truck-2t-1.jpg",
        imageAlt: "Видео: сборка гидравлической роклы",
      },
      {
        title: "Принцип работы гидроузла",
        imageSrc: "/images/products/pallet-truck-2t-2.jpg",
        imageAlt: "Видео: принцип работы гидроузла",
      },
      {
        title: "Обзор усиленной модели 2,5 т",
        imageSrc: "/images/products/pallet-truck-heavy-1.jpg",
        imageAlt: "Видео: обзор усиленной роклы",
      },
      {
        title: "Рокла с длинными вилами на складе",
        imageSrc: "/images/products/pallet-truck-long-1.jpg",
        imageAlt: "Видео: рокла с длинными вилами",
      },
    ],
  },
  faq: {
    title: "Часто задаваемые вопросы",
    items: [
      {
        question: "Ёмкость и подъёмность роклы?",
        answer:
          "Базовые гидравлические рохли — 2000 кг, усиленные модели — до 2500 кг. Длина вил 1150–1500 мм. Точные параметры подтверждаем под ваш поддон.",
      },
      {
        question: "Есть ли доставка по Украине?",
        answer:
          "Да. Киев — часто в день обращения; регионы — от 1 дня после оплаты с полным комплектом документов.",
      },
      {
        question: "Какая гарантия на технику?",
        answer:
          "12 месяцев базовой гарантии. Для штабелёров, рокл и погрузчиков доступна расширенная гарантия до 24 месяцев.",
      },
      {
        question: "Какие файлы можно приложить к заявке?",
        answer:
          "PDF, JPG и PNG — реквизиты, чертежи или спецификации в пределах типичных почтовых вложений.",
      },
      {
        question: "Как быстро отвечаете на заявки?",
        answer:
          "Менеджер связывается в течение рабочего дня, обычно в течение 24 часов.",
      },
    ],
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
  product: {
    eyebrow: "Товар",
    requestQuote: "Запрос цены",
    buyCta: "Купить",
    orderCta: "Заказать",
    skuLabel: "Артикул",
    relatedTitle: "Похожие товары",
    specifications: "Характеристики",
    imagePlaceholder: "Изображение отсутствует",
    thumbPlaceholder: "Миниатюра",
    tabs: {
      description: "Описание",
      specifications: "Характеристики",
    },
    breadcrumbs: {
      home: "Главная",
      catalog: "Каталог",
      category: "Гидравлические тележки",
    },
  },
  consultation: {
    title: "Нужна помощь с выбором?",
    benefits: [
      "Поможем подобрать под ваши задачи",
      "Индивидуальный расчет стоимости",
      "Ответ в течение 15 минут",
    ],
    fullName: "Имя",
    phone: "Телефон",
    email: "Email",
    submit: "Получить консультацию",
    success: "Заявку приняли. Менеджер перезвонит.",
    imageSrc: "/images/consultation/manager.jpg",
    imageAlt: "Менеджер KAISER",
    errors: {
      fullName: "Укажите имя (минимум 2 символа).",
      email: "Укажите корректный email.",
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
      { label: "Обслуживание / колёса", href: "#catalog" },
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
    copyright: "© KAISER. Все права защищены.",
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
        label: "Instagram",
        href: "https://www.instagram.com/",
        network: "instagram",
      },
      {
        label: "Viber",
        href: "viber://chat?number=%2B380981540982",
        network: "viber",
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
