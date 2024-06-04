import { forwardRef } from "react";
import Icon from "./ui/icons/Icon";

const ListItem = forwardRef<HTMLLIElement, { children: React.ReactNode; className: string; alt: string }>(
  ({ children, alt, className, ...props }: { children: React.ReactNode; className: string; alt: string }, ref) => {
    const sizes = {
      v: ["75", "100", "125", "150"],
      rand: function () {
        return this.v[Math.floor(Math.random() * this.v.length)];
      },
    };
    const s = [sizes.rand(), sizes.rand()];
    return (
      <li ref={ref} {...props} className={className}>
        <Icon name="chevron-right" size={20} />
        <img
          className="object-cover w-full max-h-[150px]"
          src={`https://placehold.co/${s[1]}x${s[0]}`}
          height={s[0]}
          alt={alt}
        />
        {children}
      </li>
    );
  }
);

export default ListItem;
