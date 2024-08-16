import  { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchRepos } from './repoSearchSlice';
import RepoList from '../../components/RepoList';


const RepoSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();
  const { repos, loading, error } = useAppSelector((state) => state.repoSearch);

  const handleSearch = () => {
    dispatch(fetchRepos(query));
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введите запрос"
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Поиск...' : 'Поиск'}
      </button>
      {error && <p>Error: {error}</p>}
      <RepoList repos={repos} />
    </div>
  );
};

export default RepoSearch;
