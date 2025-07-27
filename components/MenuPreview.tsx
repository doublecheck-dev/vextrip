const dishes = [
  {
    name: "Desayuno Americano",
    description: "Huevos al gusto, pan, jugo y café.",
    price: "$6.00",
    image: "https://source.unsplash.com/400x300/?breakfast,eggs,coffee"
  },
  {
    name: "Hamburguesa San Rafael",
    description: "Carne de res, queso, vegetales frescos y papas fritas.",
    price: "$8.50",
    image: "https://source.unsplash.com/400x300/?burger,fries"
  },
  {
    name: "Ensalada Natural",
    description: "Mezcla de vegetales frescos, aderezo especial.",
    price: "$5.00",
    image: "https://source.unsplash.com/400x300/?salad,vegetables"
  }
];

export default function MenuPreview() {
  return (
    <section id="menu" className="py-16 bg-gray-50 text-center">
      <h3 className="text-3xl font-semibold mb-6">Platillos Populares</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {dishes.map((dish, i) => (
          <div key={i} className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col items-center">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-40 h-28 object-cover rounded mb-4 shadow"
            />
            <h4 className="text-xl font-bold mb-2">{dish.name}</h4>
            <p className="text-gray-600 mb-2">{dish.description}</p>
            <p className="text-red-500 font-semibold text-lg">{dish.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}