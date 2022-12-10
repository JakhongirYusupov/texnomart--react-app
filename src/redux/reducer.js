const initialCart = {
  data: []
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
    default:
      return {
        data: state.data
      }

  }
}

export default CART