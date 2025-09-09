import { CardDescription, CardHeader, CardTitle } from "../ui/card";

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeaders = ({ title, description }: PageHeaderProps) => {
  return (
    <>
      <div className={"flex flex-col items-start mb-2"}>
        <CardHeader className="!p-0">
          <CardTitle className="text-left  text-[1rem] font-bold">
            <div dangerouslySetInnerHTML={{ __html: title }} />
          </CardTitle>

          {description && (
            <CardDescription className="pb-1  text-[0.87rem]">
              {description}
            </CardDescription>
          )}
        </CardHeader>
      </div>
    </>
  );
};

export default PageHeaders;
