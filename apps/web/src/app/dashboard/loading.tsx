import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <article className="p-4 flex-1 h-full overflow-y-auto">
      <LoadingSkeleton />
    </article>
  );
}
