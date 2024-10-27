import { FC, memo, ReactElement } from 'react';

const Home: FC = (): ReactElement => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default memo(Home);
