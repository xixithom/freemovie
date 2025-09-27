import { useState, useMemo } from 'react';

// Dữ liệu sản phẩm mẫu
const productsData = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    category: "electronics",
    price: 29990000,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
    rating: 4.8,
    inStock: true,
    featured: true,
    description: "Flagship smartphone với Dynamic Island"
  },
  {
    id: 2,
    name: "MacBook Air M2",
    category: "electronics",
    price: 32990000,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop",
    rating: 4.9,
    inStock: true,
    featured: true,
    description: "Laptop siêu mỏng nhẹ hiệu năng cao"
  },
  {
    id: 3,
    name: "Áo thun Basic",
    category: "clothing",
    price: 249000,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
    rating: 4.3,
    inStock: true,
    featured: false,
    description: "Áo thun cotton thoáng mát"
  },
  {
    id: 4,
    name: "Giày thể thao Nike",
    category: "shoes",
    price: 1850000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    rating: 4.6,
    inStock: false,
    featured: true,
    description: "Giày chạy bộ công nghệ mới"
  },
  {
    id: 5,
    name: "Sách ReactJS Pro",
    category: "books",
    price: 320000,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop",
    rating: 4.7,
    inStock: true,
    featured: false,
    description: "Hướng dẫn ReactJS từ cơ bản đến nâng cao"
  },
  {
    id: 6,
    name: "Tai nghe Sony WH-1000XM4",
    category: "electronics",
    price: 5990000,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop",
    rating: 4.8,
    inStock: true,
    featured: true,
    description: "Tai nghe chống ồn tốt nhất"
  },
  {
    id: 7,
    name: "Quần jeans Slim Fit",
    category: "clothing",
    price: 890000,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop",
    rating: 4.2,
    inStock: true,
    featured: false,
    description: "Quần jeans form slim hiện đại"
  },
  {
    id: 8,
    name: "Bàn phím cơ Logitech",
    category: "electronics",
    price: 450000,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop",
    rating: 4.5,
    inStock: false,
    featured: false,
    description: "Bàn phím cơ cho game thủ"
  }
];

function ProductList() {
  // State cho filter và search
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Lấy danh sách categories duy nhất từ products
  const categories = useMemo(() => {
    return ['all', ...new Set(productsData.map(product => product.category))];
  }, []);

  // Hàm format tiền tệ Việt Nam
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  // Hàm render rating stars
  const renderRating = (rating) => {
    return (
      <div className="flex items-center">
        <span className="text-yellow-400 mr-1">⭐</span>
        <span className="text-sm font-medium">{rating}</span>
      </div>
    );
  };

  // Filter và sort products
  const filteredProducts = useMemo(() => {
    let filtered = productsData.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesStock = !showInStockOnly || product.inStock;
      const matchesFeatured = !showFeaturedOnly || product.featured;

      return matchesCategory && matchesSearch && matchesPrice && matchesStock && matchesFeatured;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [selectedCategory, searchTerm, sortBy, priceRange, showInStockOnly, showFeaturedOnly]);

  // Thống kê
  const stats = useMemo(() => {
    const totalProducts = productsData.length;
    const filteredCount = filteredProducts.length;
    const inStockCount = productsData.filter(p => p.inStock).length;
    const featuredCount = productsData.filter(p => p.featured).length;
    
    return { totalProducts, filteredCount, inStockCount, featuredCount };
  }, [filteredProducts]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    setSortBy('name');
    setPriceRange([0, 50000000]);
    setShowInStockOnly(false);
    setShowFeaturedOnly(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🛍️ Product Store</h1>
          <p className="text-gray-600">Tìm kiếm và lọc sản phẩm theo nhu cầu của bạn</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔍 Tìm kiếm sản phẩm
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nhập tên hoặc mô tả..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📁 Danh mục
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Tất cả danh mục' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔄 Sắp xếp
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Theo tên A-Z</option>
                <option value="price-low">Giá: Thấp đến cao</option>
                <option value="price-high">Giá: Cao đến thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex items-end space-x-2">
              <button
                onClick={resetFilters}
                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
              >
                🔄 Reset
              </button>
            </div>
          </div>

          {/* Additional Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                💰 Khoảng giá: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
              </label>
              <div className="flex space-x-4">
                <input
                  type="range"
                  min="0"
                  max="50000000"
                  step="1000000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>

            {/* Checkbox Filters */}
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showInStockOnly}
                  onChange={(e) => setShowInStockOnly(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">📦 Chỉ hiện có sẵn</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showFeaturedOnly}
                  onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">⭐ Sản phẩm nổi bật</span>
              </label>
            </div>

            {/* Stats */}
            <div className="text-sm text-gray-600">
              Hiển thị <span className="font-bold">{filteredProducts.length}</span> / {stats.totalProducts} sản phẩm
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy sản phẩm nào</h3>
            <p className="text-gray-500 mb-4">Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</p>
            <button
              onClick={resetFilters}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            >
              🔄 Xóa bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
              >
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex space-x-1">
                    {product.featured && (
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        ⭐ Nổi bật
                      </span>
                    )}
                    {!product.inStock && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        🔴 Hết hàng
                      </span>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800 text-lg">{product.name}</h3>
                    {renderRating(product.rating)}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-2xl font-bold text-green-600">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs text-gray-500 uppercase bg-gray-100 px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      className={`flex-1 py-2 rounded-lg font-medium transition duration-200 ${
                        product.inStock
                          ? 'bg-blue-500 text-white hover:bg-blue-600'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!product.inStock}
                    >
                      {product.inStock ? '🛒 Thêm vào giỏ' : '❌ Hết hàng'}
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200">
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Stats */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{stats.totalProducts}</div>
              <div className="text-gray-600">Tổng sản phẩm</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.inStockCount}</div>
              <div className="text-gray-600">Có sẵn</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">{stats.featuredCount}</div>
              <div className="text-gray-600">Nổi bật</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{filteredProducts.length}</div>
              <div className="text-gray-600">Đang hiển thị</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;