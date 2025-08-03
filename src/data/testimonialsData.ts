export interface Testimonial {
  id: string;
  name: string;
  since: string;
  message: string;
  image: string;
  createdAt: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Maria Silva",
    since: "Membro desde 2018",
    message:
      "A União Apostólica Cardeal Leme transformou minha vida espiritual e intelectual. Os cursos e eventos me ajudaram a aprofundar minha fé e a encontrar respostas para as questões do mundo contemporâneo.",
    image:
      "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdAt: "2024-06-01",
  },
  {
    id: "2",
    name: "João Santos",
    since: "Membro desde 2015",
    message:
      "Encontrei na União Apostólica um espaço de formação sólida e de comunhão fraterna. Os estudos doutrinais e as atividades sociais me ajudaram a integrar fé e vida de maneira concreta.",
    image:
      "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdAt: "2024-06-10",
  },
  {
    id: "3",
    name: "Ana Oliveira",
    since: "Membro desde 2020",
    message:
      "Como jovem católica, encontrei na União Apostólica um lugar onde posso crescer na fé sem abrir mão do rigor intelectual.",
    image:
      "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    createdAt: "2024-07-01",
  },
];
