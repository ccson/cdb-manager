// Paginated table
// Use like: <cdb-result-table rows="data" settings="cdbrt"></cdb-result-table> where:
// data is the array with the rows to display
// cdbrt is an object with the settings for the table. Currently, only rowsPerPage is supported, which acts as an init value for the input field
cdbmanager.directive('cdbResultTable', function () {
    var tableTemplate = '' ;
    tableTemplate += '<div class="container-fluid" style="overflow: auto;">';
    tableTemplate += '    <div class="row">';
    tableTemplate += '        <span>Rows per page: <input ng-model="settings.rowsPerPage" /></span>';
    tableTemplate += '        <span class="pull-right"><dir-pagination-controls ng-show="rows"></dir-pagination-controls></span>';
    tableTemplate += '    </div>';
    tableTemplate += '    <div class="row" style="overflow: auto;">';
    tableTemplate += '        <table id="sql_console_table" class="table table-striped table-bordered">';
    tableTemplate += '            <thead>';
    tableTemplate += '                <tr>';
    tableTemplate += '                    <th ng-repeat="(title, value) in rows[0]">{{ title }}</th>';
    tableTemplate += '                </tr>';
    tableTemplate += '            </thead>';
    tableTemplate += '            <tbody>';
    tableTemplate += '                <tr dir-paginate="row in rows | itemsPerPage: settings.rowsPerPage">';
    tableTemplate += '                    <td ng-repeat="column in row">{{ column }}</td>';
    tableTemplate += '                </tr>';
    tableTemplate += '            </tbody>';
    tableTemplate += '        </table>';
    tableTemplate += '    </div>';
    tableTemplate += '    <div class="row">';
    tableTemplate += '        <dir-pagination-controls class="pull-right" ng-show="rows"></dir-pagination-controls>';
    tableTemplate += '    </div>';
    tableTemplate += '</div>';

    return {
        restrict: "E",
        transclude: true,
        scope: {
            rows: "=rows",
            settings: "=settings"
        },
        replace: true,
        template: tableTemplate
    }
});
