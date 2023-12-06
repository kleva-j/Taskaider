import { FloatingBtn } from "./FloatingBtn";

export const EmailEmptyView = () => {
  return (
    <div className="grid place-items-center h-full">
      <div className="flex justify-center items-center h-full text-gray-500">
        No Email Selected
      </div>
      <FloatingBtn />
    </div>
  );
};
