// (C) 2007-2019 GoodData Corporation
import { GridApi, RowNode } from 'ag-grid';
import { IGroupingProvider } from './GroupingProvider';
import { colIdIsSimpleAttribute, getRowIndexByScrollTop } from '../../../helpers/agGrid';

export const updateStickyHeaders = (
    currentScrollTop: number,
    lastScrollTop: number,
    rowHeight: number,
    gridApi: GridApi,
    groupingProvider: IGroupingProvider,
    apiWrapper: any
) => {
    const currentRowIndex = getRowIndexByScrollTop(currentScrollTop, rowHeight);
    const lastRowIndex = getRowIndexByScrollTop(lastScrollTop, rowHeight);
    if ((lastRowIndex === currentRowIndex) && currentScrollTop !== 0) {
        return;
    }

    const firstVisibleRowIndex = getRowIndexByScrollTop(currentScrollTop, rowHeight);
    const firstVisibleRow: RowNode = gridApi.getDisplayedRowAtIndex(firstVisibleRowIndex);
    const firstVisibleNodeData = firstVisibleRow && firstVisibleRow.data ? firstVisibleRow.data : null;

    if (firstVisibleNodeData === null) {
        apiWrapper.addPinnedTopRowClass(gridApi, 'gd-hidden-sticky-row');
        return;
    }

    apiWrapper.removePinnedTopRowClass(gridApi, 'gd-hidden-sticky-row');

    const attributeKeys = Object.keys(firstVisibleNodeData).filter(colIdIsSimpleAttribute);

    attributeKeys.forEach((columnId: string) => {
        apiWrapper.removeCellClass(gridApi, columnId, lastRowIndex, 'gd-cell-show-hidden');

        if (groupingProvider.isRepeatedValue(columnId, firstVisibleRowIndex + 1)) {
            apiWrapper.setPinnedTopRowCellText(gridApi, columnId, firstVisibleNodeData[columnId]);
            apiWrapper.removePinnedTopRowCellClass(gridApi, columnId, 'gd-hidden-sticky-column');
        } else {
            apiWrapper.addPinnedTopRowCellClass(gridApi, columnId, 'gd-hidden-sticky-column');
            if (groupingProvider.isColumnWithGrouping(columnId)) {
                apiWrapper.addCellClass(gridApi, columnId, currentRowIndex, 'gd-cell-show-hidden');
            }
        }
    });
};
