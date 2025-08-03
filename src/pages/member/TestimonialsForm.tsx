import { useState } from 'react';

export const TestimonialsForm = () => {
  const [form, setForm] = useState({
    name: '',
    since: '',
    message: '',
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Novo depoimento:', form);
    alert('Depoimento enviado com sucesso (salvar em backend futuramente).');
    setForm({ name: '', since: '', message: '', image: '' });
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto mt-10">
      <h2 className="text-xl font-serif font-bold text-primary mb-4">Envie seu Depoimento</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Seu nome"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="since"
          placeholder="Ex: Membro desde 2020"
          value={form.since}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="URL da sua foto (opcional)"
          value={form.image}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          name="message"
          placeholder="Seu depoimento"
          value={form.message}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
          Enviar
        </button>
      </form>
    </div>
  );
};
