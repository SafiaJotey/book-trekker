import { CSSProperties } from 'react';
import GridLoader from 'react-spinners/GridLoader';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

export default function Spinner() {
  return (
    <div className="sweet-loading">
      <GridLoader
        color="#003461"
        cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
