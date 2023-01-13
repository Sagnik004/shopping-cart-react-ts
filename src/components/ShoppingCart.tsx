import { Offcanvas, Stack } from 'react-bootstrap';

import { useShoppingCart } from '../context/ShoppingCartContext';
import CartItem from './CartItem';
import { formatCurrency } from '../utils/formatCurrency';
import storeItem from '../data/items.json';

type ShoppingCartProps = {
  isOpen: boolean;
}

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { cartItems, closeCart } = useShoppingCart();

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className='ms-auto fw-bold fs-5'>
            Total {formatCurrency(cartItems.reduce((total, cartItem) => {
              const item = storeItem.find(item => item.id === cartItem.id);
              let price = 0;
              if (item && item.price) {
                price = item.price;
              }
              const itemTotal = price * cartItem.quantity;
              return (total + itemTotal);
            }, 0))}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
