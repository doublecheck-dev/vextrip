interface Category {
  id: string;
  name: string;
  count: number;
}

interface UserCategory {
  id: string;
  color: string;
  icon: string;
}

interface CategoryFilterProps {
  categories: Category[];
  userCategories: UserCategory[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryFilter({
  categories,
  userCategories,
  selectedCategory,
  onCategoryChange
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
      {categories.map((category) => {
        const userCategory = userCategories.find(cat => cat.id === category.id);
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
              selectedCategory === category.id
                ? userCategory 
                  ? 'text-white border-2 border-opacity-50'
                  : 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={userCategory && selectedCategory === category.id ? {
              backgroundColor: userCategory.color,
              borderColor: userCategory.color
            } : {}}
          >
            {userCategory && <span>{userCategory.icon}</span>}
            {category.name} ({category.count})
          </button>
        );
      })}
    </div>
  );
}
