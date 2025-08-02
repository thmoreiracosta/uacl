import React from 'react';
import { Link } from 'react-router-dom';

export const CardealLeme: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24 mt-24 relative">
        <div className="absolute inset-0 opacity-10 cross-pattern"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Dom Sebastião Leme <br />
              <span className="text-secondary">1882 - 1942</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Conheça a vida e o legado do Cardeal que inspirou nossa instituição
              e contribuiu significativamente para a Igreja no Brasil.
            </p>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full border-2 border-secondary"></div>
              <div className="bg-white p-2">
                <img
                  src="../src/assets/Cardeal_leme.jpg"
                  alt="Cardeal Dom Sebastião Leme"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-secondary text-white p-4 text-center">
                <span className="block text-2xl font-serif font-bold">1882</span>
                <span className="block text-sm">1942</span>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <div className="h-px bg-secondary w-12 mr-4"></div>
                <span className="text-secondary uppercase tracking-widest text-sm">Biografia</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
                Um líder visionário da Igreja no Brasil
              </h2>
              <p className="text-gray-700 mb-4">
                Dom Sebastião Leme da Silveira Cintra nasceu em 20 de janeiro de 1882, em Espírito
                Santo do Pinhal, São Paulo. Filho de Francisco Furquim Leme e Ana Cândida da Silveira
                Cintra, desde cedo demonstrou vocação para a vida religiosa.
              </p>
              <p className="text-gray-700 mb-4">
                Ingressou no Seminário Menor de São Paulo aos 11 anos e, posteriormente, foi enviado
                a Roma para completar seus estudos no Colégio Pio Latino-Americano e na Pontifícia
                Universidade Gregoriana, onde obteve doutorados em Filosofia e Teologia.
              </p>
              <p className="text-gray-700">
                Foi ordenado sacerdote em 1904 e, ao retornar ao Brasil, exerceu diversas funções
                pastorais e acadêmicas. Em 1911, foi nomeado bispo auxiliar do Rio de Janeiro,
                tornando-se o bispo católico mais jovem do mundo na época, com apenas 29 anos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-4">
              <div className="h-px bg-secondary w-12 mr-4"></div>
              <span className="text-secondary uppercase tracking-widest text-sm">Trajetória</span>
              <div className="h-px bg-secondary w-12 ml-4"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
              Marcos importantes na vida do Cardeal Leme
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto mt-4"></div>
          </div>

          <div className="relative border-l-2 border-primary pl-8 ml-4 space-y-12">
            <div className="relative">
              <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-primary mb-2">1882 - Nascimento</h3>
                <p className="text-gray-700">
                  Nasce em Espírito Santo do Pinhal, São Paulo, em 20 de janeiro de 1882.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-primary mb-2">1904 - Ordenação Sacerdotal</h3>
                <p className="text-gray-700">
                  É ordenado sacerdote em Roma, após concluir seus estudos na Pontifícia Universidade Gregoriana.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-primary mb-2">1911 - Episcopado</h3>
                <p className="text-gray-700">
                  É nomeado bispo auxiliar do Rio de Janeiro, tornando-se o bispo católico mais jovem do mundo na época.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold">4</span>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-primary mb-2">1916 - Arcebispo de Olinda</h3>
                <p className="text-gray-700">
                  É nomeado Arcebispo de Olinda (posteriormente Olinda e Recife), onde publica sua famosa Carta Pastoral,
                  analisando a situação da Igreja no Brasil e propondo caminhos para a recristianização da sociedade.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold">5</span>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-primary mb-2">1921 - Retorno ao Rio de Janeiro</h3>
                <p className="text-gray-700">
                  Retorna ao Rio de Janeiro como Arcebispo Coadjutor, sucedendo o Cardeal Arcoverde após sua morte em 1930.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold">6</span>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-primary mb-2">1930 - Cardinalato</h3>
                <p className="text-gray-700">
                  É criado Cardeal pelo Papa Pio XI, tornando-se o segundo Cardeal brasileiro da história.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold">7</span>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-primary mb-2">1931 - Cristo Redentor</h3>
                <p className="text-gray-700">
                  Inaugura o monumento do Cristo Redentor no Corcovado, símbolo da presença católica no Brasil.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold">8</span>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-primary mb-2">1942 - Falecimento</h3>
                <p className="text-gray-700">
                  Falece no Rio de Janeiro em 17 de outubro de 1942, deixando um importante legado para a Igreja no Brasil.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-4">
              <div className="h-px bg-secondary w-12 mr-4"></div>
              <span className="text-secondary uppercase tracking-widest text-sm">Legado</span>
              <div className="h-px bg-secondary w-12 ml-4"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
              Contribuições duradouras para a Igreja e a sociedade
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">Ação Católica</h3>
              <p className="text-gray-700 mb-6">
                Dom Leme foi um grande promotor da Ação Católica no Brasil, incentivando a
                participação dos leigos na missão evangelizadora da Igreja. Ele acreditava
                que os católicos deveriam ter uma presença ativa em todas as esferas da
                sociedade, testemunhando sua fé através de suas ações.
              </p>
              <p className="text-gray-700">
                Sob sua liderança, foram criadas diversas organizações e movimentos que
                buscavam formar e mobilizar os leigos para a transformação cristã da
                sociedade, como a Liga Eleitoral Católica e o Centro Dom Vital.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">Educação Católica</h3>
              <p className="text-gray-700 mb-6">
                O Cardeal Leme deu grande ênfase à educação católica como meio de formação
                integral da pessoa e de evangelização da cultura. Ele incentivou a criação
                de escolas e universidades católicas, entre elas a Pontifícia Universidade
                Católica do Rio de Janeiro (PUC-Rio), fundada em 1941.
              </p>
              <p className="text-gray-700">
                Ele também promoveu a catequese e a formação religiosa em todos os níveis,
                desde a infância até a idade adulta, buscando aprofundar o conhecimento da
                fé e a vivência cristã.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">Diálogo com a Sociedade</h3>
              <p className="text-gray-700 mb-6">
                Dom Leme foi um pioneiro no diálogo entre a Igreja e a sociedade brasileira.
                Em um contexto de secularização e de afastamento entre a Igreja e o Estado,
                ele buscou estabelecer pontes de diálogo e de colaboração para o bem comum.
              </p>
              <p className="text-gray-700">
                Sua atuação durante a Revolução de 1930 e nos primeiros anos do governo de
                Getúlio Vargas foi marcada pela busca de um equilíbrio entre a defesa dos
                direitos da Igreja e a colaboração com as autoridades civis para a promoção
                da paz e da justiça social.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">Devoção Mariana</h3>
              <p className="text-gray-700 mb-6">
                O Cardeal Leme foi um grande promotor da devoção a Nossa Senhora Aparecida,
                padroeira do Brasil. Em 1931, ele consagrou o Brasil a Nossa Senhora Aparecida,
                reafirmando a identidade católica do país e a proteção maternal de Maria sobre
                o povo brasileiro.
              </p>
              <p className="text-gray-700">
                Ele também incentivou a construção da nova Basílica de Nossa Senhora Aparecida,
                que se tornaria o maior santuário mariano do mundo, simbolizando a fé e a
                devoção do povo brasileiro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-4">
              <div className="h-px bg-white w-12 mr-4"></div>
              <span className="text-white uppercase tracking-widest text-sm">Pensamentos</span>
              <div className="h-px bg-white w-12 ml-4"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Palavras do Cardeal Leme
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white bg-opacity-10 p-6 border-l-4 border-secondary">
              <p className="text-xl italic mb-4">
                "Ou agimos como católicos em todas as esferas da vida, ou nos resignamos a ser
                uma força inexpressiva na sociedade."
              </p>
              <p className="text-right text-gray-300">— Carta Pastoral de 1916</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 border-l-4 border-secondary">
              <p className="text-xl italic mb-4">
                "A fé sem obras é morta. Não basta crer, é preciso viver conforme a fé que
                professamos."
              </p>
              <p className="text-right text-gray-300">— Discurso aos membros da Ação Católica, 1935</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 border-l-4 border-secondary">
              <p className="text-xl italic mb-4">
                "A educação católica não forma apenas inteligências, mas corações e consciências
                para o serviço de Deus e da pátria."
              </p>
              <p className="text-right text-gray-300">— Inauguração da PUC-Rio, 1941</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 border-l-4 border-secondary">
              <p className="text-xl italic mb-4">
                "Sob o olhar maternal de Nossa Senhora Aparecida, o Brasil encontrará o caminho
                da paz, da justiça e da fraternidade."
              </p>
              <p className="text-right text-gray-300">— Consagração do Brasil a Nossa Senhora Aparecida, 1931</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
            Inspirados pelo exemplo do Cardeal Leme
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Conheça mais sobre nossa instituição e como buscamos dar continuidade
            ao legado deste grande líder da Igreja no Brasil.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/sobre"
              className="bg-primary text-white px-6 py-3 font-medium hover:bg-primary-dark transition-colors duration-300"
            >
              Sobre Nossa Instituição
            </Link>
            <Link
              to="/iniciativas"
              className="border border-primary text-primary px-6 py-3 font-medium hover:bg-primary hover:text-white transition-colors duration-300"
            >
              Nossas Iniciativas
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
