import { useUser } from '../contexts/UserContext';

export function UserSelector() {
  const { currentUser, setCurrentUser } = useUser();

  return (
    <div className="user-selector">
      <label>
        <input
          type="radio"
          name="user"
          value="YtoS"
          checked={currentUser === 'YtoS'}
          onChange={() => setCurrentUser('YtoS')}
        />
        유진
      </label>
      <label>
        <input
          type="radio"
          name="user"
          value="StoY"
          checked={currentUser === 'StoY'}
          onChange={() => setCurrentUser('StoY')}
        />
        상연
      </label>
    </div>
  );
}
