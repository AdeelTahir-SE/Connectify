import * as motion from "motion/react-client";
export default function DashboardFriendsSectionSkeleton({count=3}: {count?: number}) {
    console.log(Array.from({length:count}));
  return (
    <section className="flex flex-col items-center justify-center gap-[10px]">
      {Array.from({length:count})?.map((_:unknown ,index: number) => (
        <section
          key={index}
          className="flex flex-row items-center justify-between w-full max-w-[500px] max-h-[70px] p-4 bg-white rounded-lg shadow-md"
        >
          <motion.section
            className="rounded-full w-[50px] h-[50px] bg-gray-300"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />

          <section className="flex flex-row items-start">
            <motion.h2
              className="text-sm text-gray-500 w-[200px] h-[50px] bg-gray-200 rounded-md "
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />{" "}
            <motion.h3
              className="w-[200px] h-[50px] bg-gray-200 rounded-md "
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          </section>
        </section>
      ))}
    </section>
  );
}
