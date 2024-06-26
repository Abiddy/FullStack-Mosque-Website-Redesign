import { markdownify } from "@lib/utils/textConverter";

const SalahTable = ({ salah, colors }: any) => {
  return 
    // <div className="container">
    //   <div className="text-center">
    //     <h2>{markdownify("Time of Salat", "", "")}</h2>
    //     <h5 className="mt-2">{markdownify(salah?.data?.nameofthemonth, "", "")}</h5>
    //   </div>  
    //   <div className="relative overflow-x-auto mt-4">
    //     <table className="w-full text-left text-md text-black dark:text-gray-400">
    //       <thead className="text-sm uppercase text-black dark:bg-gray-700 dark:text-gray-400 text-center" style={{
    //         backgroundColor: colors.default.theme_color.primary,
    //       }}>
    //         <tr>
    //           <th scope="col" className="px-6 py-3">
    //             {/* Empty header for day of the week */}
    //           </th>
    //           <th scope="col" className="px-6 py-3">
    //             Date
    //           </th>
    //           <th scope="col" className="px-6 py-3">
    //             Fajr
    //           </th>
    //           <th scope="col" className="px-6 py-3">
    //             Sunrise
    //           </th>
    //           <th scope="col" className="px-6 py-3">
    //             Dhuhr
    //           </th>
    //           <th scope="col" className="px-6 py-3">
    //             Asr
    //           </th>
    //           <th scope="col" className="px-6 py-3">
    //             Maghrib
    //           </th>
    //           <th scope="col" className="px-6 py-3">
    //             Isha
    //           </th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {salah?.data?.month.map((m: any, index: any) => {
    //           return (
    //             <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800 text-center" key={index}>
    //               <th
    //                 scope="row"
    //                 className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
    //               >
    //                 {/* Assuming m.date is already formatted */}
    //                 {new Date(m.date).toLocaleString('en-US', { weekday: 'short' })}
    //               </th>
    //               <td className="px-6 py-4">{m.date}</td>
    //               <td className="px-6 py-4">{m.timings.Fajr}</td>
    //               <td className="px-6 py-4">{m.timings.Sunrise}</td>
    //               <td className="px-6 py-4">{m.timings.Dhuhr}</td>
    //               <td className="px-6 py-4">{m.timings.Asr}</td>
    //               <td className="px-6 py-4">{m.timings.Maghrib}</td>
    //               <td className="px-6 py-4">{m.timings.Isha}</td>
    //             </tr>
    //           );
    //         })}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  
};

export default SalahTable;
