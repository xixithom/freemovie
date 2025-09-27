import { useState } from 'react';

function Counter() {
  // Khai báo state cho biến đếm
  // useState(0) nghĩa là:
  // - Giá trị khởi tạo của count là 0
  // - setCount là hàm để cập nhật giá trị mới cho count
  const [count, setCount] = useState(0);

  // Hàm tăng giá trị count lên 1
  const increment = () => {
    // setCount nhận giá trị mới hoặc hàm callback
    // Ở đây dùng giá trị mới: count + 1
    setCount(count + 1);
  };

  // Hàm giảm giá trị count xuống 1
  const decrement = () => {
    setCount(count - 1);
  };

  // Hàm reset count về 0
  const reset = () => {
    setCount(0);
  };

  // Hàm tăng gấp đôi giá trị count
  const double = () => {
    setCount(count * 2);
  };

  // Hàm set giá trị cụ thể (dùng prompt để nhập)
  const setCustomValue = () => {
    // prompt() hiển thị hộp thoại nhập liệu
    const newValue = prompt('Nhập giá trị mới:', count);
    
    // Kiểm tra nếu người dùng không hủy (newValue không null)
    // và giá trị nhập vào là số hợp lệ
    if (newValue !== null) {
      const numValue = parseInt(newValue);
      
      // isNaN() kiểm tra xem giá trị có phải là số không
      if (!isNaN(numValue)) {
        setCount(numValue);
      } else {
        alert('Vui lòng nhập số hợp lệ!');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        {/* Tiêu đề */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Counter App
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Ứng dụng đếm đơn giản với React
        </p>
        
        {/* Hiển thị giá trị count */}
        <div className="text-center mb-8">
          <div className={`text-6xl font-bold mb-4 transition-all duration-300 ${
            count > 0 
              ? 'text-green-600' 
              : count < 0 
                ? 'text-red-600' 
                : 'text-gray-600'
          }`}>
            {count}
          </div>
          
          {/* Hiển thị thông báo đặc biệt */}
          {count === 0 && (
            <p className="text-sm text-gray-500">Bắt đầu đếm nào! 🚀</p>
          )}
          {count === 10 && (
            <p className="text-sm text-green-600 font-medium">🎉 Chúc mừng! Bạn đã đến 10!</p>
          )}
          {count === 100 && (
            <p className="text-sm text-purple-600 font-medium">🏆 Wow! 100 điểm! Xuất sắc!</p>
          )}
        </div>

        {/* Nhóm nút chính */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={increment}
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition duration-200 transform hover:scale-105"
          >
            ➕ Tăng
          </button>
          
          <button
            onClick={decrement}
            className="bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-semibold transition duration-200 transform hover:scale-105"
          >
            ➖ Giảm
          </button>
        </div>

        {/* Nhóm nút phụ */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={double}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg font-medium transition duration-200"
          >
            🎯 Gấp đôi
          </button>
          
          <button
            onClick={setCustomValue}
            className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg font-medium transition duration-200"
          >
            ✏️ Nhập giá trị
          </button>
        </div>

        {/* Nút reset */}
        <button
          onClick={reset}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold transition duration-200 mb-4"
        >
          🔄 Reset về 0
        </button>

        {/* Thông tin thêm */}
        <div className="text-center text-sm text-gray-500 space-y-1">
          <div>Giá trị hiện tại: {count}</div>
          <div>Bình phương: {count * count}</div>
          <div>{count % 2 === 0 ? '✅ Số chẵn' : '❌ Số lẻ'}</div>
        </div>
      </div>
    </div>
  );
}

export default Counter;