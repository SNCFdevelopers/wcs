export type AboutArticle = {
  title: string;
  slug: string;
  textContent: string;
};

const aboutArticles = [
  {
    title: 'Qui sommes-nous ?',
    slug: 'qui-sommes-nous',
    textContent:
      'De notre organisation, en passant par nos valeurs, jusqu’à notre raison d’être… Découvrez ce qui constitue l’identité et les fondamentaux du groupe SNCF.',
  },
  {
    title: 'Notre stratégie',
    slug: 'notre-strategie',
    textContent:
      'Notre ambition : devenir un champion mondial de la mobilité durable, pour les voyageurs comme pour les marchandises, avec un cœur de métier centré sur le ferroviaire et un pays de référence, la France.',
  },
  {
    title: 'Fournisseurs',
    slug: 'fournisseurs',
    textContent:
      'Vous êtes fournisseur ? Découvrez notre espace dédié, créé spécialement pour faciliter et optimiser votre collaboration avec le groupe SNCF. Naviguez efficacement à travers de nombreux documents et informations utiles.'
  }
];

export default aboutArticles;
