import classes from "./style.module.scss";
import classNames from "classnames";

type ListProps<T> = {
  className?: string;
  data: T[];
  marker?: React.ReactNode;
  listStyle?: string;
  listItemStyle?: string;
  itemRenderer: (item: T) => React.ReactNode;
};

export const List = <T,>({
  className,
  data,
  marker,
  listStyle,
  listItemStyle,
  itemRenderer,
}: ListProps<T>) => {
  if (!Array.isArray(data)) return <></>;
  return (
    <ul className={classNames(listStyle ?? classes.list, className)}>
      {data.map((item, i) => {
        return (
          <li className={classNames(listItemStyle ?? classes.listItem)} key={i}>
            {marker && marker}
            {itemRenderer(item)}
          </li>
        );
      })}
    </ul>
  );
};
