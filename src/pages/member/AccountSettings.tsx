
import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, deleteDoc, FirestoreError } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { db, auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

interface PaymentHistory {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  method: string;
}

interface MembershipDetails {
  plan: string;
  startDate: string;
  lastPaymentDate: string;
  nextPaymentDate: string;
  price: number;
  paymentHistory: PaymentHistory[];
}

interface PlanDetail {
  price: number;
  features: string[];
}

interface PlanDetailsMap {
  [key: string]: PlanDetail;
}

const planDetails: PlanDetailsMap = {
  "Membro Associado": {
    price: 39.90,
    features: [
      "Acesso integral ao conteúdo da plataforma da União Apostólica Cardeal Leme",
      "Catequese mensal voltada para empresários- Doutrina social da Igreja",
      "Aula Profissional Virtual - mensal",
      "Desconto nos encontros mensais presenciais e virtuais do SEC - 20%",
      "Descontos para acompanhantes em todos os eventos presenciais - 20%",
      "Descontos nos eventos anuais SEC/Forum Rio/UACL - 20%"
    ]
  },
  "Membro Efetivo": {
    price: 59.90,
    features: [
      "Acesso integral ao conteúdo da plataforma da União Apostólica Cardeal Leme",
      "Catequese mensal voltada para empresários- Doutrina social da Igreja",
      "Aula Profissional Virtual - mensal",
      "Desconto nos encontros mensais presenciais e virtuais do SEC - 35%",
      "Descontos para acompanhantes em todos os eventos presenciais - 35%",
      "Descontos nos eventos anuais SEC/Forum Rio/UACL - 35%",
      "Realização de 3 cursos exclusivos com imersão presencial e virtual, ministrados por profissionais parceiros do Seminário para Empresários Católicos, de acordo com a escolha e a preferência do empresário"
    ]
  },
  "Membro Premium": {
    price: 89.90,
    features: [
      "Acesso integral ao conteúdo da plataforma da União Apostólica Cardeal Leme",
      "Catequese mensal voltada para empresários- Doutrina social da Igreja",
      "Aula Profissional Virtual - mensal",
      "Desconto nos encontros mensais presenciais e virtuais do SEC - 50%",
      "Descontos para acompanhantes em todos os eventos presenciais - 50%",
      "Descontos nos eventos anuais SEC/Forum Rio/UACL - 50%",
      "Realização de 6 cursos exclusivos com imersão presencial e virtual, ministrados por profissionais parceiros do Seminário para Empresários Católicos, de acordo com a escolha e a preferência do empresário"
    ]
  }
};

export const AccountSettings = () => {
  const [membership, setMembership] = useState<MembershipDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showRenewConfirm, setShowRenewConfirm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        const ref = doc(db, "users", user.uid);
        const snapshot = await getDoc(ref);
        
        if (snapshot.exists()) {
          const userData = snapshot.data();
          
          // In a real app, you would fetch this data from your backend
          // This is mock data for demonstration purposes
          const mockMembershipData: MembershipDetails = {
            plan: userData.plan || "Nenhum",
            startDate: userData.startDate || "2023-01-15",
            lastPaymentDate: userData.lastPaymentDate || "2023-05-15",
            nextPaymentDate: userData.nextPaymentDate || "2023-06-15",
            price: userData.plan ? planDetails[userData.plan]?.price || 0 : 0,
            paymentHistory: userData.paymentHistory || [
              { id: "pay_123", date: "2023-05-15", amount: 59.90, status: "paid", method: "Cartão de crédito" },
              { id: "pay_122", date: "2023-04-15", amount: 59.90, status: "paid", method: "Cartão de crédito" },
              { id: "pay_121", date: "2023-03-15", amount: 59.90, status: "paid", method: "Cartão de crédito" },
              { id: "pay_120", date: "2023-02-15", amount: 59.90, status: "paid", method: "Cartão de crédito" },
              { id: "pay_119", date: "2023-01-15", amount: 59.90, status: "paid", method: "Cartão de crédito" }
            ]
          };
          
          setMembership(mockMembershipData);
          setSelectedPlan(userData.plan || null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handlePlanChange = async (newPlan: string) => {
    setSelectedPlan(newPlan);
  };

  const handleRenewPlan = async () => {
    if (!user || !selectedPlan) return;
    
    try {
      const ref = doc(db, "users", user.uid);
      
      // Calculate next payment date (1 month from now)
      const nextPaymentDate = new Date();
      nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
      
      // Update user document with new plan information
      await updateDoc(ref, { 
        plan: selectedPlan,
        lastPaymentDate: new Date().toISOString().split('T')[0],
        nextPaymentDate: nextPaymentDate.toISOString().split('T')[0]
      });
      
      // Update local state
      if (membership) {
        const updatedMembership = {
          ...membership,
          plan: selectedPlan,
          price: planDetails[selectedPlan].price,
          lastPaymentDate: new Date().toISOString().split('T')[0],
          nextPaymentDate: nextPaymentDate.toISOString().split('T')[0],
          paymentHistory: [
            {
              id: `pay_${Date.now()}`,
              date: new Date().toISOString().split('T')[0],
              amount: planDetails[selectedPlan].price,
              status: "paid" as const,
              method: "Cartão de crédito"
            },
            ...membership.paymentHistory
          ]
        };
        
        setMembership(updatedMembership);
      }
      
      setShowRenewConfirm(false);
    } catch (error) {
      console.error("Error updating plan:", error);
      alert("Erro ao atualizar plano. Por favor, tente novamente.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);
      navigate("/");
    } catch (error) {
      const errorMessage = error instanceof FirebaseError || error instanceof FirestoreError 
        ? error.message 
        : "Erro desconhecido";
      alert("Erro ao excluir conta: " + errorMessage);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-cream py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-primary py-4 px-6">
            <h2 className="text-2xl font-serif font-bold text-white">Configurações da Conta</h2>
          </div>
          
          <div className="p-6">
            {/* Current Plan Information */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="h-px bg-secondary w-12 mr-4"></div>
                <span className="text-secondary uppercase tracking-widest text-sm">Seu Plano Atual</span>
              </div>
              
              {membership && membership.plan !== "Nenhum" ? (
                <div className="bg-primary bg-opacity-5 border border-primary border-opacity-20 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-primary">{membership.plan}</h3>
                      <p className="text-xl text-primary">{formatCurrency(membership.price)}<span className="text-sm text-gray-600">/mês</span></p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <button
                        onClick={() => setShowRenewConfirm(true)}
                        className="bg-primary text-white px-6 py-3 font-medium hover:bg-primary-dark transition-colors duration-300"
                      >
                        Renovar Assinatura
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-600">Data de início</p>
                      <p className="font-medium">{formatDate(membership.startDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Último pagamento</p>
                      <p className="font-medium">{formatDate(membership.lastPaymentDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Próximo pagamento</p>
                      <p className="font-medium">{formatDate(membership.nextPaymentDate)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-primary mb-2">Benefícios do seu plano:</h4>
                    <ul className="space-y-2">
                      {planDetails[membership.plan]?.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-secondary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                  <p className="text-gray-700 mb-4">Você ainda não possui um plano ativo.</p>
                  <button
                    onClick={() => setShowRenewConfirm(true)}
                    className="bg-primary text-white px-6 py-3 font-medium hover:bg-primary-dark transition-colors duration-300"
                  >
                    Assinar um plano
                  </button>
                </div>
              )}
            </div>
            
            {/* Payment History */}
            {membership && membership.paymentHistory.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="h-px bg-secondary w-12 mr-4"></div>
                  <span className="text-secondary uppercase tracking-widest text-sm">Histórico de Pagamentos</span>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Data
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Valor
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Método
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {membership.paymentHistory.map((payment) => (
                          <tr key={payment.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {formatDate(payment.date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {formatCurrency(payment.amount)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${payment.status === 'paid' ? 'bg-green-100 text-green-800' : 
                                  payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-red-100 text-red-800'}`}>
                                {payment.status === 'paid' ? 'Pago' : 
                                 payment.status === 'pending' ? 'Pendente' : 'Falhou'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {payment.method}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {/* Change Plan */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="h-px bg-secondary w-12 mr-4"></div>
                <span className="text-secondary uppercase tracking-widest text-sm">Alterar Plano</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(planDetails).map(([planName, details]) => (
                  <div 
                    key={planName}
                    onClick={() => handlePlanChange(planName)}
                    className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedPlan === planName 
                        ? "border-primary shadow-md" 
                        : "border-gray-200 hover:border-secondary"
                    }`}
                  >
                    <div className={`p-4 ${planName === "Membro Efetivo" ? "bg-secondary bg-opacity-10" : ""}`}>
                      {planName === "Membro Efetivo" && (
                        <div className="text-center mb-2">
                          <span className="bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                            Recomendado
                          </span>
                        </div>
                      )}
                      <div className="flex items-center mb-2">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${
                          selectedPlan === planName ? "border-primary" : "border-gray-300"
                        }`}>
                          {selectedPlan === planName && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                        </div>
                        <h3 className="font-serif font-bold text-primary">{planName}</h3>
                      </div>
                      <p className="text-xl font-serif font-bold text-primary ml-7">
                        {formatCurrency(details.price)}<span className="text-sm text-gray-600">/mês</span>
                      </p>
                    </div>
                    
                    <div className="p-4 border-t border-gray-200">
                      <ul className="space-y-2">
                        {details.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <svg className="w-4 h-4 text-secondary mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delete Account */}
            <div className="border-t border-gray-200 pt-8 mt-8">
              <div className="flex items-center mb-4">
                <div className="h-px bg-red-500 w-12 mr-4"></div>
                <span className="text-red-500 uppercase tracking-widest text-sm">Zona de Perigo</span>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-serif font-bold text-red-700 mb-2">Excluir Conta</h3>
                <p className="text-gray-700 mb-4">
                  Esta ação é permanente e não pode ser desfeita. Todos os seus dados serão removidos permanentemente.
                </p>
                
                {!showDeleteConfirm ? (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="bg-white border border-red-500 text-red-500 px-6 py-3 font-medium hover:bg-red-500 hover:text-white transition-colors duration-300"
                  >
                    Excluir minha conta
                  </button>
                ) : (
                  <div className="bg-white border border-red-200 rounded-lg p-4">
                    <p className="text-red-700 font-medium mb-4">
                      Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={handleDeleteAccount}
                        className="bg-red-500 text-white px-6 py-3 font-medium hover:bg-red-600 transition-colors duration-300"
                      >
                        Sim, excluir minha conta
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="bg-white border border-gray-300 text-gray-700 px-6 py-3 font-medium hover:bg-gray-100 transition-colors duration-300"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Renew Plan Modal */}
      {showRenewConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="bg-primary py-4 px-6">
              <h3 className="text-xl font-serif font-bold text-white">Confirmar Assinatura</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Você está prestes a {membership?.plan === selectedPlan ? "renovar" : "alterar"} sua assinatura para o plano:
              </p>
              
              <div className="bg-primary bg-opacity-5 border border-primary border-opacity-20 rounded-lg p-4 mb-6">
                <h4 className="font-serif font-bold text-primary">{selectedPlan}</h4>
                <p className="text-primary">
                  {selectedPlan ? formatCurrency(planDetails[selectedPlan].price) : ""}
                  <span className="text-sm text-gray-600">/mês</span>
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleRenewPlan}
                  className="bg-primary text-white px-6 py-3 font-medium hover:bg-primary-dark transition-colors duration-300"
                >
                  Confirmar
                </button>
                <button
                  onClick={() => setShowRenewConfirm(false)}
                  className="bg-white border border-gray-300 text-gray-700 px-6 py-3 font-medium hover:bg-gray-100 transition-colors duration-300"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


