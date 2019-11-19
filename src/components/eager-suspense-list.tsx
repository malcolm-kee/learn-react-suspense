import * as React from 'react';

/**
 * @todo Idea: Making it adaptive so it will decide the count based on how many item in a row.
 */

type EagerSuspenseListProps<Data> = {
  data: Data[];
  keyProp: keyof Data;
  eagerItemCount: number;
  renderItem: (data: Data) => JSX.Element;
  fallback: NonNullable<React.ReactNode>;
};

export const EagerSuspenseList = <Data extends {}>(
  props: EagerSuspenseListProps<Data>
) => {
  const eagerItems = props.data.slice(0, props.eagerItemCount);
  const remainingItems = props.data.slice(props.eagerItemCount);

  return (
    <>
      {eagerItems.map(data => (
        <React.Fragment key={data[props.keyProp] as any}>
          {props.renderItem(data)}
        </React.Fragment>
      ))}
      <React.SuspenseList revealOrder="forwards" tail="collapsed">
        {remainingItems.map(data => (
          <React.Suspense
            fallback={props.fallback}
            key={data[props.keyProp] as any}
          >
            {props.renderItem(data)}
          </React.Suspense>
        ))}
      </React.SuspenseList>
    </>
  );
};
