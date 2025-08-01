import React from 'react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary mt-24 md:py-24 relative">
        <div className="absolute inset-0 opacity-10 cross-pattern"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Sobre a União Apostólica <br />
              <span className="text-secondary">Cardeal Leme</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Conheça nossa história, missão e valores que guiam nosso trabalho
              na formação espiritual e intelectual católica.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-px bg-secondary w-12 mr-4"></div>
                <span className="text-secondary uppercase tracking-widest text-sm">Nossa Missão</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                Formação integral na fé e na cultura católica
              </h2>
              <p className="text-gray-700 mb-6">
                A União Apostólica Cardeal Leme tem como missão promover a formação integral
                de seus membros na fé e na cultura católica, inspirada no exemplo e nos
                ensinamentos do Cardeal Dom Sebastião Leme, que foi um grande defensor da
                presença da Igreja na sociedade brasileira.
              </p>
              <p className="text-gray-700 mb-6">
                Buscamos formar líderes católicos comprometidos com a evangelização da cultura
                e a transformação da sociedade segundo os princípios do Evangelho e da Doutrina
                Social da Igreja.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/iniciativas"
                  className="bg-primary text-white px-6 py-3 font-medium hover:bg-primary-dark transition-colors duration-300"
                >
                  Nossas Iniciativas
                </Link>
                <Link
                  to="/seja-membro"
                  className="border border-primary text-primary px-6 py-3 font-medium hover:bg-primary hover:text-white transition-colors duration-300"
                >
                  Seja Membro
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full border-2 border-secondary"></div>
              <div className="bg-white p-2">
                <img
                  src="../src/assets/uacl-1.jpg"
                  alt="Missão da União Apostólica"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-4">
              <div className="h-px bg-secondary w-12 mr-4"></div>
              <span className="text-secondary uppercase tracking-widest text-sm">Nossos Valores</span>
              <div className="h-px bg-secondary w-12 ml-4"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
              Princípios que nos guiam
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-cream p-6 border-t-4 border-primary">
              <h3 className="text-xl font-serif font-bold text-primary mb-3">Fidelidade à Igreja</h3>
              <p className="text-gray-700">
                Compromisso com os ensinamentos do Magistério da Igreja Católica
                e fidelidade ao Papa e aos Bispos em comunhão com ele.
              </p>
            </div>
            <div className="bg-cream p-6 border-t-4 border-primary">
              <h3 className="text-xl font-serif font-bold text-primary mb-3">Formação Integral</h3>
              <p className="text-gray-700">
                Desenvolvimento harmonioso das dimensões espiritual, intelectual,
                humana e apostólica da pessoa.
              </p>
            </div>
            <div className="bg-cream p-6 border-t-4 border-primary">
              <h3 className="text-xl font-serif font-bold text-primary mb-3">Excelência Acadêmica</h3>
              <p className="text-gray-700">
                Busca da verdade através do estudo rigoroso da Teologia, Filosofia
                e demais ciências à luz da fé.
              </p>
            </div>
            <div className="bg-cream p-6 border-t-4 border-primary">
              <h3 className="text-xl font-serif font-bold text-primary mb-3">Compromisso Social</h3>
              <p className="text-gray-700">
                Aplicação dos princípios da Doutrina Social da Igreja na transformação
                da sociedade e promoção do bem comum.
              </p>
            </div>
            <div className="bg-cream p-6 border-t-4 border-primary">
              <h3 className="text-xl font-serif font-bold text-primary mb-3">Comunhão Fraterna</h3>
              <p className="text-gray-700">
                Vivência da fraternidade cristã entre os membros, cultivando a unidade
                na diversidade de vocações e carismas.
              </p>
            </div>
            <div className="bg-cream p-6 border-t-4 border-primary">
              <h3 className="text-xl font-serif font-bold text-primary mb-3">Espírito Missionário</h3>
              <p className="text-gray-700">
                Zelo pela evangelização da cultura e disposição para levar a mensagem
                do Evangelho a todos os ambientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-4">
              <div className="h-px bg-secondary w-12 mr-4"></div>
              <span className="text-secondary uppercase tracking-widest text-sm">Nossa História</span>
              <div className="h-px bg-secondary w-12 ml-4"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
              Uma trajetória de fé e formação
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto mt-4"></div>
          </div>

          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-white p-2 border border-gray-200">
                  <img
                    src="../src/assets/Forum-08-de-08-scaled.jpg"
                    alt="Fundação"
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-serif font-bold text-primary mb-3">Fundação</h3>
                <p className="text-gray-700 mb-4">
                  A União Apostólica Cardeal Leme foi fundada em 1995 por um grupo de leigos
                  católicos comprometidos com a formação e a evangelização da cultura. Inspirados
                  pelo exemplo do Cardeal Dom Sebastião Leme, que foi Arcebispo do Rio de Janeiro
                  de 1930 a 1942, esses pioneiros buscavam criar um espaço de formação integral
                  para católicos que desejavam aprofundar sua fé e seu conhecimento da doutrina
                  da Igreja.
                </p>
                <p className="text-gray-700">
                  Inicialmente, a União Apostólica começou com pequenos grupos de estudo e oração,
                  mas logo se expandiu para incluir cursos de formação, retiros espirituais e
                  atividades culturais.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3 order-2 md:order-1">
                <h3 className="text-2xl font-serif font-bold text-primary mb-3">Crescimento e Consolidação</h3>
                <p className="text-gray-700 mb-4">
                  Ao longo dos anos 2000, a União Apostólica Cardeal Leme experimentou um período
                  de significativo crescimento e consolidação. Novos programas de formação foram
                  desenvolvidos, parcerias com instituições acadêmicas foram estabelecidas, e o
                  número de membros aumentou consideravelmente.
                </p>
                <p className="text-gray-700">
                  Em 2010, a União Apostólica inaugurou sua sede própria, que se tornou um centro
                  de referência para a formação católica na cidade. Nesse período, também foram
                  iniciados projetos sociais inspirados pela Doutrina Social da Igreja, ampliando
                  a atuação da instituição para além da formação intelectual e espiritual.
                </p>
              </div>
              <div className="md:w-1/3 order-1 md:order-2">
                <div className="bg-white p-2 border border-gray-200">
                  <img
                    src="../src/assets/SEC-11-de-18.jpeg"
                    alt="Crescimento"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-white p-2 border border-gray-200">
                  <img
                    src="../src/assets/AS-10-de-12-scaled.jpeg"
                    alt="Atualidade"
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-serif font-bold text-primary mb-3">Atualidade</h3>
                <p className="text-gray-700 mb-4">
                  Hoje, a União Apostólica Cardeal Leme é reconhecida como uma importante
                  instituição de formação católica, que contribui significativamente para a
                  evangelização da cultura e a formação de líderes católicos comprometidos
                  com a transformação da sociedade segundo os princípios do Evangelho.
                </p>
                <p className="text-gray-700">
                  Com uma ampla oferta de cursos, eventos, publicações e projetos sociais,
                  a União Apostólica continua fiel à sua missão original, adaptando-se aos
                  desafios do mundo contemporâneo e buscando sempre novas formas de anunciar
                  a mensagem cristã em diálogo com a cultura atual.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Faça parte da nossa história
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Junte-se à União Apostólica Cardeal Leme e contribua para a evangelização
            da cultura e a transformação da sociedade.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/seja-membro"
              className="bg-white text-primary px-6 py-3 font-medium hover:bg-gray-100 transition-colors duration-300"
            >
              Torne-se Membro
            </Link>
            <Link
              to="/contato"
              className="border border-white text-white px-6 py-3 font-medium hover:bg-white hover:text-primary transition-colors duration-300"
            >
              Entre em Contato
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
