import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const membershipTypes = [
  {
    id: 'associado',
    title: 'Membro Associado',
    price: 'R$ 39,90/mês',
    features: [
      'Acesso integral ao conteúdo da plataforma da União Apostólica Cardeal Leme',
      'Catequese mensal voltada para empresários- Doutrina social da Igreja',
      'Aula Profissional Virtual - mensal',
      'Desconto nos encontros mensais presenciais e virtuais do SEC - 20%',
      'Descontos para acompanhantes em todos os eventos presenciais - 20%',
      'Descontos nos eventos anuais SEC/Forum Rio/UACL - 20%',
    ],
    recommended: false,
  },
  {
    id: 'efetivo',
    title: 'Membro Efetivo',
    price: 'R$ 59,90/mês',
    features: [
      'Acesso integral ao conteúdo da plataforma da União Apostólica Cardeal Leme',
      'Catequese mensal voltada para empresários- Doutrina social da Igreja',
      'Aula Profissional Virtual - mensal',
      'Desconto nos encontros mensais presenciais e virtuais do SEC - 35%',
      'Descontos para acompanhantes em todos os eventos presenciais - 35%',
      'Descontos nos eventos anuais SEC/Forum Rio/UACL - 35%',      
      'Realização de 3 cursos exclusivos com imersão presencial e virtual, ministrados por profissionais parceiros do Seminário para Empresários Católicos, de acordo com a escolha e a preferência do empresário',
    ],
    recommended: true,
  },
  {
    id: 'premium',
    title: 'Membro Premium',
    price: 'R$ 89,90/mês',
    features: [
      'Acesso integral ao conteúdo da plataforma da União Apostólica Cardeal Leme',
      'Catequese mensal voltada para empresários- Doutrina social da Igreja',
      'Aula Profissional Virtual - mensal',
      'Desconto nos encontros mensais presenciais e virtuais do SEC - 50%',
      'Descontos para acompanhantes em todos os eventos presenciais - 50%',
      'Descontos nos eventos anuais SEC/Forum Rio/UACL - 50%',      
      'Realização de 6 cursos exclusivos com imersão presencial e virtual, ministrados por profissionais parceiros do Seminário para Empresários Católicos, de acordo com a escolha e a preferência do empresário',
    ],
    recommended: false,
  },
];

export const Membership = () => {
  const [step, setStep] = useState(1);
  const [selectedMembership, setSelectedMembership] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit-card'>('credit-card');

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Nome é obrigatório'),
      lastName: Yup.string().required('Sobrenome é obrigatório'),
      email: Yup.string().email('Email inválido').required('Email é obrigatório'),
      phone: Yup.string().required('Telefone é obrigatório'),
      address: Yup.string().required('Endereço é obrigatório'),
      city: Yup.string().required('Cidade é obrigatória'),
      state: Yup.string().required('Estado é obrigatório'),
      zipCode: Yup.string().required('CEP é obrigatório'),
      ...(paymentMethod === 'credit-card' && {
        cardNumber: Yup.string().required('Número do cartão é obrigatório'),
        cardName: Yup.string().required('Nome no cartão é obrigatório'),
        expiryDate: Yup.string().required('Data de validade é obrigatória'),
        cvv: Yup.string().required('CVV é obrigatório'),
      }),
    }),
    onSubmit: (values) => {
      console.log('Form submitted:', { values, selectedMembership, paymentMethod });
      // Here you would typically send the data to your backend
      // and then redirect to a success page
      window.location.href = '/pagamento/sucesso';
    },
  });

  const handleNextStep = () => {
    if (step === 1 && !selectedMembership) {
      alert('Por favor, selecione um tipo de associação');
      return;
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <div className="h-px bg-secondary w-12 mr-4"></div>
            <span className="text-secondary uppercase tracking-widest text-sm">Faça parte</span>
            <div className="h-px bg-secondary w-12 ml-4"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">Seja Membro</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mt-4"></div>
          <p className="text-gray-700 max-w-2xl mx-auto mt-6">
            Junte-se à União Apostólica Cardeal Leme e faça parte de uma comunidade comprometida 
            com a fé católica e a formação integral.
          </p>
        </div>

        {/* Steps Indicator */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-center">
            <div className={`flex items-center ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${step >= 1 ? 'border-primary bg-primary text-white' : 'border-gray-400'}`}>
                1
              </div>
              <span className="ml-2 text-sm font-medium">Escolha o Plano</span>
            </div>
            <div className={`flex-1 h-px mx-4 ${step >= 2 ? 'bg-primary' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${step >= 2 ? 'border-primary bg-primary text-white' : 'border-gray-400'}`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Dados Pessoais</span>
            </div>
            <div className={`flex-1 h-px mx-4 ${step >= 3 ? 'bg-primary' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}>
              <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${step >= 3 ? 'border-primary bg-primary text-white' : 'border-gray-400'}`}>
                3
              </div>
              <span className="ml-2 text-sm font-medium">Pagamento</span>
            </div>
          </div>
        </div>

        <div className="max-w-full mx-auto">
          {/* Step 1: Choose Membership Type */}
          {step === 1 && (
            <div className="grid md:grid-cols-3 gap-8">
              {membershipTypes.map((type) => (
                <div 
                  key={type.id}
                  className={`bg-white border ${selectedMembership === type.id ? 'border-2 border-secondary' : 'border-gray-200'} hover-lift relative ${type.recommended ? 'md:-mt-4' : ''}`}
                  onClick={() => setSelectedMembership(type.id)}
                >
                  {type.recommended && (
                    <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1">
                      Recomendado
                    </div>
                  )}
                  <div className={`p-6 border-b border-gray-200 ${type.recommended ? 'bg-secondary' : 'bg-secondary bg-opacity-10'}`}>
                    <h3 className={`text-xl font-serif font-bold ${type.recommended ? 'text-white' : 'text-primary'} text-center`}>
                      {type.title}
                    </h3>
                  </div>
                  <div className="p-8">
                    <div className="text-center mb-6">
                      <span className="text-2xl font-bold text-primary">{type.price}</span>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {type.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-green-600 mt-1 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => setSelectedMembership(type.id)}
                        className={`inline-block w-full px-6 py-3 font-medium ${
                          selectedMembership === type.id
                            ? 'bg-secondary text-white'
                            : 'bg-primary text-white hover:bg-primary-dark'
                        } transition-colors duration-300`}
                      >
                        {selectedMembership === type.id ? 'Selecionado' : 'Selecionar'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Personal Information */}
          {step === 2 && (
            <div className="bg-white p-8 border border-gray-200">
              <h3 className="text-xl font-serif font-bold text-primary mb-6">Informações Pessoais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-3 py-2 border ${
                      formik.touched.firstName && formik.errors.firstName ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className="mt-1 text-sm text-red-500">{formik.errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Sobrenome
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-3 py-2 border ${
                      formik.touched.lastName && formik.errors.lastName ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className="mt-1 text-sm text-red-500">{formik.errors.lastName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-3 py-2 border ${
                      formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-3 py-2 border ${
                      formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{formik.errors.phone}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-3 py-2 border ${
                      formik.touched.address && formik.errors.address ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                  />
                  {formik.touched.address && formik.errors.address && (
                    <p className="mt-1 text-sm text-red-500">{formik.errors.address}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    Cidade
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-3 py-2 border ${
                      formik.touched.city && formik.errors.city ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                  />
                  {formik.touched.city && formik.errors.city && (
                    <p className="mt-1 text-sm text-red-500">{formik.errors.city}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-3 py-2 border ${
                      formik.touched.state && formik.errors.state ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                  />
                  {formik.touched.state && formik.errors.state && (
                    <p className="mt-1 text-sm text-red-500">{formik.errors.state}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    CEP
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formik.values.zipCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-3 py-2 border ${
                      formik.touched.zipCode && formik.errors.zipCode ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                  />
                  {formik.touched.zipCode && formik.errors.zipCode && (
                    <p className="mt-1 text-sm text-red-500">{formik.errors.zipCode}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="bg-white p-8 border border-gray-200">
              <h3 className="text-xl font-serif font-bold text-primary mb-6">Método de Pagamento</h3>
              
              <div className="mb-6">
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit-card')}
                    className={`flex-1 py-3 px-4 border ${
                      paymentMethod === 'credit-card'
                        ? 'border-secondary bg-secondary bg-opacity-10'
                        : 'border-gray-300'
                    } rounded-md flex items-center justify-center space-x-2`}
                  >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                    </svg>
                    <span>Cartão de Crédito</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`flex-1 py-3 px-4 border ${
                      paymentMethod === 'pix'
                        ? 'border-secondary bg-secondary bg-opacity-10'
                        : 'border-gray-300'
                    } rounded-md flex items-center justify-center space-x-2`}
                  >
                    <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.9999 2C6.47774 2 2 6.47774 2 12.0001C2 17.5223 6.47774 22 11.9999 22C17.5222 22 22 17.5223 22 12.0001C22 6.47774 17.5222 2 11.9999 2ZM16.5 8C17.3284 8 18 7.32843 18 6.5C18 5.67157 17.3284 5 16.5 5C15.6716 5 15 5.67157 15 6.5C15 7.32843 15.6716 8 16.5 8ZM7.5 8C8.32843 8 9 7.32843 9 6.5C9 5.67157 8.32843 5 7.5 5C6.67157 5 6 5.67157 6 6.5C6 7.32843 6.67157 8 7.5 8ZM11.9999 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 11.9999 5.5C8.41002 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41002 18.5 11.9999 18.5Z"></path>
                    </svg>
                    <span>PIX</span>
                  </button>
                </div>
              </div>

              {paymentMethod === 'credit-card' ? (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Número do Cartão
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formik.values.cardNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-3 py-2 border ${
                        formik.touched.cardNumber && formik.errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                    />
                    {formik.touched.cardNumber && formik.errors.cardNumber && (
                      <p className="mt-1 text-sm text-red-500">{formik.errors.cardNumber}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome no Cartão
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formik.values.cardName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-3 py-2 border ${
                        formik.touched.cardName && formik.errors.cardName ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                    />
                    {formik.touched.cardName && formik.errors.cardName && (
                      <p className="mt-1 text-sm text-red-500">{formik.errors.cardName}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Data de Validade
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/AA"
                        value={formik.values.expiryDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-3 py-2 border ${
                          formik.touched.expiryDate && formik.errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                      />
                      {formik.touched.expiryDate && formik.errors.expiryDate && (
                        <p className="mt-1 text-sm text-red-500">{formik.errors.expiryDate}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={formik.values.cvv}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full px-3 py-2 border ${
                          formik.touched.cvv && formik.errors.cvv ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                      />
                      {formik.touched.cvv && formik.errors.cvv && (
                        <p className="mt-1 text-sm text-red-500">{formik.errors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 border border-dashed border-gray-300 rounded-md">
                  <div className="mb-4">
                    <svg className="w-16 h-16 mx-auto text-secondary" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.9999 2C6.47774 2 2 6.47774 2 12.0001C2 17.5223 6.47774 22 11.9999 22C17.5222 22 22 17.5223 22 12.0001C22 6.47774 17.5222 2 11.9999 2ZM16.5 8C17.3284 8 18 7.32843 18 6.5C18 5.67157 17.3284 5 16.5 5C15.6716 5 15 5.67157 15 6.5C15 7.32843 15.6716 8 16.5 8ZM7.5 8C8.32843 8 9 7.32843 9 6.5C9 5.67157 8.32843 5 7.5 5C6.67157 5 6 5.67157 6 6.5C6 7.32843 6.67157 8 7.5 8ZM11.9999 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 11.9999 5.5C8.41002 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41002 18.5 11.9999 18.5Z"></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Pagamento via PIX</h4>
                  <p className="text-gray-600 mb-4">
                    Escaneie o código QR abaixo ou copie a chave PIX para realizar o pagamento.
                  </p>
                  <div className="bg-white p-4 inline-block mb-4">
                    <div className="w-48 h-48 bg-gray-200 mx-auto flex items-center justify-center">
                      <span className="text-gray-500">Código QR PIX</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Chave PIX:</p>
                    <div className="flex items-center justify-center">
                      <span className="bg-gray-100 px-3 py-2 rounded text-gray-800">12345678901</span>
                      <button
                        type="button"
                        className="ml-2 text-secondary hover:text-primary"
                        onClick={() => navigator.clipboard.writeText('12345678901')}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Após realizar o pagamento, clique em "Finalizar" para concluir seu cadastro.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-300"
              >
                Voltar
              </button>
            ) : (
              <div></div>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-3 bg-primary text-white font-medium hover:bg-primary-dark transition-colors duration-300"
              >
                Próximo
              </button>
            ) : (
              <button
                type="button"
                onClick={() => formik.handleSubmit()}
                className="px-6 py-3 bg-primary text-white font-medium hover:bg-primary-dark transition-colors duration-300"
              >
                Finalizar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};