const gridStyle = { minHeight: 550 };
import ReactDataGrid from "@inovua/reactdatagrid-community";
import { TypeRowSelection, TypeCellSelection } from "@inovua/reactdatagrid-community/types";
import { TypeOnSelectionChangeArg } from "@inovua/reactdatagrid-community/types/TypeDataGridProps";
import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { List } from "react-content-loader";
import { DarkMode } from "../../contexts/darkMode";


interface TableProps {
  data: Record<string, ReactNode>[]
  checkboxColumn?: true|undefined
  handleOnSelectionChange?: (selected : TypeOnSelectionChangeArg| Record<string,any>) => void|unknown
  resetRowsSelectedTrigger? : unknown
  columns: ({
    name: string;
    header: string;
    defaultVisible: boolean;
    defaultWidth: number;
    type: string;
    defaultFlex?: undefined;
} | {
    name: string;
    header: string;
    defaultFlex: number;
    defaultVisible?: undefined;
    defaultWidth?: undefined;
    type?: undefined;
})[]
}
export function Table({data, columns, checkboxColumn, handleOnSelectionChange, resetRowsSelectedTrigger} : TableProps) {
	useEffect(() => {
		setSelected({});
		setSelectedLength(0);
	}, [resetRowsSelectedTrigger]);
	const {colorTheme} = useContext(DarkMode);
	const [selected, setSelected] = useState<TypeRowSelection>({ });
	const [selectedLength, setSelectedLength] = useState(0);
	const onSelectionChange = useCallback(({selected} : TypeOnSelectionChangeArg| Record<string,any>) => {
		setSelectedLength(Object.keys(selected).length);
		setSelected(selected);
		handleOnSelectionChange && handleOnSelectionChange(selected);
	}, []);
	return (
		<>
			{
				data.length > 0
					? 
					<div>
						<ReactDataGrid
							idProperty="id"
							selected={selected}
							theme={colorTheme == "dark" ? "default-dark": "default-light"}
							checkboxColumn={checkboxColumn}
							checkboxOnlyRowSelect
							onSelectionChange={onSelectionChange}
							style={gridStyle}
							columns={columns}
							dataSource={data}
						/>
						{selectedLength > 1 && <h2>{selectedLength} usuarios selecionados</h2>}
					</div>
					: 
					<List backgroundColor={colorTheme == "dark" ? "#222831" :"white"}/>
			}
		</>
	);
}