export default function Header({
  header,
  subHeader,
}: {
  header: string;
  subHeader: string;
}) {
  return (
    <div>
      {' '}
      <i className="text-lg font-semibold text-center md:text-left ">
        {subHeader}
      </i>
      <h3 className="text-4xl font-bold  text-main text-center md:text-left">
        {header}
      </h3>
    </div>
  );
}
