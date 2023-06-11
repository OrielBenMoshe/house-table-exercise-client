import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" style={{ textAlign: 'center' }}>
      {
        error.status === 404
          ?
          (<>
            <h2>404</h2>
            <p>מצטערים, הדף שבו ביקרת לא קיים.</p>
          </>)
          :
          <>
            <h1>אופס..</h1>
            <h4>מצטערים, אירעה שגיאה בלתי צפויה.</h4>
            <p>
              <i>{error?.statusText || error?.message || error}</i>
            </p>
          </>
      }
    </div>
  );
}