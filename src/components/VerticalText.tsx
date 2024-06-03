const VerticalText = ({ text }: { text: string }) => {
  return (
    <div className="absolute right-0 bottom-0">
      <div className="relative rotate-90 flex flex-row items-center text-bogoss-400">
        <hr className="w-28 absolute -translate-x-[120%] border-current" />
        <p className="font-semibold">{text}</p>
      </div>
    </div>
  );
};

export default VerticalText;
