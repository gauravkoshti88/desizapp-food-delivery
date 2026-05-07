import React from 'react'

function AcceptOrderCard({availableAssign, acceptOrder}) {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-3 shadow-lg border-2 border-orange-200/60 hover:shadow-2xl hover:shadow-orange-200/50 hover:-translate-y-0.5 transition-all duration-200 group flex-1">
      <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-orange-200/50 group-hover:border-orange-300/70">
        <h1 className="text-sm font-black bg-gradient-to-r from-orange-700 via-orange-600 to-orange-800 bg-clip-text text-transparent">
          Available Orders
        </h1>
      </div>

      <div className="space-y-2.5 max-h-[calc(100vh-340px)] overflow-y-auto pr-1 -mr-1">
        {availableAssign?.length > 0 ? (
          availableAssign.map((a, idx) => (
            <div
              key={idx}
              className="group/item bg-white border border-orange-200/50 rounded-xl p-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:border-orange-400/70 hover:shadow-md hover:shadow-orange-200/40 hover:-translate-y-1 transition-all duration-200 cursor-pointer active:scale-[0.98]"
            >
              <div className="flex flex-col gap-1.5 mb-2 relative">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
                  <p className="text-xs font-bold text-orange-800 truncate">{a.shopName}</p>
                </div>

                <div className="flex items-start gap-1.5 p-1.5 bg-orange-50/50 rounded-lg border-l-3 border-orange-400/60 hover:bg-orange-50/80 transition-colors">
                  <span className="text-orange-600 text-xs font-semibold mt-0.5 flex-shrink-0">📍</span>
                  <p className="text-xs text-orange-700 font-medium leading-tight">{a.deliveryAddress.text}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-orange-600 bg-orange-200/60 px-2 py-0.5 rounded-full font-semibold">{a.items.length} items</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-orange-200/50 bg-gradient-to-r from-white/50 to-orange-50/50 rounded-b-xl p-2 -mx-3 mt-1.5">
                <span className="text-sm font-black bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                  ₹{a.subtotal}
                </span>
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-lg font-bold text-xs shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 flex-shrink-0 cursor-pointer"
                  onClick={() => acceptOrder(a.assignmentId)}
                >
                  Accept
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 px-2">
            <div className="w-14 h-14 mx-auto bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mb-2 shadow-md border border-orange-200/50">
              <span className="text-lg text-orange-400 font-semibold">📦</span>
            </div>
            <h3 className="text-xs font-bold text-orange-600 mb-1">No Available Orders</h3>
            <p className="text-xs text-orange-500 font-medium">Orders will appear here soon</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AcceptOrderCard
