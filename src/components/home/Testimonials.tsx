import { testimonials } from '../../data/testimonialsData';

export const Testimonials = () => {
  const latestTestimonials = [...testimonials]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <div className="h-px bg-secondary w-12 mr-4"></div>
            <span className="text-secondary uppercase tracking-widest text-sm">Depoimentos</span>
            <div className="h-px bg-secondary w-12 ml-4"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
            O que dizem nossos membros
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mt-4"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {latestTestimonials.map((t) => (
            <div key={t.id} className="bg-cream p-6 border-t-4 border-primary">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h3 className="font-medium text-primary">{t.name}</h3>
                  <p className="text-sm text-gray-600">{t.since}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{t.message}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
