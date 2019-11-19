/*
{
	id: '',
	dimensions: [{
		name: '',
		path: ''
	}],
	measures: [{
		name: '',
		path: ''
	}],
	data: this.getChartData()
}
*/
sap.ui.define(['./ChartBase'], function(Base) {
	'use strict';

	return class Column extends Base {
		constructor(mSettings) {
			mSettings.type = 'info/column';
			super(mSettings);
		}
	};
});
