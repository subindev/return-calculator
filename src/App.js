import { useFormik } from "formik";
import { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import "./App.css";

function App() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [results, setresults] = useState([]);
  const formik = useFormik({
    initialValues: {
      principal: 100000,
      profit: 10,
      profitMonth: 4,
      totalMonths: 60,
    },
    onSubmit(values) {
      console.log("XXX:", values);
      const newResults = [];
      var netAmount = values.principal;
      for (let i = 0; i < values.profitMonth -1; ++i) {
        newResults.push({
          month: i + 1,
          principal: values.principal,
          profit: 0,
          netAmount: values.principal,
        });
      }
      for (let i = values.profitMonth; i <= values.totalMonths; ++i) {
        let interest = Math.round(netAmount * values.profit * 0.01);
        newResults.push({
          month: i,
          principal: netAmount,
          profit: interest,
          netAmount: netAmount + interest,
        });
        netAmount += interest;
      }
      setresults(newResults);
      setTotalRevenue(netAmount);
      console.log(newResults);
    },
  });

  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">The Calculator</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={formik.handleSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="principal"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Principal
                      </label>
                      <input
                        type="number"
                        name="principal"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.principal}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="profit"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Profit(%)
                      </label>
                      <input
                        type="text"
                        name="profit"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.profit}
                        autoComplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="months"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Profit Month
                      </label>
                      <input
                        type="number"
                        name="profitMonth"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.profitMonth}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="totalMonths"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Total Months
                      </label>
                      <input
                        type="number"
                        name="totalMonths"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.totalMonths}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Calculate
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="py-2 px-1 text-right">
            <NumberFormat
              className="text-2xl font-bold text-gray-900"
              displayType="text"
              thousandSeparator={true}
              thousandsGroupStyle="lakh"
              prefix={"₹"}
              value={totalRevenue}
            />
          </div>
          <div className="mt-5 flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Month
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Principal
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Profit
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Net Amount
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {results.map((item) => (
                        <tr key={item.month}>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                            {item.month}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            <NumberFormat
                              displayType="text"
                              thousandSeparator={true}
                              thousandsGroupStyle="lakh"
                              prefix={"₹"}
                              value={item.principal}
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                            <NumberFormat
                              displayType="text"
                              thousandSeparator={true}
                              thousandsGroupStyle="lakh"
                              prefix={"₹"}
                              value={item.profit}
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                            <NumberFormat
                              displayType="text"
                              thousandSeparator={true}
                              thousandsGroupStyle="lakh"
                              prefix={"₹"}
                              value={item.netAmount}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
