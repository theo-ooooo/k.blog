interface Props {
  children: React.ReactNode;
}

function Content({ children }: Props) {
  return (
    <div className="w-[100%] xl:w-[1176px] pt-[5rem] px-4 mx-auto">
      {children}
    </div>
  );
}

export default Content;
