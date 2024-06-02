import { Children, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./button";
import Slider from "./tabs/Slider";
import { getComponentDisplayName, validAndHasProps } from "./tabs/helper";
import usePosition from "./tabs/usePosition";

let buttonTemp: boolean[] = [];
let indexDefaulted: number | null = null;
const ButtonGroup = ({ children, className }: { children: ReactNode; className?: string }) => {
  const [selected, setSelected] = useState<boolean[]>([]);
  const { update, position } = usePosition();

  useEffect(() => console.log(selected), [selected]);

  const toggleSelected = (index: number) => {
    setSelected((prev) => {
      const temp = new Array(prev.length).fill(false);
      temp[index] = !temp[index];
      return temp;
    });
  };

  const ButtonHoc = ({ onClick, index, children, ...props }: any) => {
    const ref = useRef<HTMLButtonElement>(null);

    const handleOnClick = () => {
      toggleSelected(index);
      "onClick" in props && props.onClick();
    };

    return (
      <Button
        {...props}
        ref={ref}
        onClick={handleOnClick}
        updatePosition={update}
        selected={selected[index]}
        data-index={index}>
        {children}
      </Button>
    );
  };

  const SliderHoc = ({ children, ...props }: any) => {
    return (
      <Slider {...props} position={position}>
        {children}
      </Slider>
    );
  };

  const AugmentedButtons = useMemo(() => {
    buttonTemp = [];
    const hocs = Children.map(children, (child, i) => {
      if (!validAndHasProps(child)) return child;
      const childType = getComponentDisplayName(child);

      switch (childType) {
        case "Button": {
          buttonTemp.push(false);
          if (child.props.defaultSelected) indexDefaulted = i;

          return (
            <ButtonHoc {...child.props} index={i}>
              {child.props.children}
            </ButtonHoc>
          );
        }
        case "Slider": {
          return <SliderHoc {...child.props}>{child.props.children}</SliderHoc>;
        }

        default:
          return child;
      }
    });

    return hocs;
  }, [children, selected]);

  useEffect(() => {
    if (indexDefaulted) buttonTemp[indexDefaulted] = true;
    setSelected(buttonTemp);
  }, [children]);

  return <div className={className}>{AugmentedButtons}</div>;
};

ButtonGroup.displayName = "ButtonGroup";

export default ButtonGroup;
