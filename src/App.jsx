import React, { useState, useEffect } from 'react';

const GoddessCalculator = () => {
  const [selections, setSelections] = useState({
    empty: null,
    left: null,
    center: null,
    right: null
  });
  const [output, setOutput] = useState('');

  // 計算邏輯函數
  const calculateResult = (currentSelections) => {
    const { empty, left, center, right } = currentSelections;
    
    // 如果任何一個選項沒有選擇，清空輸出
    if (empty === null || left === null || center === null || right === null) {
      return '';
    }

    // 女神400的映射表
    const MAPPING = {
      "0011": "211",
      "0101": "121",
      "0110": "112",
      "1011": "022",
      "1012": "031",
      "1021": "013",
      "1101": "202",
      "1102": "301",
      "1110": "220",
      "1120": "310",
      "1201": "103",
      "1210": "130",
      "2112": "004",
      "2121": "040",
      "2211": "400",
    };

    // 組合輸入值
    const group = [empty, left, center, right];
    const key = group.join('');
    
    // 查找對應的結果
    const result = MAPPING[key];
    
    if (result === undefined) {
      return "此組合不存在，請重新確認。";
    } else {
      return result;
    }
  };

  // 處理選項變更（添加防抖機制）
  const handleSelection = (category, value) => {
    const newSelections = {
      ...selections,
      [category]: parseInt(value)
    };
    setSelections(newSelections);
  };

  // 當選項改變時重新計算結果（添加防抖延遲）
  useEffect(() => {
    // 清除之前的計時器
    if (window.calculateTimeout) {
      clearTimeout(window.calculateTimeout);
    }
    
    // 設置300ms延遲計算，模擬原始邏輯的防抖機制
    window.calculateTimeout = setTimeout(() => {
      const result = calculateResult(selections);
      setOutput(result);
    }, 300);
    
    // 清理函數
    return () => {
      if (window.calculateTimeout) {
        clearTimeout(window.calculateTimeout);
      }
    };
  }, [selections]);

  // 渲染選項按鈕組
  const renderOptionGroup = (title, category) => {
    return (
      <fieldset className="flex flex-col lg:flex-row mb-4 lg:mb-6">
 <div className="lg:w-1/3 mb-1 lg:mb-0 flex items-center justify-center lg:justify-start">
   <p className="text-lg md:text-2xl lg:text-4xl text-center lg:text-left">
     {title}
   </p>
 </div>
 <div className="flex flex-1 justify-center lg:justify-start items-center">
   {[0, 1, 2].map((value) => (
     <div key={value} className={value === 1 ? "mx-3 md:mx-4 lg:mx-6" : ""}>
       <input 
         type="radio" 
         id={`${category}${value}`} 
         name={category} 
         value={value}
         checked={selections[category] === value}
         onChange={(e) => handleSelection(category, e.target.value)}
         className="hidden"
       />
       <label 
         htmlFor={`${category}${value}`}
         className={`
           inline-block cursor-pointer
           text-xl md:text-2xl lg:text-4xl
           font-semibold py-2 px-3 md:px-4 lg:px-6
           border-2 rounded-lg
           transition-all duration-200 ease-in-out
           min-w-[3rem] md:min-w-[4rem] lg:min-w-[5rem]
           text-center
           ${selections[category] === value 
             ? 'bg-blue-500 text-white border-blue-500' 
             : 'bg-transparent text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white'
           }
         `}
       >
         {value}
       </label>
     </div>
   ))}
 </div>
</fieldset>
    );
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-4xl">
        {/* Banner */}
        <div className="text-xl md:text-2xl lg:text-3xl font-bold my-2 md:my-4 text-center">
          女神 400 速解小工具
        </div>

        {/* Main Content */}
        <div className="w-full p-4 md:p-6 bg-white border rounded-lg shadow-lg">
          {/* Output Display */}
          <div className="h-20 md:h-28 lg:h-32 flex justify-center items-center shadow-inner border-2 border-gray-200 rounded-lg mb-6 bg-gray-50 p-4">
            <div className="text-center">
              {output ? (
                // 如果輸出是純數字（結果），使用大字體
                /^\d+$/.test(output) ? (
                  <div className="text-3xl md:text-5xl lg:text-7xl font-bold text-blue-600">
                    {output}
                  </div>
                ) : (
                  // 如果是錯誤訊息，使用中等字體
                  <div className="text-lg md:text-xl lg:text-2xl text-red-600 font-medium">
                    {output}
                  </div>
                )
              ) : (
                <div className="text-sm md:text-base lg:text-lg text-gray-500">
                  請選擇所有選項以查看結果
                </div>
              )}
            </div>
          </div>

          <div className="w-full">
            {/* Platform Status Guide */}
            <div className="flex flex-col lg:flex-row mb-4 lg:mb-6">
            <p className="text-lg md:text-2xl lg:text-4xl flex justify-center lg:justify-start items-center mb-2 lg:mb-0 lg:w-1/3">
              平台狀態
            </p>
            <div className="text-gray-600 flex-1 lg:pl-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-1 lg:gap-2">
                <div className="flex items-center">
                  <span className="w-6 md:w-8 font-bold text-base md:text-lg lg:text-xl text-blue-600 mr-2">0:</span>
                  <p className="text-xs md:text-sm lg:text-base">NPC回答沒有任何正確</p>
                </div>
                <div className="flex items-center">
                  <span className="w-6 md:w-8 font-bold text-base md:text-lg lg:text-xl text-blue-600 mr-2">1:</span>
                  <p className="text-xs md:text-sm lg:text-base">NPC回答有1個正確</p>
                </div>
                <div className="flex items-center">
                  <span className="w-6 md:w-8 font-bold text-base md:text-lg lg:text-xl text-blue-600 mr-2">2:</span>
                  <p className="text-xs md:text-sm lg:text-base">NPC回答有2個正確</p>
                </div>
              </div>
            </div>
            </div>

            {/* Option Groups */}
            <div className="space-y-4">
              {renderOptionGroup("全空", "empty")}
              {renderOptionGroup("隊長站左", "left")}
              {renderOptionGroup("隊長站中", "center")}
              {renderOptionGroup("隊長站右", "right")}
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setSelections({ empty: null, left: null, center: null, right: null })}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
          >
            重置選項
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoddessCalculator;