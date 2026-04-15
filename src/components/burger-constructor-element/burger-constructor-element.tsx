import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { useDispatch } from '../../services/store';
import {
  moveIngredient,
  deleteIngredient
} from '../../services/slices/burgerConstructorSlice';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(moveIngredient({ index, direction: 'down' }));
    };

    const handleMoveUp = () => {
      dispatch(moveIngredient({ index, direction: 'up' }));
    };

    const handleClose = () => {
      dispatch(deleteIngredient(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
