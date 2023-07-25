import BackButton from "./BackButton";
import Title from "./Title";

interface CommonHeaderLeftProps {
  title: string;
}

const CommonHeaderLeft = ({ title }: CommonHeaderLeftProps) => {
  return (
    <>
      <BackButton />
      <Title title={title} />
    </>
  );
};

export default CommonHeaderLeft;
