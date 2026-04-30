import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from './Form';

describe('Form', () => {
  test('shows a validation error when registration passwords do not match', async () => {
    const user = userEvent.setup();

    render(<Form />);

    await user.click(
      screen.getByRole('button', { name: /don't have an account\? sign up/i }),
    );
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'password123');
    await user.type(screen.getByLabelText(/confirm password/i), 'password321');
    await user.click(screen.getByRole('button', { name: /^sign up$/i }));

    expect(screen.getByText(/passwords must match/i)).toBeInTheDocument();
  });

  test('shows the next step when registration validation passes', async () => {
    const user = userEvent.setup();

    render(<Form />);

    await user.click(
      screen.getByRole('button', { name: /don't have an account\? sign up/i }),
    );
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'password123');
    await user.type(screen.getByLabelText(/confirm password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /^sign up$/i }));

    expect(
      screen.getByText(/registration form is valid\. connect post \/registration next\./i),
    ).toBeInTheDocument();
  });
});
