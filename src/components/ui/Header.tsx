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
      <h6 className="text-lg font-semibold text-center md:text-left ">
        {subHeader}
      </h6>
      <h3 className="text-4xl font-bold text-center md:text-left">{header}</h3>
    </div>
  );
}
