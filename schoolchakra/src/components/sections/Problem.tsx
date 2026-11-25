import { SchoolChakraHub } from './SchoolChakraHub';

export function Problem() {
  return (
    <section className="w-full bg-slate-50 py-16 sm:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3 sm:mb-4">
          Today your school runs on five different tools.
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 sm:mb-12 font-normal leading-relaxed">
          Attendance in a paper register, fees in Excel, the timetable on a wall, notices in a WhatsApp group, and user lists that never match.
        </p>
        <div className="w-full max-w-4xl mx-auto flex items-center justify-center">
          <SchoolChakraHub className="w-full h-auto" />
        </div>
        <p className="mt-8 sm:mt-12 text-sm sm:text-base font-semibold text-slate-700 max-w-xl mx-auto">
          One dashboard instead. Attendance, fees, timetable, users, and notices update together.
        </p>
      </div>
    </section>
  );
}
