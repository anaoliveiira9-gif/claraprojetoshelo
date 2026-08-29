export type MenuItem = {
  name: string;
  description: string;
  price: string;
};

export type MenuCategory = {
  id: string;
  label: string;
  items: MenuItem[];
};

/** Fictional fine-dining menu for the fictional restaurant Noir. */
export const MENU: MenuCategory[] = [
  {
    id: "entradas",
    label: "Entradas",
    items: [
      {
        name: "Polvo em brasa e purê de mandioquinha",
        description: "Azeite de ervas finas, limão siciliano e páprica defumada.",
        price: "R$ 68",
      },
      {
        name: "Tartar de atum com gengibre",
        description: "Cebolinha crocante, gema curada e óleo de gergelim tostado.",
        price: "R$ 74",
      },
      {
        name: "Burrata do dia",
        description: "Tomates confitados, manjericão roxo e pão de fermentação natural.",
        price: "R$ 59",
      },
    ],
  },
  {
    id: "principais",
    label: "Principais",
    items: [
      {
        name: "Filé ao molho de vinho do Porto",
        description: "Batata rösti, cogumelos silvestres e redução de ervas.",
        price: "R$ 128",
      },
      {
        name: "Risoto de cordeiro desfiado",
        description: "Arbóreo, alecrim, parmesão envelhecido 24 meses.",
        price: "R$ 112",
      },
      {
        name: "Cherne grelhado em crosta de ervas",
        description: "Purê de aipim trufado e emulsão de manteiga com limão.",
        price: "R$ 118",
      },
      {
        name: "Magret de pato ao molho de jabuticaba",
        description: "Farofa de castanhas e legumes-raiz assados lentamente.",
        price: "R$ 122",
      },
    ],
  },
  {
    id: "sobremesas",
    label: "Sobremesas",
    items: [
      {
        name: "Fondant de chocolate 70%",
        description: "Sorvete de café e flor de sal.",
        price: "R$ 44",
      },
      {
        name: "Pavê de doce de leite queimado",
        description: "Crocante de castanha-do-pará e chantilly de baunilha.",
        price: "R$ 42",
      },
      {
        name: "Sorbet de frutas vermelhas",
        description: "Espuma de hibisco e migalhas de amêndoa caramelizada.",
        price: "R$ 38",
      },
    ],
  },
  {
    id: "vinhos",
    label: "Vinhos",
    items: [
      {
        name: "Cabernet Sauvignon, Vale dos Vinhedos",
        description: "Corpo encorpado, notas de amora e carvalho tostado.",
        price: "R$ 96 / taça",
      },
      {
        name: "Chardonnay, Serra Gaúcha",
        description: "Fresco e mineral, com final amanteigado sutil.",
        price: "R$ 82 / taça",
      },
      {
        name: "Espumante Brut Nature",
        description: "Borbulhas finas, aroma de maçã verde e brioche.",
        price: "R$ 78 / taça",
      },
    ],
  },
];

/** A short curated subset used for the home page teaser. */
export const MENU_TEASER: MenuItem[] = [
  MENU[0].items[0],
  MENU[1].items[0],
  MENU[1].items[2],
  MENU[2].items[0],
];
