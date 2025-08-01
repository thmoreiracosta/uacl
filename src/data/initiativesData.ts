// initiativesData.ts
export interface Initiative {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  instagram: string;
  instagramUser: string;
  
}

export const initiatives: Initiative[] = [
  {
    id: '1',
    title: 'SEMINÁRIO DE EMPRESÁRIOS CATÓLICOS',
    description: 'O Seminário para Empresários Católicos, é mais do que um evento, é uma experiência que conecta profissionais que acreditam na força da espiritualidade para transformar a sociedade.',
    image: '../src/assets/sec.jpeg',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    instagram: 'https://www.instagram.com/empresarioscatolicos/',
    instagramUser: '@empresarioscatolicos',
  },
  {
    id: '2',
    title: 'ALÍVIO DO SOFRIMENTO',
    description: 'Nossa iniciativa que conta com médicos, enfermeiros e outros profissionais da saúde, para o atendimento e tratamento dos mais necessitados.',
    image: '../src/assets/ads.jpeg',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    instagram: 'https://www.instagram.com/aliviodosofrimento/',
    instagramUser: '@aliviodosofrimento',
  },
  {
    id: '3',
    title: 'ESCOLA DE CATEQUESE SÃO PIO X',
    description: 'A Escola de Catequese São Pio X é voltada tanto para a formação de catequistas dedicados às paróquias quanto à catequese informal do cotidiano, na família, no trabalho e na sociedade.',
    image: '../src/assets/ecspx.jpg',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    instagram: 'https://www.instagram.com/ec.spx/',
    instagramUser: '@ec.spx',
  },  
];
