import { render, screen } from '@testing-library/react';
import App from './App';

// eslint-disable-next-line no-undef
test('renders learn react link', () => {
    render(<App />);
    screen.debug();
});
