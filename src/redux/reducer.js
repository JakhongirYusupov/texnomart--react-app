const initialCart = {
  data: []
}

const comparisonCart = {
  data: []
}

const COMPARISON = (state = comparisonCart, action) => {
  switch (action.type) {
    case "ADD_TO_COMPARISON":
      return {
        data: [...state.data, action.data]
      }
    default:
      return {
        data: state.data
      }
  }
}

const CART = (state = initialCart, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        data: [...state.data, action.data]
      }
    case "DELETE_FROM_CART":
      const id = state.data.findIndex((e) => e.id === action.id)
      state.data.splice(id, 1);
      return {
        data: [...state.data]
      }
    case "MINUS_PRODUCT_COUNT":
      state.data.forEach((e) => {
        if (e.id === action.productId) if (e.count > 1) e.count -= 1
      })
      return {
        data: [...state.data]
      }
    case "PILUS_PRODUCT_COUNT":
      state.data.forEach((e) => {
        if (e.id === action.productId) if (e.count < 10) e.count += 1
      })
      return {
        data: [...state.data]
      }
    default:
      return {
        data: state.data
      }

  }
}

export {
  CART,
  COMPARISON
} 