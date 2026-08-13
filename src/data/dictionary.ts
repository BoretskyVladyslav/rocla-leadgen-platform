import { resolveLocale, type Locale } from "@/lib/i18n";

export interface Warehouse {
  id: string;
  city: string;
  address: string;
  hours: string;
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
    subtitle: string;
    trustBadges: string[];
    name: string;
    phone: string;
    submit: string;
    success: string;
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
    logos: Array<{ name: string }>;
  };
  caseStudy: {
    title: string;
    paragraphs: string[];
    readMore: string;
    imageSrc: string;
    imageAlt: string;
  };
  delivery: {
    title: string;
    from: string;
    to: string;
    phone: string;
    submit: string;
    success: string;
    partnersTitle: string;
    partners: string[];
    warehousesHint: string;
    warehouseOfficeLabel: string;
    warehouseHoursLabel: string;
    warehouses: Warehouse[];
    errors: {
      from: string;
      to: string;
      phone: string;
    };
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
    phone: string;
    email: string;
    catalogTitle: string;
    catalogLinks: Array<{ label: string; href: string }>;
    navTitle: string;
    navLinks: Array<{ label: string; href: string }>;
    addressTitle: string;
    address: string;
    copyright: string;
  };
}

const WAREHOUSES_UK: Warehouse[] = [
  {
    id: "kyiv",
    city: "Київ",
    address: "Дніпровська наб., 13-В",
    hours: "09:00 - 17:00",
  },
  {
    id: "dnipro",
    city: "Дніпро",
    address: "Запорізьке шосе, 62",
    hours: "09:00 - 18:00",
  },
  {
    id: "kharkiv",
    city: "Харків",
    address: "пр-т Аеропорту (Гагаріна), 352",
    hours: "09:00 - 18:00",
  },
  {
    id: "lviv",
    city: "Львів",
    address: "вул. Б. Хмельницького, 188-А",
    hours: "09:00 - 18:00",
  },
  {
    id: "vinnytsia",
    city: "Вінниця",
    address: "вул. Батозька, 1-В",
    hours: "09:00 - 18:00",
  },
  {
    id: "zhytomyr",
    city: "Житомир",
    address: "Київське шосе, 4/2",
    hours: "09:00 - 18:00",
  },
];

const WAREHOUSES_RU: Warehouse[] = [
  {
    id: "kyiv",
    city: "Киев",
    address: "Днепровская наб., 13-В",
    hours: "09:00 - 17:00",
  },
  {
    id: "dnipro",
    city: "Днепр",
    address: "Запорожское шоссе, 62",
    hours: "09:00 - 18:00",
  },
  {
    id: "kharkiv",
    city: "Харьков",
    address: "пр-т Аэропорта (Гагарина), 352",
    hours: "09:00 - 18:00",
  },
  {
    id: "lviv",
    city: "Львов",
    address: "ул. Б. Хмельницкого, 188-А",
    hours: "09:00 - 18:00",
  },
  {
    id: "vinnytsia",
    city: "Винница",
    address: "ул. Батозская (Ботожская), 1-В",
    hours: "09:00 - 18:00",
  },
  {
    id: "zhytomyr",
    city: "Житомир",
    address: "Киевское шоссе, 4/2",
    hours: "09:00 - 18:00",
  },
];

const CATEGORY_IMAGES = {
  pallet: "/images/products/pallet-truck-2t-1.jpg",
  stacker: "/images/products/pallet-truck-long-1.jpg",
  table: "/images/products/pallet-truck-2t-2.jpg",
  service: "/images/products/pallet-truck-long-2.jpg",
  reach: "/images/products/pallet-truck-heavy-1.jpg",
  forklift: "/images/products/pallet-truck-heavy-2.jpg",
  lift: "/images/products/pallet-truck-2t-1.jpg",
  parts: "/images/products/pallet-truck-long-2.jpg",
} as const;

const DICTIONARY_UK: Dictionary = {
  header: {
    brand: "KAISER",
    tagline: "Складська техніка",
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
    subtitle: "20 років на ринку в Україні",
    trustBadges: [
      "Відвантаження за 30 хв",
      "Оплата з ПДВ",
      "Гарантія 24 міс",
    ],
    name: "Ім’я",
    phone: "Телефон",
    submit: "Підібрати",
    success: "Заявку прийнято. Менеджер зателефонує.",
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
        title: "Гідравлічні візки (рохлі)",
        subtitle: "від 2000 до 2500 кг",
        priceLabel: "від 8 900 ₴",
        imageSrc: CATEGORY_IMAGES.pallet,
        imageAlt: "Гідравлічна рохля",
        productSlug: "hydraulic-pallet-truck-2t",
      },
      {
        title: "Штабелери",
        subtitle: "від 1 000 до 2 000 кг",
        priceLabel: "від 12 500 ₴",
        imageSrc: CATEGORY_IMAGES.stacker,
        imageAlt: "Штабелер",
      },
      {
        title: "Гідравлічні столи",
        subtitle: "від 500 до 2 000 кг",
        priceLabel: "від 12 500 ₴",
        imageSrc: CATEGORY_IMAGES.table,
        imageAlt: "Гідравлічний стіл",
      },
      {
        title: "Обслуговування / колеса",
        subtitle: "ремонт, колеса, ТО",
        priceLabel: "за запитом",
        imageSrc: CATEGORY_IMAGES.service,
        imageAlt: "Обслуговування складської техніки",
      },
      {
        title: "Річтраки",
        subtitle: "від 1 400 до 2 500 кг",
        priceLabel: "під замовлення",
        imageSrc: CATEGORY_IMAGES.reach,
        imageAlt: "Річтрак",
      },
      {
        title: "Навантажувачі",
        subtitle: "від 1 500 до 3 500 кг",
        priceLabel: "під замовлення",
        imageSrc: CATEGORY_IMAGES.forklift,
        imageAlt: "Навантажувач",
      },
      {
        title: "Підйомники / вишки",
        subtitle: "висота до 12 м",
        priceLabel: "під замовлення",
        imageSrc: CATEGORY_IMAGES.lift,
        imageAlt: "Підйомник",
      },
      {
        title: "Запчастини та аксесуари",
        subtitle: "гідравліка, ролики, вила",
        priceLabel: "за запитом",
        imageSrc: CATEGORY_IMAGES.parts,
        imageAlt: "Запчастини для рокл",
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
        label: "Німецька якість",
        description:
          "Комплектуючі та гідравліка європейського класу для щоденної складської роботи.",
      },
      {
        label: "20 років на ринку України",
        description:
          "Постачаємо рокли, штабелери та навантажувачі підприємствам по всій країні.",
      },
      {
        label: "Доставка по Україні",
        description:
          "Київ — часто в день звернення; регіони — від 1 дня після оплати з документами.",
      },
      {
        label: "Офіційний сервіс",
        description:
          "Стаціонарний і виїзний ремонт, діагностика гідравліки та заміна вузлів.",
      },
      {
        label: "Гарантія до 24 місяців",
        description:
          "Базова гарантія 12 місяців; розширена — на штабелери, рокли та навантажувачі.",
      },
      {
        label: "Склад запчастин",
        description:
          "Колеса, підшипники, гідравлічні вузли та витратні матеріали в наявності.",
      },
      {
        label: "Підбір під задачу",
        description:
          "Менеджер підбере вантажопідйомність, довжину вил і комплектацію під ваш склад.",
      },
      {
        label: "Документи для юросіб",
        description:
          "Рахунок, видаткова, гарантійний талон і повний пакет для бухгалтерії.",
      },
    ],
  },
  clients: {
    title: "Наші постійні клієнти",
    logos: [
      { name: "Нова Пошта" },
      { name: "Епіцентр" },
      { name: "АТБ" },
      { name: "Розетка" },
      { name: "ОККО" },
      { name: "Comfy" },
    ],
  },
  caseStudy: {
    title: "Більше 4 000 підприємств обрали техніку KAISER",
    paragraphs: [
      "Щодня наша техніка працює на складах, у логістичних хабах і на рампі виробництва — там, де від надійної рокли залежить зміна цілої команди.",
      "Ми не просто продаємо гідравлічні візки. Ми закриваємо простої, підбираємо вузли під навантаження і тримаємо сервіс так, щоб зміна не зупинялась.",
      "За 20 років сотні підприємств стали постійними клієнтами. За кожним контрактом — люди, які годують свої сім’ї стабільною роботою на складі.",
    ],
    readMore: "Читати далі",
    imageSrc: "/images/hero/rokla-hero.jpg",
    imageAlt: "Робота з роклою на складі",
  },
  delivery: {
    title: "Розрахувати вартість доставки",
    from: "Звідки",
    to: "Куди",
    phone: "Телефон",
    submit: "Розрахувати",
    success: "Заявку на розрахунок прийнято.",
    partnersTitle: "Бренди, які нам довіряють",
    partners: ["Нова Пошта", "Епіцентр", "АТБ", "Розетка", "ОККО", "Comfy"],
    warehousesHint: "Оберіть офіс-склад відвантаження:",
    warehouseOfficeLabel: "Офіс-склад",
    warehouseHoursLabel: "Режим роботи",
    warehouses: WAREHOUSES_UK,
    errors: {
      from: "Вкажіть місто відправлення.",
      to: "Вкажіть місто доставки.",
      phone: "Вкажіть телефон у форматі +380 (XX) XXX-XX-XX.",
    },
  },
  reviews: {
    title: "Відгуки наших клієнтів",
    items: [
      {
        company: "ТОВ «ЛАЙФСЕ ЛЛ»",
        author: "Язиджи Ісмет",
        date: "12.03.2024",
        text: "Купували самохідний штабелер. Показали модель до оплати, доставили за 2 дні — чітко й організовано.",
        imageSrc: "/images/clients/client-1.jpg",
        imageAlt: "Техніка KAISER у клієнта",
      },
      {
        company: "ТОВ «НОША»",
        author: "Гнатенко Сергій",
        date: "28.01.2024",
        text: "Роклу доставили в Ужгород через два дні. Техніка відмінна, консультація зі збірки допомогла.",
        imageSrc: "/images/clients/client-2.jpg",
        imageAlt: "Рокла в роботі на складі клієнта",
      },
      {
        company: "ТОВ «ОККО-ХОЛДИНГ»",
        author: "Рассказов Дмитро",
        date: "05.11.2023",
        text: "Запропонували варіант із змінною АКБ, показали на складі й навіть тест-драйв. Працюватимемо далі.",
        imageSrc: "/images/clients/client-3.jpg",
        imageAlt: "Навантажувач на об’єкті клієнта",
      },
      {
        company: "ТОВ «АТБ-МАРКЕТ»",
        author: "Коваленко Олена",
        date: "19.09.2023",
        text: "Замовили партію гідравлічних рокл для розподільчого центру. Усі машини з однаковими вузлами — зручно для сервісу.",
        imageSrc: "/images/clients/client-4.jpg",
        imageAlt: "Рокли на складі ритейлера",
      },
      {
        company: "ПрАТ «Фармак»",
        author: "Мельник Андрій",
        date: "03.07.2023",
        text: "Потрібна була техніка з харчовим допуском коліс. Підібрали PU-ролики, документи надіслали того ж дня.",
        imageSrc: "/images/clients/client-5.jpg",
        imageAlt: "Складська техніка на фармацевтичному складі",
      },
      {
        company: "ТОВ «Нова Пошта»",
        author: "Шевченко Ігор",
        date: "21.05.2023",
        text: "Рокли витримали пікове навантаження сезону. Гарантійне обслуговування — без зайвих поїздок.",
        imageSrc: "/images/clients/client-6.jpg",
        imageAlt: "Рокла в логістичному хабі",
      },
      {
        company: "ТОВ «Епіцентр К»",
        author: "Бондар Марія",
        date: "14.02.2023",
        text: "Брали посилені моделі 2,5 т під важкі палети. Шасі не грає, гідравліка стабільна після року роботи.",
        imageSrc: "/images/clients/client-1.jpg",
        imageAlt: "Посилена рокла на будівельному складі",
      },
      {
        company: "ТОВ «Комфі Трейд»",
        author: "Лисенко Віктор",
        date: "08.12.2022",
        text: "Доставили в Дніпро за добу після оплати. Менеджер пояснив різницю між кованим і збірним гідровузлом.",
        imageSrc: "/images/clients/client-2.jpg",
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
  footer: {
    brand: "KAISER",
    phone: "+380 (98) 154-09-82",
    email: "rokla-ag@ukr.net",
    catalogTitle: "Каталог",
    catalogLinks: [
      { label: "Рохлі", href: "#catalog" },
      { label: "Штабелери", href: "#catalog" },
      { label: "Навантажувачі", href: "#catalog" },
      { label: "Запчастини", href: "#catalog" },
    ],
    navTitle: "Навігація",
    navLinks: [
      { label: "Про компанію", href: "#about" },
      { label: "Послуги", href: "#services" },
      { label: "Відгуки", href: "#reviews" },
      { label: "Контакти", href: "#contact" },
    ],
    addressTitle: "Адреса",
    address: "Україна, м. Київ, склад і сервіс KAISER",
    copyright: "© KAISER. Усі права захищено.",
  },
};

const DICTIONARY_RU: Dictionary = {
  header: {
    brand: "KAISER",
    tagline: "Складская техника",
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
    subtitle: "20 лет на рынке в Украине",
    trustBadges: [
      "Отгрузка за 30 мин",
      "Оплата с НДС",
      "Гарантия 24 мес",
    ],
    name: "Имя",
    phone: "Телефон",
    submit: "Подобрать",
    success: "Заявка принята. Менеджер перезвонит.",
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
        title: "Гидравлические тележки (рохли)",
        subtitle: "от 2000 до 2500 кг",
        priceLabel: "от 8 900 ₴",
        imageSrc: CATEGORY_IMAGES.pallet,
        imageAlt: "Гидравлическая рохля",
        productSlug: "hydraulic-pallet-truck-2t",
      },
      {
        title: "Штабелёры",
        subtitle: "от 1 000 до 2 000 кг",
        priceLabel: "от 12 500 ₴",
        imageSrc: CATEGORY_IMAGES.stacker,
        imageAlt: "Штабелёр",
      },
      {
        title: "Гидравлические столы",
        subtitle: "от 500 до 2 000 кг",
        priceLabel: "от 12 500 ₴",
        imageSrc: CATEGORY_IMAGES.table,
        imageAlt: "Гидравлический стол",
      },
      {
        title: "Обслуживание / колёса",
        subtitle: "ремонт, колёса, ТО",
        priceLabel: "по запросу",
        imageSrc: CATEGORY_IMAGES.service,
        imageAlt: "Обслуживание складской техники",
      },
      {
        title: "Ричтраки",
        subtitle: "от 1 400 до 2 500 кг",
        priceLabel: "под заказ",
        imageSrc: CATEGORY_IMAGES.reach,
        imageAlt: "Ричтрак",
      },
      {
        title: "Погрузчики",
        subtitle: "от 1 500 до 3 500 кг",
        priceLabel: "под заказ",
        imageSrc: CATEGORY_IMAGES.forklift,
        imageAlt: "Погрузчик",
      },
      {
        title: "Подъёмники / вышки",
        subtitle: "высота до 12 м",
        priceLabel: "под заказ",
        imageSrc: CATEGORY_IMAGES.lift,
        imageAlt: "Подъёмник",
      },
      {
        title: "Запчасти и аксессуары",
        subtitle: "гидравлика, ролики, вилы",
        priceLabel: "по запросу",
        imageSrc: CATEGORY_IMAGES.parts,
        imageAlt: "Запчасти для рокл",
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
        label: "Немецкое качество",
        description:
          "Комплектующие и гидравлика европейского класса для ежедневной складской работы.",
      },
      {
        label: "20 лет на рынке Украины",
        description:
          "Поставляем роклы, штабелёры и погрузчики предприятиям по всей стране.",
      },
      {
        label: "Доставка по Украине",
        description:
          "Киев — часто в день обращения; регионы — от 1 дня после оплаты с документами.",
      },
      {
        label: "Официальный сервис",
        description:
          "Стационарный и выездной ремонт, диагностика гидравлики и замена узлов.",
      },
      {
        label: "Гарантия до 24 месяцев",
        description:
          "Базовая гарантия 12 месяцев; расширенная — на штабелёры, роклы и погрузчики.",
      },
      {
        label: "Склад запчастей",
        description:
          "Колёса, подшипники, гидравлические узлы и расходники в наличии.",
      },
      {
        label: "Подбор под задачу",
        description:
          "Менеджер подберёт грузоподъёмность, длину вил и комплектацию под ваш склад.",
      },
      {
        label: "Документы для юрлиц",
        description:
          "Счёт, расходная, гарантийный талон и полный пакет для бухгалтерии.",
      },
    ],
  },
  clients: {
    title: "Наши постоянные клиенты",
    logos: [
      { name: "Новая Почта" },
      { name: "Эпицентр" },
      { name: "АТБ" },
      { name: "Розетка" },
      { name: "ОККО" },
      { name: "Comfy" },
    ],
  },
  caseStudy: {
    title: "Более 4 000 предприятий выбрали технику KAISER",
    paragraphs: [
      "Каждый день наша техника работает на складах, в логистических хабах и на рампе производства — там, где от надёжной роклы зависит смена целой команды.",
      "Мы не просто продаём гидравлические тележки. Мы закрываем простои, подбираем узлы под нагрузку и держим сервис так, чтобы смена не останавливалась.",
      "За 20 лет сотни предприятий стали постоянными клиентами. За каждым контрактом — люди, которые кормят свои семьи стабильной работой на складе.",
    ],
    readMore: "Читать далее",
    imageSrc: "/images/hero/rokla-hero.jpg",
    imageAlt: "Работа с роклой на складе",
  },
  delivery: {
    title: "Рассчитать стоимость доставки",
    from: "Откуда",
    to: "Куда",
    phone: "Телефон",
    submit: "Рассчитать",
    success: "Заявка на расчёт принята.",
    partnersTitle: "Бренды, которые нам доверяют",
    partners: ["Новая Почта", "Эпицентр", "АТБ", "Розетка", "ОККО", "Comfy"],
    warehousesHint: "Выберите офис-склад отгрузки:",
    warehouseOfficeLabel: "Офис-склад",
    warehouseHoursLabel: "Режим работы",
    warehouses: WAREHOUSES_RU,
    errors: {
      from: "Укажите город отправления.",
      to: "Укажите город доставки.",
      phone: "Укажите телефон в формате +380 (XX) XXX-XX-XX.",
    },
  },
  reviews: {
    title: "Отзывы наших клиентов",
    items: [
      {
        company: "ООО «ЛАЙФСЕ ЛЛ»",
        author: "Языджи Исмет",
        date: "12.03.2024",
        text: "Покупали самоходный штабеллер. Показали модель до оплаты, доставили за 2 дня — чётко и организованно.",
        imageSrc: "/images/clients/client-1.jpg",
        imageAlt: "Техника KAISER у клиента",
      },
      {
        company: "ООО «НОША»",
        author: "Гнатенко Сергей",
        date: "28.01.2024",
        text: "Роклу доставили в Ужгород через два дня. Техника отличная, консультация по сборке помогла.",
        imageSrc: "/images/clients/client-2.jpg",
        imageAlt: "Рокла в работе на складе клиента",
      },
      {
        company: "ООО «ОККО-ХОЛДИНГ»",
        author: "Рассказов Дмитрий",
        date: "05.11.2023",
        text: "Предложили вариант с переменной АКБ, показали на складе и даже тест-драйв. Будем сотрудничать.",
        imageSrc: "/images/clients/client-3.jpg",
        imageAlt: "Погрузчик на объекте клиента",
      },
      {
        company: "ООО «АТБ-МАРКЕТ»",
        author: "Коваленко Елена",
        date: "19.09.2023",
        text: "Заказали партию гидравлических рокл для распределительного центра. Все машины с одинаковыми узлами — удобно для сервиса.",
        imageSrc: "/images/clients/client-4.jpg",
        imageAlt: "Роклы на складе ритейлера",
      },
      {
        company: "ЧАО «Фармак»",
        author: "Мельник Андрей",
        date: "03.07.2023",
        text: "Нужна была техника с пищевым допуском колёс. Подобрали PU-ролики, документы отправили в тот же день.",
        imageSrc: "/images/clients/client-5.jpg",
        imageAlt: "Складская техника на фармацевтическом складе",
      },
      {
        company: "ООО «Новая Почта»",
        author: "Шевченко Игорь",
        date: "21.05.2023",
        text: "Роклы выдержали пиковую нагрузку сезона. Гарантийное обслуживание — без лишних поездок.",
        imageSrc: "/images/clients/client-6.jpg",
        imageAlt: "Рокла в логистическом хабе",
      },
      {
        company: "ООО «Эпицентр К»",
        author: "Бондарь Мария",
        date: "14.02.2023",
        text: "Брали усиленные модели 2,5 т под тяжёлые паллеты. Шасси не играет, гидравлика стабильна после года работы.",
        imageSrc: "/images/clients/client-1.jpg",
        imageAlt: "Усиленная рокла на строительном складе",
      },
      {
        company: "ООО «Комфи Трейд»",
        author: "Лысенко Виктор",
        date: "08.12.2022",
        text: "Доставили в Днепр за сутки после оплаты. Менеджер объяснил разницу между кованым и сборным гидроузлом.",
        imageSrc: "/images/clients/client-2.jpg",
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
  footer: {
    brand: "KAISER",
    phone: "+380 (98) 154-09-82",
    email: "rokla-ag@ukr.net",
    catalogTitle: "Каталог",
    catalogLinks: [
      { label: "Рохли", href: "#catalog" },
      { label: "Штабелёры", href: "#catalog" },
      { label: "Погрузчики", href: "#catalog" },
      { label: "Запчасти", href: "#catalog" },
    ],
    navTitle: "Навигация",
    navLinks: [
      { label: "О компании", href: "#about" },
      { label: "Услуги", href: "#services" },
      { label: "Отзывы", href: "#reviews" },
      { label: "Контакты", href: "#contact" },
    ],
    addressTitle: "Адрес",
    address: "Украина, г. Киев, склад и сервис KAISER",
    copyright: "© KAISER. Все права защищены.",
  },
};

const DICTIONARIES: Record<Locale, Dictionary> = {
  uk: DICTIONARY_UK,
  ru: DICTIONARY_RU,
};

export function getDictionary(lang: string): Dictionary {
  return DICTIONARIES[resolveLocale(lang)];
}
