import React, { useEffect, useHistory } from 'react';

function ReloadOnRouteChange() {
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen(() => {
      window.location.reload();
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return (
    <div>
      <p>Reload the page when the route changes.</p>
    </div>
  );
}

export default ReloadOnRouteChange;