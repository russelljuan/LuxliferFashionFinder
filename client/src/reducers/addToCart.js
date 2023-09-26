const initialState = JSON.parse(localStorage.getItem("cartItems")) || [];

const addToCart = (state = initialState, action) => {
  if (action.type === "ADDTOCART") {
    let existingProduct = state.find(
      (currentItem) => currentItem.id === action.payload.id
    );
    if (existingProduct) {
      let updatedCart = state.map((currentElement) => {
        if (currentElement.id === action.payload.id) {
          let newAmount = currentElement.price + action.payload.price;
          return {
            ...currentElement,
            price: newAmount,
            quantity: currentElement.quantity + 1,
          };
        } else {
          return currentElement;
        }
      });
      return updatedCart;
    } else {
      return [...state, action.payload];
    }
  }
  if (action.type === "EMPTYCART") {
    return [];
  }
  if (action.type === "INCREMENTQUANTITY") {
    const updatedCart = state.map((currentElement) => {
      if (currentElement.id === action.payload) {
        return {
          ...currentElement,
          quantity: currentElement.quantity + 1,
        };
      }
      return currentElement;
    });
    return updatedCart;
  }

  if (action.type === "DECREMENTQUANTITY") {
    const updatedCart = state
      .map((currentElement) => {
        if (
          currentElement.id === action.payload &&
          currentElement.quantity >= 1
        ) {
          return {
            ...currentElement,
            quantity: currentElement.quantity - 1,
          };
        }
        return currentElement;
      })
      .filter((currentItem) => currentItem.quantity !== 0);
    return updatedCart;
  }

  if (action.type === "TOTALAMOUNT") {
    const updatedCart = state.map((currentElement) => {
      if (currentElement.id === action.payload) {
        return {
          ...currentElement,
          total: currentElement.price * currentElement.quantity,
        };
      }
      return currentElement;
    });
    return updatedCart;
  }

  if (action.type === "REMOVECARTITEM") {
    const updatedArray = state.filter((currentItem) => {
      return currentItem.id !== action.payload;
    });
    return updatedArray;
  }
  return state;
};

export default addToCart;