interface RepoListProps {
  repos: any[];
}

const RepoList: React.FC<RepoListProps> = ({ repos }) => {
  return (
    <ul>
      {repos.map((repo) => (
        <li key={repo.id}>
          <a href={repo.url} target="_blank" rel="noopener noreferrer">
            {repo.name} by {repo.owner.login} - ⭐ {repo.stargazerCount}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default RepoList;
