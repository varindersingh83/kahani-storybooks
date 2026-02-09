export interface ProductDetailsContent {
  title: string;
  description: string;
}

const defaultProductDetails: ProductDetailsContent = {
  title: 'Personalized Storybook',
  description: 'A personalized story crafted to celebrate your child, spark imagination, and create a keepsake your family will treasure.',
};

const productDetailsById: Record<number, ProductDetailsContent> = {
  1: {
    title: 'Our Little One',
    description: 'A heartwarming keepsake celebrating the magic of your baby\'s first years',
  },
  2: {
    title: 'Super Toddler!',
    description: 'An action-packed adventure where your little one saves the day',
  },
  3: {
    title: 'The Adventure of Kevin',
    description: 'A customized tale where your child embarks on a journey of discovery',
  },
  4: {
    title: 'A Little Story',
    description: 'A gentle and charming story perfect for sharing quiet moments together',
  },
  5: {
    title: 'Lily\'s Adventure',
    description: 'A whimsical journey through enchanted woods filled with wonder and delight',
  },
  6: {
    title: 'Ema\'s Grand Adventures',
    description: 'Inspire big dreams with a story about exploring the world\'s wonders',
  },
  101: {
    title: 'The Adventure of Kevin',
    description: 'A timeless tale of curiosity and wonder',
  },
  102: {
    title: 'A Little Story',
    description: 'Simple moments that create lasting memories',
  },
  103: {
    title: 'The Sunbeam Smile',
    description: 'Spreading joy and warmth to everyone around',
  },
  201: {
    title: 'The Dreamer\'s Journey',
    description: 'Where imagination takes flight on wings of wonder',
  },
  202: {
    title: 'Leo\'s Luminous Legends',
    description: 'Shining bright with stories of courage and light',
  },
  203: {
    title: 'Ema\'s Grand Adventures',
    description: 'Discovering the magic hidden in every day',
  },
  301: {
    title: 'Our Little One',
    description: 'Celebrating the tiny miracles that make life big',
  },
  302: {
    title: 'The Adventures of Little Jake',
    description: 'A woodland journey tailored for your little explorer',
  },
  303: {
    title: 'Lily\'s Adventure',
    description: 'Magical moments in a garden of wonder',
  },
  401: {
    title: 'Super Toddler!',
    description: 'Unleash their inner hero with this action-packed tale',
  },
  402: {
    title: 'Super Baby Adventures!',
    description: 'Big adventures for the tiniest of heroes',
  },
  403: {
    title: 'Bubble Master: Adventures of the Soap Hero',
    description: 'Clean fun and bubbly excitement in every page',
  },
  501: {
    title: 'The Adventurer',
    description: 'Ready for play in his favorite everyday outfit',
  },
  502: {
    title: 'Sweet Dreams',
    description: 'Soft colors and comfort for peaceful play',
  },
  503: {
    title: 'Urban Explorer',
    description: 'Stay warm on every outdoor adventure',
  },
  504: {
    title: 'Playful Spirit',
    description: 'Brightening the day with a splash of flowers',
  },
  505: {
    title: 'Best Friends Duo',
    description: 'Double the fun with this inseparable pair',
  },
  506: {
    title: 'The Whole Gang',
    description: 'A complete set of friends for epic storytelling',
  },
};

export function getProductDetails(productId: number): ProductDetailsContent {
  return productDetailsById[productId] ?? defaultProductDetails;
}
