import { fireEvent, render, screen } from '@testing-library/react';
import { Dropdown } from './Dropdown';
import { SearchHistory } from 'hooks/useFetch';

const mockSearch: SearchHistory = {
  id: 1,
  search_query: 'test',
  search_date: new Date().toISOString(),
};
describe('Dropdown', () => {
  it('should open the dropdown when trigger is clicked', () => {
    render(
      <Dropdown
        isVisible={false}
        recentSearches={[mockSearch]}
        onSearchSelect={() => {}}
      />,
    );

    expect(screen.queryByText('test')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Search for ingredients...'));

    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
