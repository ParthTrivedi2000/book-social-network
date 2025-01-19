import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ActivateAccount from './ActivateAccount';

describe('<ActivateAccount />', () => {
  test('it should mount', () => {
    render(<ActivateAccount />);

    const activateAccount = screen.getByTestId('ActivateAccount');

    expect(activateAccount).toBeInTheDocument();
  });
});