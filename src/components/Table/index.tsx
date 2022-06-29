import { ReactNode, useEffect, useState } from "react";

interface TableProps {
  backgroundHeaderTable?: string
  backgroundHeaderTableHover?: string
  backgroundBodyTable?: string
  backgroundBodyTableHover?: string
  setRows: React.Dispatch<React.SetStateAction<any[]>>
  rows: Array<Array<ReactNode>>
  columns: Array<ReactNode>
}
const defaultBackground  = "bg-white";
const defaultBackgroundHover = "hover:bg-gray-100";
export function Table({
	backgroundHeaderTable = defaultBackground, 
	backgroundHeaderTableHover = defaultBackgroundHover,
	backgroundBodyTable = defaultBackground,
	backgroundBodyTableHover = defaultBackgroundHover,
	rows,
	setRows,
	columns
} : TableProps) {
	const [reverse, setReverse] = useState(false);
	/**
   * Props:
   * backgroundTable => bg of the table (default: White)
   * rows => table data
   * columns => header data
   */

	useEffect(() => {
		setRows(rows.reverse());
		
	},[reverse]);

	return (
	// <div className="w-3/4 mx-auto">
		<>
			<table className=" min-w-full table-auto">
				<thead className={`${backgroundHeaderTable} ${backgroundHeaderTableHover} border-b`}>
					<tr>
						{
							columns.map((item, index) => {
								return (
									<th key={index} scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
										{item} {index == 0 && <button onClick={() => {
											setReverse(!reverse);
										}}><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
												<path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
											</svg></button>}
									</th>
								);

							})
						}
					</tr>
				</thead>
				<tbody>
					{
						rows.map((item, index) => {
							return (
								<tr key = {index} className={`${backgroundBodyTable} border-b transition duration-300 ease-in-out ${backgroundBodyTableHover}`}>
									{item.map((row, rowIndex) => {
										return <td key={row?.toString()} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row}</td>;
									})}
								</tr>
							);
						})
					}
				</tbody>
			</table>
			<a onClick={() => {console.log("a");}}>Previous</a> <a onClick={() => {console.log("b");}}> next</a>
		</>
		
	// </div>


	);
}